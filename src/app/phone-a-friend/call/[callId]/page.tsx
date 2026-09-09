import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import UserCallRoom from '@/components/calls/UserCallRoom'

export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default async function UserCallPage({
  params,
  searchParams,
}: {
  params: Promise<{ callId: string }>
  searchParams: Promise<{ uid?: string }>
}) {
  const { callId } = await params
  const { uid } = await searchParams

  const cookieStore = await cookies().catch(() => null)
  const requesterId = uid || cookieStore?.get('sm_caller_uid')?.value || 'guest_user'

  try {
    const res = await fetch(`${BACKEND_URL}/api/calls/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callId,
        requesterId,
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('[UserCallPage] Failed to fetch session token:', await res.text())
      redirect('/phone-a-friend?error=token_failed')
    }

    const data = await res.json()

    return (
      <UserCallRoom
        call={data.call}
        agoraParams={{
          appId: data.agora.appId,
          channelName: data.agora.channelName,
          token: data.agora.token,
          account: data.agora.account,
        }}
      />
    )
  } catch (err) {
    console.error('[UserCallPage] Error loading call room:', err)
    redirect('/phone-a-friend?error=call_error')
  }
}
