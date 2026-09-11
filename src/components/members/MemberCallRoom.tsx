'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Mic,
  MicOff,
  PhoneOff,
  Clock,
  Wifi,
  Star,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react'
import { useAgoraVoiceCall } from '@/hooks/useAgoraVoiceCall'
import { endMemberCallApi, submitMemberCallRatingApi } from '@/lib/memberCallService'
import { submitReportApi } from '@/lib/callService'
import { getDeviceFingerprint } from '@/lib/deviceFingerprint'
import { createClientClient } from '@/lib/supabaseClient'

interface MemberCallRoomProps {
  call: any
  currentUserId: string
  userCredits: number
  agoraParams: {
    appId: string
    channelName: string
    token: string
    account: string
  }
  onCallClosed: () => void
}

export default function MemberCallRoom({
  call,
  currentUserId,
  userCredits,
  agoraParams,
  onCallClosed,
}: MemberCallRoomProps) {
  const isCaller = call.caller_id === currentUserId
  const otherMember = isCaller ? call.receiver : call.caller
  const otherAlias = otherMember?.anonymous_alias || (isCaller ? 'Receiver' : 'Caller')
  const otherGender = isCaller ? (call.receiverGender || 'Not specified') : (call.callerGender || 'Not specified')
  const otherAge = isCaller ? (call.receiverAge || 'Not shared') : (call.callerAge || 'Not shared')

  const [currentCall, setCurrentCall] = useState(call)
  const isCallAccepted = currentCall.status === 'accepted' || currentCall.status === 'in_call' || !!currentCall.started_at

  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isEnding, setIsEnding] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)
  const [endSummary, setEndSummary] = useState<any>(null)

  // Harassment reporting state
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('verbal_harassment')
  const [reportDetails, setReportDetails] = useState('')
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)

  // Calculate maximum allowed minutes based on caller's credits
  const maxAllowedMinutes = isCaller ? Math.floor(Math.max(0, userCredits) / 10) : 180
  const maxAllowedSeconds = Math.max(60, maxAllowedMinutes * 60)
  const secondsRemaining = Math.max(0, maxAllowedSeconds - secondsElapsed)

  const {
    isConnected,
    isMuted,
    toggleMute,
    leaveCall,
    remoteAudioActive,
    networkQuality,
    isMicBlocked,
    isAutoplayBlocked,
    resumeAutoplay,
    requestMicPermission,
  } = useAgoraVoiceCall(agoraParams)

  // Timer: smoothly ticks every second ONLY after both members accepted the call
  useEffect(() => {
    if (!isCallAccepted) {
      setSecondsElapsed(0)
      return
    }

    const startTs = currentCall.started_at ? new Date(currentCall.started_at).getTime() : Date.now()
    setSecondsElapsed(Math.max(0, Math.floor((Date.now() - startTs) / 1000)))

    const interval = setInterval(() => {
      const elapsed = Math.max(0, Math.floor((Date.now() - startTs) / 1000))
      setSecondsElapsed(elapsed)

      // Auto-hangup when caller runs out of credits
      if (isCaller && elapsed >= maxAllowedSeconds && !isEnding) {
        handleEndCall()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isCallAccepted, currentCall.started_at, maxAllowedSeconds, isCaller, isEnding])

  // Remote call status listener (listens for acceptance, cancellation, and hangup)
  useEffect(() => {
    if (!call?.id) return
    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    const channel = supabase
      .channel(`member_call_status_${call.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'member_to_member_calls',
          filter: `id=eq.${call.id}`,
        },
        async (payload: any) => {
          if (!payload.new) return
          setCurrentCall(payload.new)

          if (['completed', 'cancelled', 'rejected'].includes(payload.new.status)) {
            await leaveCall()
            setEndSummary(payload.new)
            setShowRatingModal(true)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [call?.id, leaveCall])

  const handleEndCall = async () => {
    if (isEnding) return
    setIsEnding(true)
    try {
      await leaveCall()
      const res = await endMemberCallApi(call.id, currentUserId)
      setEndSummary(res)
      setShowRatingModal(true)
    } catch (err: any) {
      console.warn('Error ending call:', err)
      setShowRatingModal(true)
    } finally {
      setIsEnding(false)
    }
  }

  const handleRatingSubmit = async () => {
    setIsSubmittingRating(true)
    try {
      await submitMemberCallRatingApi({
        callId: call.id,
        userId: currentUserId,
        rating,
        review: review.trim() || undefined,
      })
    } catch (e) {
      // Non-blocking
    } finally {
      setIsSubmittingRating(false)
      setShowRatingModal(false)
      onCallClosed()
    }
  }

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingReport(true)
    try {
      const dfp = getDeviceFingerprint()
      await submitReportApi({
        reporterId: currentUserId,
        reportedId: otherMember?.id || (isCaller ? call.receiver_id : call.caller_id),
        reportedType: 'member_user',
        reason: reportReason,
        details: reportDetails,
        callId: call.id,
        callRef: call.call_ref,
        deviceFingerprint: dfp,
      })
      setReportSubmitted(true)
      setTimeout(() => {
        setShowReportModal(false)
        setReportSubmitted(false)
      }, 2000)
    } catch (err: any) {
      alert(err.message || 'Failed to submit report.')
    } finally {
      setIsSubmittingReport(false)
    }
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const currentBilledMinutes = Math.max(1, Math.ceil(secondsElapsed / 60))
  const currentCreditCost = isCaller ? currentBilledMinutes * 10 : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Main Room Card - Slim & Sleek */}
      <div className="relative w-full max-w-sm bg-gray-950/90 text-white rounded-3xl border border-white/10 p-6 shadow-2xl flex flex-col items-center">
        
        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between text-xs text-gray-400 font-light mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-gray-300">Confidential Audio</span>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-rose-400 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400/80" />
            <span>Report</span>
          </button>
        </div>

        {/* Center Partner Avatar & Ring */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/15 flex items-center justify-center shadow-lg overflow-hidden">
            {otherMember?.avatar_url ? (
              <img
                src={otherMember.avatar_url}
                alt={otherAlias}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-3xl select-none">👤</span>
            )}
          </div>
          {remoteAudioActive && (
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/60 animate-ping" />
          )}
        </div>

        {/* Partner Details */}
        <h2 className="text-lg font-normal text-white tracking-tight leading-snug">
          {otherAlias}
        </h2>

        {/* Demographics: Gender & Age (Thin & Sleek) */}
        <div className="flex items-center gap-2 mt-1 mb-5 text-xs text-gray-400 font-light">
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
            {otherGender}
          </span>
          <span className="text-gray-500">•</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
            {otherAge}
          </span>
        </div>

        {/* Timer Display */}
        <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-3 flex items-center justify-around mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-light">Duration</span>
            <span className="text-base font-light tracking-wide text-white">
              {isCallAccepted ? (
                formatTimer(secondsElapsed)
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-normal animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Ringing...
                </span>
              )}
            </span>
          </div>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-light">
              {isCaller ? 'Cost' : 'Status'}
            </span>
            <span className="text-base font-light tracking-wide text-amber-400">
              {isCaller 
                ? (isCallAccepted ? `${currentCreditCost} 🪙` : '0 🪙 (Ringing)') 
                : (isCallAccepted ? 'Free to Listen' : 'Connecting...')}
            </span>
          </div>
        </div>

        {/* Balance Warning for Caller */}
        {isCaller && (
          <div className="text-[11px] text-gray-400 font-light text-center mb-6">
            {isCallAccepted ? (
              <>
                <span>Remaining balance time: </span>
                <span className={secondsRemaining < 60 ? 'text-rose-400 font-normal' : 'text-gray-200'}>
                  {formatTimer(secondsRemaining)}
                </span>
              </>
            ) : (
              <span className="text-emerald-400/90 font-light">
                Credits will be counted only after member answers
              </span>
            )}
          </div>
        )}

        {/* Audio blocked / Mic permission prompts */}
        {isAutoplayBlocked && (
          <button
            onClick={resumeAutoplay}
            className="w-full mb-4 py-2 px-3 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-light text-center"
          >
            Tap here to enable speaker audio
          </button>
        )}

        {isMicBlocked && (
          <button
            onClick={requestMicPermission}
            className="w-full mb-4 py-2 px-3 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-light text-center"
          >
            Mic blocked. Tap to grant microphone access.
          </button>
        )}

        {/* Floating Call Action Controls */}
        <div className="flex items-center justify-center gap-5 w-full">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all active:scale-95 ${
              isMuted
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-400'
                : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            disabled={isEnding}
            className="flex-1 py-3 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 text-xs font-normal transition-all active:scale-95 disabled:opacity-50"
          >
            {isEnding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* POST-CALL RATING & REVIEW MODAL                          */}
      {/* ========================================================= */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-6 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-base font-normal text-gray-900 tracking-tight">Call Finished</h3>
            <p className="text-xs text-gray-500 font-light mt-0.5 mb-4">
              Duration: {formatTimer(secondsElapsed)}
              {isCaller && endSummary?.creditsDeducted
                ? ` • Deducted: ${endSummary.creditsDeducted} 🪙`
                : ''}
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
              <span className="text-[11px] text-gray-500 font-light block mb-2">
                Rate your conversation with {otherAlias}
              </span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform active:scale-125"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Optional: share feedback (only visible to support/reputation)"
              rows={2}
              className="w-full text-xs font-light rounded-xl border border-gray-200 p-2.5 mb-4 focus:outline-none focus:border-gray-400 resize-none text-gray-800"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowRatingModal(false)
                  onCallClosed()
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-light hover:bg-gray-50 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={isSubmittingRating}
                className="flex-1 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-light transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmittingRating ? 'Saving...' : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* REPORT MEMBER MODAL (SIMPLE ENGLISH & NO DROPDOWN BUGS)  */}
      {/* ========================================================= */}
      {showReportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-5 shadow-2xl text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-rose-600 text-xs font-medium">
                <ShieldAlert className="w-4 h-4" />
                <span>Report Member</span>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center text-emerald-600 text-xs font-light">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                Report sent. Our team will review this call and take action.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-gray-500 font-light block mb-2">
                    What went wrong?
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { value: 'demanding_contact', label: 'Asking for phone number or money' },
                      { value: 'verbal_harassment', label: 'Rude or abusive words' },
                      { value: 'inappropriate_content', label: 'Inappropriate behavior' },
                      { value: 'spam', label: 'Spam or advertisement' },
                      { value: 'other', label: 'Other issue' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setReportReason(opt.value)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          reportReason === opt.value
                            ? 'border-rose-300 bg-rose-50/60 text-rose-900 font-medium'
                            : 'border-gray-200/80 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            reportReason === opt.value
                              ? 'border-rose-500 bg-rose-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {reportReason === opt.value && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 font-light block mb-1">
                    More details (optional)
                  </label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    rows={2}
                    placeholder="Tell us what happened..."
                    className="w-full text-xs font-light rounded-xl border border-gray-200 p-2.5 text-gray-800 focus:outline-none focus:border-gray-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-light hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReport}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-normal transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingReport ? 'Sending...' : 'Send Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
