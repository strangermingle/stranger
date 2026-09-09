'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Phone, 
  PhoneCall, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Star, 
  Volume2, 
  Lock, 
  X, 
  Loader2, 
  PhoneOff,
  Sparkles,
  MessageCircle
} from 'lucide-react'
import { createClientClient } from '@/lib/supabaseClient'
import { initiateCallSession, fetchHostCallingDetails, createCallPaymentOrderApi } from '@/lib/callService'
import { useAuth } from '@/components/AuthProvider'

interface PhoneAFriendClientProps {
  initialHosts: any[]
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PhoneAFriendClient({ initialHosts }: PhoneAFriendClientProps) {
  const router = useRouter()
  const { user, mappedUserId } = useAuth()
  const [hosts, setHosts] = useState(initialHosts)
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [activeTab, setActiveTab] = useState<'online' | 'slots'>('online')

  // Helper to get or generate a valid UUID caller ID
  const getCallerUid = () => {
    if (mappedUserId) {
      localStorage.setItem('sm_caller_uid', mappedUserId)
      document.cookie = `sm_caller_uid=${mappedUserId}; path=/; max-age=31536000`
      return mappedUserId
    }

    let callerUid = localStorage.getItem('sm_caller_uid')
    // If empty or an old non-UUID string like 'user_dn7xs16', generate a standard UUID
    if (!callerUid || !UUID_REGEX.test(callerUid)) {
      callerUid = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : '10000000-1000-4000-8000-' + Math.random().toString(16).slice(2, 14).padEnd(12, '0')
      localStorage.setItem('sm_caller_uid', callerUid)
      document.cookie = `sm_caller_uid=${callerUid}; path=/; max-age=31536000`
    }
    return callerUid
  }

  // Pay via Razorpay and initiate call session
  const payAndInitiateCall = async ({
    hostId,
    hostName,
    callType,
    slotId = null,
    amount,
    onSuccess,
  }: {
    hostId: string
    hostName: string
    callType: 'instant' | 'scheduled'
    slotId?: string | null
    amount: number
    onSuccess: (res: any) => void
  }) => {
    const isLoaded = await loadRazorpayScript()
    if (!isLoaded) {
      throw new Error('Could not load payment gateway. Please check your internet connection.')
    }

    const callerUid = getCallerUid()

    // 1. Create Razorpay order on backend
    const orderData = await createCallPaymentOrderApi({
      userId: callerUid,
      hostId,
      callType,
      slotId,
      amount,
    })

    if (!orderData?.orderId) {
      throw new Error('Failed to create payment order. Please try again.')
    }

    // 2. Open Razorpay Checkout
    return new Promise<void>((resolve, reject) => {
      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Stranger Mingle',
        description:
          callType === 'instant'
            ? `1-on-1 Audio Call with ${hostName}`
            : `Scheduled Call Slot with ${hostName}`,
        order_id: orderData.orderId,
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
        },
        theme: {
          color: '#f43f5e',
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment was cancelled.'))
          },
        },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            // 3. Initiate call with verified payment
            const res = await initiateCallSession({
              userId: callerUid,
              hostId,
              callType,
              slotId,
              amount,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            })
            onSuccess(res)
            resolve()
          } catch (err: any) {
            reject(err)
          }
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', (resp: any) => {
        reject(new Error(resp.error?.description || 'Payment failed'))
      })
      rzp.open()
    })
  }

  // Calling Modal States
  const [activeCallHost, setActiveCallHost] = useState<any | null>(null)
  const [isInitiating, setIsInitiating] = useState(false)
  const [ringingCall, setRingingCall] = useState<any | null>(null)
  const [callError, setCallError] = useState<string | null>(null)

  // Booking Slot Modal States
  const [slotHostDetails, setSlotHostDetails] = useState<any | null>(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null)
  const [isBookingSlot, setIsBookingSlot] = useState(false)

  // Web Audio Ringing Chime
  const ringIntervalRef = useRef<any>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Extract languages and topics
  const allLanguages = ['All', ...Array.from(new Set(hosts.flatMap(h => h.languages || [])))]
  const allTopics = ['All', ...Array.from(new Set(hosts.flatMap(h => h.topics || [])))]

  // Real-time host online status updates
  useEffect(() => {
    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    const channel = supabase
      .channel('public_host_settings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'phone_a_friend_host_settings',
        },
        (payload: any) => {
          if (payload.new) {
            setHosts((prev) =>
              prev.map((h) =>
                h.host_id === payload.new.host_id
                  ? { ...h, ...payload.new }
                  : h
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Client-side fetch fallback
  useEffect(() => {
    if (hosts.length === 0) {
      import('@/lib/callService').then(({ fetchApprovedCallingHosts }) => {
        fetchApprovedCallingHosts()
          .then((data) => {
            if (data && Array.isArray(data)) setHosts(data)
          })
          .catch(() => {})
      })
    }
  }, [hosts.length])

  // Ringing chime
  const startOutgoingRing = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      audioCtxRef.current = new AudioCtx()

      const ringTone = () => {
        if (!audioCtxRef.current) return
        const ctx = audioCtxRef.current
        const now = ctx.currentTime

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.frequency.setValueAtTime(440, now)
        osc2.frequency.setValueAtTime(480, now)

        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start(now)
        osc2.start(now)
        osc1.stop(now + 1.2)
        osc2.stop(now + 1.2)
      }

      ringTone()
      ringIntervalRef.current = setInterval(ringTone, 3000)
    } catch (e) {
      console.warn('Ringtone warning:', e)
    }
  }

  const stopOutgoingRing = () => {
    if (ringIntervalRef.current) {
      clearInterval(ringIntervalRef.current)
      ringIntervalRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
  }

  // Ringing listener
  useEffect(() => {
    if (!ringingCall) return

    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    startOutgoingRing()

    const channel = supabase
      .channel(`call_status_${ringingCall.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'phone_a_friend_calls',
          filter: `id=eq.${ringingCall.id}`,
        },
        (payload: any) => {
          if (payload.new) {
            if (payload.new.status === 'in_progress' || payload.new.status === 'accepted') {
              stopOutgoingRing()
              router.push(`/phone-a-friend/call/${ringingCall.id}?uid=${ringingCall.user_id}`)
            } else if (payload.new.status === 'rejected') {
              stopOutgoingRing()
              setCallError('The host is busy right now. Please try again in a few minutes or choose another host.')
              setRingingCall(null)
            }
          }
        }
      )
      .subscribe()

    const timeout = setTimeout(() => {
      stopOutgoingRing()
      setCallError('No answer from host. Please try another host or book an upcoming slot.')
      setRingingCall(null)
    }, 45000)

    return () => {
      stopOutgoingRing()
      clearTimeout(timeout)
      supabase.removeChannel(channel)
    }
  }, [ringingCall, router])

  // Filtered lists
  const filteredHosts = hosts.filter((h) => {
    if (selectedLanguage !== 'All' && !(h.languages || []).includes(selectedLanguage)) {
      return false
    }
    if (selectedTopic !== 'All' && !(h.topics || []).includes(selectedTopic)) {
      return false
    }
    return true
  })

  const onlineHosts = filteredHosts.filter((h) => h.is_online)

  const handleStartInstantCall = async () => {
    if (!activeCallHost) return
    setIsInitiating(true)
    setCallError(null)

    try {
      await payAndInitiateCall({
        hostId: activeCallHost.host_id,
        hostName: activeCallHost.host?.display_name || 'Host',
        callType: 'instant',
        amount: activeCallHost.rate_per_session || 49,
        onSuccess: (res) => {
          setRingingCall(res.call)
        },
      })
    } catch (err: any) {
      if (err.message !== 'Payment was cancelled.') {
        setCallError(err.message || 'Could not start call. Please try again.')
      }
    } finally {
      setIsInitiating(false)
    }
  }

  const handleOpenSlots = async (host: any) => {
    setIsLoadingSlots(true)
    try {
      const details = await fetchHostCallingDetails(host.host_id)
      setSlotHostDetails({ ...host, ...details })
    } catch {
      // Fallback
    } finally {
      setIsLoadingSlots(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 pb-20 font-sans">
      {/* Mobile-Optimised Header / Hero */}
      <section className="bg-white border-b border-gray-100 pt-8 pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Just Talk — Phone a Friend
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Need someone Just for Talk?
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
            Feeling stressed, lonely, bored, or just want to share your day? Talk 1-on-1 with verified friendly people over a private voice call. No camera, no judgment.
          </p>

          {/* Simple Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 text-xs text-gray-500 font-normal">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Anonymous
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-rose-500" />
              Audio Only (No Camera)
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
              Hindi, English & Regional
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Navigation Tabs (Thinner, mobile-friendly design) */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 border ${
              activeTab === 'online'
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'online' ? 'bg-white' : 'bg-emerald-500'} animate-pulse`} />
            Talk Now ({onlineHosts.length} Online)
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 border ${
              activeTab === 'slots'
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book a Slot
          </button>
        </div>

        {/* Filter Bar (Scrollable for Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-gray-400 font-medium whitespace-nowrap pl-1">Language:</span>
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors border ${
                selectedLanguage === lang
                  ? 'bg-gray-900 text-white border-gray-900 font-medium'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 font-normal'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Tab 1: Talk Now (Online Hosts) */}
        {activeTab === 'online' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 font-normal px-1">
              <span>Online hosts ready to talk right now</span>
              <span>₹99 / 15 mins</span>
            </div>

            {onlineHosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                  <PhoneOff className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-gray-900">No hosts online right now</h2>
                  <p className="text-xs text-gray-500 font-normal max-w-sm mx-auto">
                    Our hosts are currently in calls or offline. Please switch to &quot;Book a Slot&quot; to pick a time for later.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('slots')}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                >
                  View Upcoming Slots
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {onlineHosts.map((item) => {
                  const host = item.host || {}
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-3"
                    >
                      {/* Host Header */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          {host.profile_image ? (
                            <Image
                              src={host.profile_image}
                              alt={host.display_name || 'Host'}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-medium text-rose-600 bg-rose-50 text-sm">
                              {(host.display_name || 'H').substring(0, 2)}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h2 className="text-sm font-semibold text-gray-900 truncate">
                              {host.display_name}
                            </h2>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" title="Online" />
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                            <span>{host.city || 'India'}</span>
                            <span>•</span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-gray-700">{item.rating_avg || '5.0'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-gray-600 font-normal line-clamp-2 leading-relaxed">
                        {item.bio || host.description || 'Happy to listen and chat with you warmly.'}
                      </p>

                      {/* Spoken Languages & Topics */}
                      <div className="flex flex-wrap gap-1">
                        {(item.languages || ['Hindi', 'English']).map((lang: string) => (
                          <span key={lang} className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                            {lang}
                          </span>
                        ))}
                        {(item.topics || ['Casual Chat']).slice(0, 2).map((t: string) => (
                          <span key={t} className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Price & Call Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500 font-normal">
                          <span className="text-sm font-semibold text-gray-900">₹{item.rate_per_session || 99}</span>
                          <span className="text-[11px]"> / {item.session_duration_minutes || 15}m</span>
                        </div>

                        <button
                          onClick={() => setActiveCallHost(item)}
                          className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Now
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Book a Slot */}
        {activeTab === 'slots' && (
          <div className="space-y-4">
            <div className="text-xs text-gray-500 font-normal px-1">
              Select a host to view their available call timings
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filteredHosts.map((item) => {
                const host = item.host || {}
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        {host.profile_image ? (
                          <Image
                            src={host.profile_image}
                            alt={host.display_name || 'Host'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-medium text-gray-600 bg-gray-100 text-sm">
                            {(host.display_name || 'H').substring(0, 2)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm font-semibold text-gray-900 truncate">
                          {host.display_name}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                          <span>{host.city || 'India'}</span>
                          <span>•</span>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-gray-700">{item.rating_avg || '5.0'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 font-normal line-clamp-2 leading-relaxed">
                      {item.bio || host.description || 'Friendly listener ready to talk with you.'}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {(item.languages || ['Hindi', 'English']).map((lang: string) => (
                        <span key={lang} className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500 font-normal">
                        <span className="text-sm font-semibold text-gray-900">₹{item.rate_per_session || 99}</span>
                        <span className="text-[11px]"> / {item.session_duration_minutes || 15}m</span>
                      </div>

                      <button
                        onClick={() => handleOpenSlots(item)}
                        className="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-gray-800 text-xs font-medium transition-all flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        Pick a Time
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Instant Call Modal (Mobile Optimised Sheet) */}
      {activeCallHost && !ringingCall && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm border border-gray-200 p-6 space-y-5 shadow-xl relative">
            <button
              onClick={() => setActiveCallHost(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border border-gray-200">
                {activeCallHost.host?.profile_image ? (
                  <Image
                    src={activeCallHost.host?.profile_image}
                    alt={activeCallHost.host?.display_name || 'Host'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-medium text-rose-500 bg-rose-50 text-xl">
                    {(activeCallHost.host?.display_name || 'H').substring(0, 2)}
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-gray-900">
                  Call {activeCallHost.host?.display_name}
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  {activeCallHost.session_duration_minutes || 15} minutes audio conversation
                </p>
              </div>
            </div>

            {callError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-normal text-center">
                {callError}
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-xs text-gray-600 font-normal">
              <div className="flex justify-between">
                <span>Call charges:</span>
                <span className="font-semibold text-gray-900">₹{activeCallHost.rate_per_session || 99}</span>
              </div>
              <div className="flex justify-between">
                <span>Privacy:</span>
                <span className="font-medium text-emerald-700">100% Private (No video)</span>
              </div>
            </div>

            <button
              onClick={handleStartInstantCall}
              disabled={isInitiating}
              className="w-full py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-98 text-white text-xs font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isInitiating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Phone className="w-3.5 h-3.5" />
              )}
              Start Call Now (₹{activeCallHost.rate_per_session || 99})
            </button>
          </div>
        </div>
      )}

      {/* Ringing Screen Modal */}
      {ringingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-150 text-white">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-sm border border-zinc-800 p-8 space-y-6 text-center shadow-2xl">
            <div className="relative mx-auto w-24 h-24 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border border-rose-400 shadow-lg">
                {activeCallHost?.host?.profile_image ? (
                  <Image
                    src={activeCallHost.host?.profile_image}
                    alt={activeCallHost.host?.display_name || 'Host'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-300 font-semibold text-xl bg-zinc-800">
                    {(activeCallHost?.host?.display_name || 'H').substring(0, 2)}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-medium animate-pulse">
                Calling...
              </div>
              <h3 className="text-lg font-semibold text-white">
                {activeCallHost?.host?.display_name}
              </h3>
              <p className="text-xs text-zinc-400 font-normal">
                Please wait while the host picks up your call...
              </p>
            </div>

            <button
              onClick={() => {
                stopOutgoingRing()
                setRingingCall(null)
              }}
              className="py-2 px-6 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-normal transition-colors inline-flex items-center gap-1.5"
            >
              <PhoneOff className="w-3.5 h-3.5 text-red-400" />
              Cancel Call
            </button>
          </div>
        </div>
      )}

      {/* Book Slots Modal */}
      {slotHostDetails && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm border border-gray-200 p-6 space-y-4 shadow-xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => {
                setSlotHostDetails(null)
                setSelectedSlot(null)
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                {slotHostDetails.host?.profile_image ? (
                  <Image
                    src={slotHostDetails.host?.profile_image}
                    alt={slotHostDetails.host?.display_name || 'Host'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-medium text-gray-600 bg-gray-100 text-xs">
                    {(slotHostDetails.host?.display_name || 'H').substring(0, 2)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {slotHostDetails.host?.display_name}
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Select a convenient time slot
                </p>
              </div>
            </div>

            {(!slotHostDetails.slots || slotHostDetails.slots.length === 0) ? (
              <div className="py-8 text-center text-gray-500 font-normal text-xs">
                No slots open right now for this host. Please check back later.
              </div>
            ) : (
              <div className="space-y-2">
                {slotHostDetails.slots.map((s: any) => {
                  const isBooked = s.status === 'booked'
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        if (!isBooked) setSelectedSlot(s)
                      }}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                        isBooked
                          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-75'
                          : selectedSlot?.id === s.id
                          ? 'border-rose-500 bg-rose-50/50 text-rose-900 cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 cursor-pointer'
                      }`}
                    >
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <span>
                            {new Date(s.slot_date).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          {isBooked && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-200 text-gray-600">
                              Booked
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-[11px]">
                          {new Date(s.start_time).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {isBooked ? <span className="text-gray-400">Booked</span> : `₹${s.price}`}
                      </div>
                    </div>
                  )
                })}

                {selectedSlot && (
                  <button
                    disabled={isBookingSlot}
                    onClick={async () => {
                      setIsBookingSlot(true)
                      try {
                        await payAndInitiateCall({
                          hostId: slotHostDetails.host_id,
                          hostName: slotHostDetails.host?.display_name || 'Host',
                          callType: 'scheduled',
                          slotId: selectedSlot.id,
                          amount: selectedSlot.price || 49,
                          onSuccess: (res) => {
                            setSlotHostDetails(null)
                            router.push(`/phone-a-friend?booked=true&ref=${res.call?.call_ref}`)
                          },
                        })
                      } catch (err: any) {
                        if (err.message !== 'Payment was cancelled.') {
                          alert(err.message || 'Payment or booking failed')
                        }
                      } finally {
                        setIsBookingSlot(false)
                      }
                    }}
                    className="w-full py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-98 text-white text-xs font-medium transition-all shadow-sm mt-3 flex items-center justify-center gap-2"
                  >
                    {isBookingSlot ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Pay & Confirm Slot (₹{selectedSlot.price})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
