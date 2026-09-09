'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  Clock, 
  Sparkles, 
  Wifi, 
  Star, 
  Loader2, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react'
import { useAgoraVoiceCall } from '@/hooks/useAgoraVoiceCall'
import { endCallSessionApi, submitCallRatingApi } from '@/lib/callService'
import { createClientClient } from '@/lib/supabaseClient'

interface UserCallRoomProps {
  call: any
  agoraParams: {
    appId: string
    channelName: string
    token: string
    account: string
  }
}

export default function UserCallRoom({ call, agoraParams }: UserCallRoomProps) {
  const router = useRouter()
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isEnding, setIsEnding] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)

  const {
    isConnected,
    isMuted,
    toggleMute,
    leaveCall,
    remoteAudioActive,
    localVolume,
    remoteVolume,
    networkQuality,
    error,
  } = useAgoraVoiceCall(agoraParams)

  // Timer
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isConnected])

  // Remote termination listener (when host ends or rejects the call)
  useEffect(() => {
    if (!call?.id) return
    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    const channel = supabase
      .channel(`user_call_room_status_${call.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'phone_a_friend_calls',
          filter: `id=eq.${call.id}`,
        },
        async (payload: any) => {
          if (payload.new && ['completed', 'rejected', 'cancelled'].includes(payload.new.status)) {
            try {
              await leaveCall()
            } catch {}
            setShowRatingModal(true)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [call?.id, leaveCall])

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = async () => {
    if (isEnding) return
    setIsEnding(true)
    try {
      await leaveCall()
      await endCallSessionApi(call.id, agoraParams.account)
      setShowRatingModal(true)
    } catch {
      setShowRatingModal(true)
    } finally {
      setIsEnding(false)
    }
  }

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingRating(true)
    try {
      await submitCallRatingApi({
        callId: call.id,
        userId: agoraParams.account,
        rating,
        review,
      })
      router.push('/phone-a-friend?thankyou=true')
    } catch {
      router.push('/phone-a-friend')
    } finally {
      setIsSubmittingRating(false)
    }
  }

  const hostName = call.host?.display_name || 'Your Host'
  const hostImage = call.host?.profile_image

  return (
    <div className="h-[100dvh] bg-zinc-950 text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-3 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-medium tracking-normal text-white">
              Phone a Friend
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-normal text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
              <span className="text-zinc-600 text-[10px]">•</span>
              <span className="text-[11px] font-normal text-zinc-400">Private Call</span>
            </div>
          </div>
        </div>

        {/* Network & Duration */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-normal text-zinc-400">
            <Wifi className={`w-3 h-3 ${networkQuality === 'good' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{networkQuality === 'good' ? 'Clear' : 'Weak'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-xs font-normal text-zinc-200">
            <Clock className="w-3 h-3 text-rose-400" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>
        </div>
      </header>

      {/* Center Stage: Host Avatar & Dynamic Sound Waveform */}
      <main className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto w-full px-2">
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-normal w-full">
            {error}
          </div>
        )}

        <div className="relative flex items-center justify-center my-2">
          {/* Dynamic sound wave rings driven by remote host audio volume */}
          <div
            className="absolute rounded-full border border-rose-500/20 transition-all duration-100 ease-out pointer-events-none"
            style={{
              width: `${130 + remoteVolume * 1.2}px`,
              height: `${130 + remoteVolume * 1.2}px`,
              opacity: remoteVolume > 5 ? 0.8 : 0.15,
            }}
          />
          <div
            className="absolute rounded-full bg-rose-500/10 blur-lg transition-all duration-100 ease-out pointer-events-none"
            style={{
              width: `${115 + remoteVolume * 1.0}px`,
              height: `${115 + remoteVolume * 1.0}px`,
              opacity: remoteVolume > 5 ? 0.6 : 0.1,
            }}
          />

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-zinc-700 shadow-xl overflow-hidden bg-zinc-900 flex items-center justify-center">
            {hostImage ? (
              <Image
                src={hostImage}
                alt={hostName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <span className="text-2xl sm:text-3xl font-medium text-rose-400">
                {hostName.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-medium text-white tracking-normal">{hostName}</h2>
          <p className="text-xs text-zinc-400 font-normal">
            {remoteAudioActive ? 'Speaking now...' : 'Listening to you...'}
          </p>
        </div>

        {/* Local mic status indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800 text-[11px] font-normal text-zinc-400">
          <span
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: isMuted ? '#ef4444' : localVolume > 5 ? '#10b981' : '#71717a',
            }}
          />
          <span>{isMuted ? 'Your mic is off' : 'Your mic is on'}</span>
        </div>
      </main>

      {/* Bottom Controls Dock */}
      <footer className="relative z-10 flex items-center justify-center gap-4 pt-4 border-t border-zinc-800/80 max-w-sm mx-auto w-full pb-2">
        {/* Mute/Unmute */}
        <button
          onClick={toggleMute}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors border ${
            isMuted
              ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
              : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
          }`}
          title={isMuted ? 'Turn on microphone' : 'Turn off microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* End Call */}
        <button
          onClick={handleEndCall}
          disabled={isEnding}
          className="h-11 px-6 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-medium text-xs flex items-center gap-2 border border-red-500/30 transition-all shadow-sm"
        >
          {isEnding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <PhoneOff className="w-4 h-4" />
          )}
          End Call
        </button>
      </footer>

      {/* Post-call Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-zinc-950 text-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm border border-zinc-800 p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-medium tracking-normal text-white">
                How was your call?
              </h3>
              <p className="text-xs text-zinc-400 font-normal">
                Please rate your conversation with {hostName}. It helps us maintain a friendly community.
              </p>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        s <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-zinc-700 hover:text-zinc-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Review Text */}
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                placeholder="Write a few words about how you felt (optional)..."
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-normal text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 resize-none"
              />

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => router.push('/phone-a-friend')}
                  className="flex-1 py-2 rounded-full border border-zinc-800 hover:bg-zinc-900 text-zinc-400 text-xs font-normal transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRating}
                  className="flex-1 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium transition-colors"
                >
                  {isSubmittingRating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
