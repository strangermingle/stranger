const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function fetchApprovedCallingHosts() {
  const res = await fetch(`${BACKEND_URL}/api/calls`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch calling hosts');
  return res.json();
}

export async function fetchHostCallingDetails(hostId: string) {
  const res = await fetch(`${BACKEND_URL}/api/calls?hostId=${encodeURIComponent(hostId)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch host details');
  return res.json();
}

export async function createCallPaymentOrderApi(payload: {
  userId: string;
  hostId: string;
  callType?: 'instant' | 'scheduled';
  slotId?: string | null;
  amount?: number;
  durationMinutes?: number;
  callerName?: string;
  callerEmail?: string;
  callerPhone?: string;
  deviceFingerprint?: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create-order', ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to initialize payment');
  }
  return res.json();
}

export async function initiateCallSession(payload: {
  userId: string;
  hostId: string;
  callType?: 'instant' | 'scheduled';
  slotId?: string | null;
  amount?: number;
  durationMinutes?: number;
  callerName?: string;
  callerEmail?: string;
  callerPhone?: string;
  deviceFingerprint?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'initiate', ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to initiate call');
  }
  return res.json();
}

export async function fetchCallSessionToken(callId: string, requesterId: string) {
  const res = await fetch(`${BACKEND_URL}/api/calls/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId, requesterId }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to retrieve call token');
  }
  return res.json();
}

export async function endCallSessionApi(callId: string, requesterId: string) {
  const res = await fetch(`${BACKEND_URL}/api/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'end', callId, requesterId }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to terminate call');
  }
  return res.json();
}

export async function submitCallRatingApi(payload: {
  callId: string;
  userId: string;
  rating: number;
  review?: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/calls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'rate', ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit rating');
  }
  return res.json();
}

export async function submitReportApi(payload: {
  reporterId: string;
  reportedId: string;
  reportedType?: string;
  reason: string;
  details?: string;
  callId?: string;
  callRef?: string;
  conversationId?: string;
  deviceFingerprint?: string;
}) {
  const res = await fetch(`${BACKEND_URL}/api/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit report');
  }
  return res.json();
}

