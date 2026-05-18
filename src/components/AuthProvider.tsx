'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { v5 as uuidv5 } from 'uuid';

// Deterministic UUID Namespace for Stranger Mingle (matches Backend)
const SM_UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

interface AuthContextType {
  user: User | null;
  mappedUserId: string | null;
  isMember: boolean;
  isMemberVerified: boolean;
  membershipExpiry: string | null;
  cancelAtPeriodEnd: boolean;
  loading: boolean;
  checkMembershipStatus: (email?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  mappedUserId: null,
  isMember: false,
  isMemberVerified: false,
  membershipExpiry: null,
  cancelAtPeriodEnd: false,
  loading: true,
  checkMembershipStatus: async () => false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mappedUserId, setMappedUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isMemberVerified, setIsMemberVerified] = useState(false);
  const [membershipExpiry, setMembershipExpiry] = useState<string | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkMembershipStatus = useCallback(async (email?: string) => {
    const targetEmail = (email || user?.email)?.toLowerCase();
    if (!targetEmail) return false;

    try {
      // Get fresh token to prove identity to the backend
      const idToken = await auth.currentUser?.getIdToken();
      
      const res = await fetch(`/api/membership/status?email=${encodeURIComponent(targetEmail)}`, {
        headers: {
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        }
      });
      
      const data = await res.json();
      if (data.success && data.isMember) {
        setIsMember(true);
        setIsMemberVerified(!!data.is_verified);
        setMembershipExpiry(data.expiry || null);
        setCancelAtPeriodEnd(!!data.cancel_at_period_end);
        return true;
      }
      setIsMember(false);
      setIsMemberVerified(false);
      setMembershipExpiry(null);
      setCancelAtPeriodEnd(false);
      return false;
    } catch (err) {
      console.error('[Auth] Failed to check membership status:', err);
      setIsMember(false);
      setIsMemberVerified(false);
      setMembershipExpiry(null);
      setCancelAtPeriodEnd(false);
      return false;
    }
  }, [user?.email]);

  useEffect(() => {
    // Listen for authentication state to change.
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      setLoading(true);
      if (!currentUser) {
        setUser(null);
        setMappedUserId(null);
        setIsMember(false);
        setIsMemberVerified(false);
        setMembershipExpiry(null);
        setCancelAtPeriodEnd(false);
        // Clear the HTTP cookie for SSR context
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        // Clear User-ID in GTM dataLayer
        if (typeof window !== 'undefined') {
          const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
          if (win.dataLayer) {
            win.dataLayer.push({
              event: 'user_logout',
              user_id: null
            });
          }
        }
        
        setLoading(false);
        return;
      }

      setUser(currentUser);
      
      // Calculate deterministic identity
      const uuid = uuidv5(currentUser.uid, SM_UUID_NAMESPACE);
      setMappedUserId(uuid);
      
      // Push User-ID to Google Tag Manager dataLayer
      if (typeof window !== 'undefined') {
        const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
        if (win.dataLayer) {
          win.dataLayer.push({
            event: 'user_login',
            user_id: uuid
          });
        }
      }
      
      // Get the fresh JWT and set it as an HTTP cookie
      const token = await currentUser.getIdToken();
      document.cookie = `auth-token=${token}; path=/; max-age=1209600; Secure; SameSite=Strict`;
      
      // Check membership status immediately
      const detectedEmail = (currentUser.email || 
                            currentUser.providerData.find(p => p.email)?.email)?.toLowerCase();
      
      if (detectedEmail) {
        await checkMembershipStatus(detectedEmail);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [checkMembershipStatus]);

  return (
    <AuthContext.Provider value={{ user, mappedUserId, isMember, isMemberVerified, membershipExpiry, cancelAtPeriodEnd, loading, checkMembershipStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
