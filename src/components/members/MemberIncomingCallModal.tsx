'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, PhoneOff, Star, ShieldCheck, Sparkles } from 'lucide-react'
import { respondMemberCallApi, checkActiveIncomingCallApi } from '@/lib/memberCallService'
import { createClientClient } from '@/lib/supabaseClient'

interface MemberIncomingCallModalProps {
  currentUserId: string
  onCallAccepted: (call: any) => void
}

export default function MemberIncomingCallModal({
  currentUserId,
  onCallAccepted,
}: MemberIncomingCallModalProps) {
  const [incomingCall, setIncomingCall] = useState<any>(null)
  const [isResponding, setIsResponding] = useState(false)
  const incomingCallRef = useRef<any>(null)
  incomingCallRef.current = incomingCall

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize ringtone
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/call-ringtone.mp3')
      audio.loop = true
      audioRef.current = audio
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Play/pause ringtone with incoming call state
  useEffect(() => {
    if (incomingCall) {
      audioRef.current?.play().catch(() => {
        // Autoplay policy fallback
      })
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [incomingCall])

  // Polling fallback every 8 seconds for active ringing calls
  useEffect(() => {
    if (!currentUserId) return

    const pollActiveCall = async () => {
      try {
        const res = await checkActiveIncomingCallApi(currentUserId)
        const currentRinging = res?.call
        if (currentRinging && currentRinging.status === 'ringing') {
          if (!incomingCallRef.current || incomingCallRef.current.id !== currentRinging.id) {
            setIncomingCall(currentRinging)
          }
        } else if (incomingCallRef.current) {
          setIncomingCall(null)
        }
      } catch (e) {
        // Silent poll error
      }
    }

    pollActiveCall()
    const interval = setInterval(pollActiveCall, 8000)
    return () => clearInterval(interval)
  }, [currentUserId])

  // Supabase Realtime subscription for instant ring notification
  useEffect(() => {
    if (!currentUserId) return
    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    const channel = supabase
      .channel(`member_incoming_${currentUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'member_to_member_calls',
          filter: `receiver_id=eq.${currentUserId}`,
        },
        (payload: any) => {
          if (payload.new && payload.new.status === 'ringing') {
            setIncomingCall(payload.new)
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'member_to_member_calls',
          filter: `receiver_id=eq.${currentUserId}`,
        },
        (payload: any) => {
          if (payload.new) {
            if (payload.new.status === 'ringing') {
              setIncomingCall(payload.new)
            } else if (
              incomingCallRef.current?.id === payload.new.id &&
              ['cancelled', 'rejected', 'completed', 'missed'].includes(payload.new.status)
            ) {
              setIncomingCall(null)
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentUserId])

  const handleAccept = async () => {
    if (!incomingCall || isResponding) return
    setIsResponding(true)
    try {
      const res = await respondMemberCallApi({
        callId: incomingCall.id,
        responderId: currentUserId,
        action: 'accept',
      })
      if (res.success) {
        onCallAccepted(res.call || incomingCall)
        setIncomingCall(null)
      }
    } catch (err: any) {
      alert(err.message || 'Failed to accept call')
      setIncomingCall(null)
    } finally {
      setIsResponding(false)
    }
  }

  const handleDecline = async () => {
    if (!incomingCall || isResponding) return
    setIsResponding(true)
    try {
      await respondMemberCallApi({
        callId: incomingCall.id,
        responderId: currentUserId,
        action: 'reject',
      })
    } catch (err) {
      // Ignore
    } finally {
      setIncomingCall(null)
      setIsResponding(false)
    }
  }

  if (!incomingCall) return null

  const callerAlias = incomingCall.caller?.anonymous_alias || incomingCall.callerAlias || 'Verified Member'
  const callerGender = incomingCall.callerGender || incomingCall.caller?.gender || 'Not specified'
  const callerAge = incomingCall.callerAge || 'Not shared'

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl border border-gray-100 p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-300 text-center">
        
        {/* Top minimal status indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-normal tracking-wide mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Incoming Audio Call
        </div>

        {/* Member Avatar / Identifier */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center shadow-inner mb-3">
          <span className="text-2xl select-none">👤</span>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white">
            <Phone className="w-2.5 h-2.5 fill-white" />
          </div>
        </div>

        {/* Caller Alias */}
        <h3 className="text-base font-medium text-gray-900 tracking-tight leading-snug">
          {callerAlias}
        </h3>

        {/* Demographics: Gender & Age (Thin & Sleek) */}
        <div className="flex items-center justify-center gap-2 mt-1 mb-4 text-xs text-gray-500 font-light">
          <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100">
            {callerGender}
          </span>
          <span className="text-gray-300">•</span>
          <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100">
            {callerAge}
          </span>
        </div>

        <p className="text-[11px] text-gray-400 font-light mb-5">
          1-on-1 confidential voice call • Free to receive
        </p>

        {/* Action Buttons: Minimal, Modern, Sleek */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDecline}
            disabled={isResponding}
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 border border-transparent hover:border-rose-100 text-xs font-normal transition-all active:scale-95"
          >
            <PhoneOff className="w-4 h-4 text-rose-500" />
            <span>Decline</span>
          </button>

          <button
            onClick={handleAccept}
            disabled={isResponding}
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 text-xs font-normal transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Accept Call</span>
          </button>
        </div>

      </div>
    </div>
  )
}
