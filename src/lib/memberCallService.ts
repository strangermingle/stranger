const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? 'https://api.strangermingle.com'
    : (process.env.NODE_ENV === 'production' ? 'https://api.strangermingle.com' : 'http://localhost:3001'));

export interface OnlineMember {
  id: string;
  anonymousAlias: string;
  avatarUrl: string | null;
  bio?: string;
  gender: string;
  age: string;
  callStatus: 'idle' | 'ringing' | 'in_call' | 'offline';
  ratingAvg: string;
  ratingCount: number;
}

export async function fetchOnlineMembersApi(currentUserId?: string): Promise<OnlineMember[]> {
  const queryParam = currentUserId ? `?currentUserId=${encodeURIComponent(currentUserId)}` : '';
  const res = await fetch(`${BACKEND_URL}/api/members/calls${queryParam}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch online members');
  const data = await res.json();
  return data.members || [];
}

export async function checkActiveIncomingCallApi(memberId: string) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls?memberId=${encodeURIComponent(memberId)}&activeOnly=true`, {
    cache: 'no-store',
  });
  if (!res.ok) return { call: null };
  return res.json();
}

export async function toggleAvailabilityApi(userId: string, isAvailable: boolean) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'toggle-availability', userId, isAvailable }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update availability status');
  }
  return res.json();
}

export async function sendHeartbeatApi(userId: string) {
  try {
    await fetch(`${BACKEND_URL}/api/members/calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'heartbeat', userId }),
      cache: 'no-store',
    });
  } catch (e) {
    // Non-blocking heartbeat
  }
}

export async function initiateMemberCallApi(payload: {
  callerId: string;
  receiverId: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'initiate', ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to place call');
  }
  return res.json();
}

export async function respondMemberCallApi(payload: {
  callId: string;
  responderId: string;
  action: 'accept' | 'reject';
}) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'respond',
      callId: payload.callId,
      responderId: payload.responderId,
      actionType: payload.action,
    }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to respond to call');
  }
  return res.json();
}

export async function cancelMemberCallApi(callId: string, callerId: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel', callId, callerId }),
      cache: 'no-store',
    });
    return res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function endMemberCallApi(callId: string, requesterId: string) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'end', callId, requesterId }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to end call');
  }
  return res.json();
}

export async function fetchMemberCallToken(callId: string, requesterId: string) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId, requesterId }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch voice credentials');
  }
  return res.json();
}

export async function submitMemberCallRatingApi(payload: {
  callId: string;
  userId: string;
  rating: number;
  review?: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/members/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'rate', ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit rating');
  }
  return res.json();
}
