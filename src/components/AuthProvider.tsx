'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { v5 as uuidv5 } from 'uuid';

// Deterministic UUID Namespace for Stranger Mingle (matches Backend)
const SM_UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

interface AuthContextType {
  user: User | null;
  mappedUserId: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  mappedUserId: null,
  loading: true 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mappedUserId, setMappedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state to change.
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setMappedUserId(null);
        // Clear the HTTP cookie for SSR context
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setLoading(false);
        return;
      }

      setUser(currentUser);
      
      // Calculate deterministic identity
      const uuid = uuidv5(currentUser.uid, SM_UUID_NAMESPACE);
      setMappedUserId(uuid);
      
      // Get the fresh JWT and set it as an HTTP cookie
      const token = await currentUser.getIdToken();
      document.cookie = `auth-token=${token}; path=/; max-age=1209600; Secure; SameSite=Strict`;
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, mappedUserId, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
