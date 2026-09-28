'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { initiateMemberCallApi, fetchMemberCallToken } from '@/lib/memberCallService';
import MemberIncomingCallModal from '@/components/members/MemberIncomingCallModal';
import MemberCallRoom from '@/components/members/MemberCallRoom';

interface GlobalCallContextType {
  initiateCall: (targetId: string) => Promise<void>;
  activeMemberCall: any | null;
}

const GlobalCallContext = createContext<GlobalCallContextType>({
  initiateCall: async () => {},
  activeMemberCall: null,
});

export const useGlobalCall = () => useContext(GlobalCallContext);

export function GlobalCallProvider({ children }: { children: ReactNode }) {
  const { user, mappedUserId, isMember, isMemberVerified, credits, checkMembershipStatus } = useAuth();
  
  const [activeMemberCall, setActiveMemberCall] = useState<any | null>(null);
  const [activeAgoraParams, setActiveAgoraParams] = useState<any | null>(null);

  const currentMemberId = mappedUserId || user?.uid || '';

  const initiateCall = async (targetId: string) => {
    if (!currentMemberId) throw new Error("You must be logged in to make a call.");
    
    const res = await initiateMemberCallApi({
      callerId: currentMemberId,
      receiverId: targetId,
    });

    if (res.call) {
      const tokenData = await fetchMemberCallToken(res.call.id, currentMemberId);
      setActiveAgoraParams(tokenData);
      setActiveMemberCall(res.call);
    }
  };

  const handleIncomingCallAccepted = async (call: any) => {
    if (!currentMemberId) return;
    try {
      const tokenData = await fetchMemberCallToken(call.id, currentMemberId);
      setActiveAgoraParams(tokenData);
      setActiveMemberCall(call);
    } catch (err: any) {
      alert(err.message || 'Failed to retrieve voice credentials.');
    }
  };

  const handleCallClosed = async () => {
    setActiveMemberCall(null);
    setActiveAgoraParams(null);
    if (checkMembershipStatus) {
      await checkMembershipStatus();
    }
  };

  return (
    <GlobalCallContext.Provider value={{ initiateCall, activeMemberCall }}>
      {children}
      
      {/* Global Incoming Call Modal for active members */}
      {currentMemberId && isMember && isMemberVerified && !activeMemberCall && (
        <MemberIncomingCallModal
          currentUserId={currentMemberId}
          onCallAccepted={handleIncomingCallAccepted}
        />
      )}

      {/* Global Call Room Modal */}
      {activeMemberCall && activeAgoraParams && currentMemberId && (
        <MemberCallRoom
          call={activeMemberCall}
          currentUserId={currentMemberId}
          userCredits={credits || 0}
          agoraParams={activeAgoraParams}
          onCallClosed={handleCallClosed}
        />
      )}
    </GlobalCallContext.Provider>
  );
}
