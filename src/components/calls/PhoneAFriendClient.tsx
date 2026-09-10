'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Phone, 
  Clock, 
  ShieldCheck, 
  Star, 
  Volume2, 
  Mic,
  Lock, 
  X, 
  Loader2, 
  PhoneOff,
  Sparkles,
  MessageCircle,
  AlertTriangle,
  Scale,
  HeartHandshake,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Users,
  Coins,
  PlusCircle,
  LogIn
} from 'lucide-react'
import { createClientClient } from '@/lib/supabaseClient'
import { 
  initiateCallSession, 
  cancelCallSessionApi,
  createCreditsOrderApi, 
  verifyCreditsOrderApi 
} from '@/lib/callService'
import { useAuth } from '@/components/AuthProvider'
import { getDeviceFingerprint } from '@/lib/deviceFingerprint'
import WeekendEvents from '@/components/event/WeekendEvents'
import SponsoredAd from '@/components/ads/SponsoredAd'
import MembershipAd from '@/components/ads/MembershipAd'

interface PhoneAFriendClientProps {
  initialHosts: any[]
  faqs?: Array<{ q: string; a: string }>
}

const DEFAULT_FAQS = [
  {
    q: 'What is Phone a Friend on Stranger Mingle?',
    a: 'Phone a Friend is an audio-only, 1-on-1 private calling service by Stranger Mingle connecting users across India with warm, verified, and empathetic listeners. Designed for platonic conversations, venting, stress relief, and combating loneliness, it offers a safe, judgment-free space to speak your mind without video or cameras.'
  },
  {
    q: 'How does Phone a Friend work?',
    a: 'Simply choose any active online host and click "Call Now" to connect instantly for a 1-on-1 private audio conversation using your call credits. If you need credits, you can recharge your credit wallet in seconds with transparent pricing.'
  },
  {
    q: 'What are the charges and session duration?',
    a: 'Calls are credit-based, typically 490 credits (equivalent to ₹49) for a 15-minute focused session. 1 INR equals 10 credits. You can recharge credit packs anytime and redeem them seamlessly whenever you wish to talk.'
  },
  {
    q: 'Is Phone a Friend 100% anonymous and private?',
    a: 'Yes, completely. Your phone number, full name, email, and personal contact info are never shared with the host. All calls are audio-only with no cameras or video streaming enabled. You are identified only by a private caller alias.'
  },
  {
    q: 'What is the zero-tolerance harassment policy and legal warning?',
    a: 'Stranger Mingle strictly prohibits harassment, abusive language, obscenity, hate speech, or sexual misconduct toward hosts. Any violation results in immediate permanent account termination, IP blacklisting, and referral to Indian cybercrime and law enforcement authorities for formal legal proceedings under applicable IT Act and criminal provisions.'
  },
  {
    q: 'Can I meet the host in person or contact them outside the platform?',
    a: 'No. Stranger Mingle strictly facilitates online audio calls. Stranger Mingle holds no responsibility or liability if a caller and host choose to arrange personal in-person meetings, offline deals, financial transactions, or third-party communications outside the platform. Offline meetings with phone-a-friend hosts are completely unendorsed and at your own personal risk.'
  },
  {
    q: 'What happens if a host does not answer or declines my call?',
    a: 'If a host is busy or declines your call, the ringing stops immediately, you are notified, and your credits remain intact in your wallet. You can immediately call another available online host.'
  },
  {
    q: 'How can I apply to become a Phone a Friend host?',
    a: 'If you are an empathetic, articulate communicator who enjoys active listening, you can apply through Stranger Mingle\'s Host Partner portal. Approved hosts set their own rates, go online whenever free, and earn per completed session.'
  }
]

const CREDIT_PACKS = [
  { id: '1call', credits: 490, priceInr: 49, label: '1 Call (15m)', popular: false },
  { id: '2calls', credits: 1000, priceInr: 99, label: '~2 Calls (30m)', popular: true },
  { id: '5calls', credits: 2500, priceInr: 249, label: '~5 Calls (75m)', popular: false },
  { id: '10calls', credits: 5000, priceInr: 499, label: '~10 Calls (150m)', popular: false },
]

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

export default function PhoneAFriendClient({ initialHosts, faqs = DEFAULT_FAQS }: PhoneAFriendClientProps) {
  const router = useRouter()
  const { user, mappedUserId, credits, checkMembershipStatus } = useAuth()
  const [hosts, setHosts] = useState(initialHosts)
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Active call & Ringing state
  const [activeCallHost, setActiveCallHost] = useState<any | null>(null)
  const [checkoutDuration, setCheckoutDuration] = useState<number>(15)
  const [isInitiating, setIsInitiating] = useState(false)
  const [callError, setCallError] = useState<string | null>(null)
  const [ringingCall, setRingingCall] = useState<any | null>(null)

  // Credit Recharge Modal
  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [isRecharging, setIsRecharging] = useState(false)
  const [selectedPack, setSelectedPack] = useState(CREDIT_PACKS[1])
  const [rechargeSuccessMessage, setRechargeSuccessMessage] = useState<string | null>(null)

  // Helper to get or generate a valid UUID caller ID
  const getCallerUid = () => {
    if (mappedUserId) {
      localStorage.setItem('sm_caller_uid', mappedUserId)
      document.cookie = `sm_caller_uid=${mappedUserId}; path=/; max-age=31536000`
      return mappedUserId
    }

    let callerUid = localStorage.getItem('sm_caller_uid')
    if (!callerUid || !UUID_REGEX.test(callerUid)) {
      callerUid = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : '10000000-1000-4000-8000-' + Math.random().toString(16).slice(2, 14).padEnd(12, '0')
      localStorage.setItem('sm_caller_uid', callerUid)
      document.cookie = `sm_caller_uid=${callerUid}; path=/; max-age=31536000`
    }
    return callerUid
  }

  // Quick 1-click Google Sign-in to load credits
  const handleGoogleSignIn = async () => {
    try {
      const { auth } = await import('@/lib/firebase')
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: any) {
      console.error('[PhoneAFriend] Google Sign-in error:', err)
      alert(err.message || 'Could not complete sign in')
    }
  }

  // Start Call directly using Credits
  const handleStartCallWithCredits = async (host: any, duration: number = checkoutDuration) => {
    const baseRate = host.rate_per_session || 49
    const calculatedRate = Math.round((baseRate / 15) * duration)
    const creditsNeeded = calculatedRate * 10

    if (!user) {
      await handleGoogleSignIn()
      return
    }

    if ((credits || 0) < creditsNeeded) {
      setActiveCallHost(null)
      setShowRechargeModal(true)
      return
    }

    setIsInitiating(true)
    setCallError(null)

    // Pre-call Microphone Permission Verification
    try {
      if (typeof window !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch (permErr: any) {
      console.warn('Microphone permission denied before starting call:', permErr)
      setIsInitiating(false)
      setCallError('Microphone permission is required to start a voice call. Please allow microphone access in your browser and try again.')
      return
    }

    try {
      const callerUid = getCallerUid()
      const dfp = typeof window !== 'undefined' ? localStorage.getItem('sm_dfp') || undefined : undefined

      const res = await initiateCallSession({
        userId: callerUid,
        hostId: host.host_id,
        callType: 'instant',
        durationMinutes: duration,
        callerName: user.displayName || 'Caller',
        callerEmail: user.email || undefined,
        callerPhone: (user as any).phoneNumber || undefined,
        amount: calculatedRate,
        deviceFingerprint: dfp,
        paymentMethod: 'credits',
      })

      if (checkMembershipStatus) {
        checkMembershipStatus().catch(() => {})
      }

      setActiveCallHost(null)
      setRingingCall(res.call)
    } catch (err: any) {
      setCallError(err.message || 'Could not start call using credits.')
    } finally {
      setIsInitiating(false)
    }
  }

  // Purchase Credits via Razorpay
  const handlePurchaseCredits = async (pack: typeof CREDIT_PACKS[0]) => {
    setIsRecharging(true)
    try {
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) throw new Error('Payment gateway could not be loaded.')

      const callerUid = getCallerUid()
      const orderData = await createCreditsOrderApi({
        amountInr: pack.priceInr,
        credits: pack.credits,
        userId: callerUid,
        email: user?.email || undefined,
        name: user?.displayName || undefined,
      })

      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Stranger Mingle',
        description: `Recharge ${pack.credits} Call Credits`,
        order_id: orderData.orderId,
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
        },
        theme: {
          color: '#f59e0b',
        },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            await verifyCreditsOrderApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: callerUid,
              email: user?.email || undefined,
              creditsToAdd: pack.credits,
            })

            if (checkMembershipStatus) {
              await checkMembershipStatus()
            }

            setRechargeSuccessMessage(`+${pack.credits} credits added to your wallet!`)
            setTimeout(() => {
              setRechargeSuccessMessage(null)
              setShowRechargeModal(false)
            }, 1800)
          } catch (verErr: any) {
            alert(verErr.message || 'Payment verification failed.')
          }
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err: any) {
      alert(err.message || 'Credit purchase failed.')
    } finally {
      setIsRecharging(false)
    }
  }

  // Unique languages and topics
  const allLanguages = ['All', ...Array.from(new Set(hosts.flatMap((h) => h.languages || [])))]
  const allTopics = ['All', ...Array.from(new Set(hosts.flatMap((h) => h.topics || [])))]

  // Realtime subscription for host online status
  useEffect(() => {
    const supabase = createClientClient()
    if (!supabase || !supabase.channel) return

    const channel = supabase
      .channel('phone_a_friend_presence_public')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'phone_a_friend_host_settings',
        },
        (payload: any) => {
          if (payload.new) {
            setHosts((prev) =>
              prev.map((h) =>
                h.id === payload.new.id
                  ? {
                      ...h,
                      is_online: payload.new.is_online,
                      rate_per_session: payload.new.rate_per_session,
                      session_duration_minutes: payload.new.session_duration_minutes,
                      languages: payload.new.languages,
                      topics: payload.new.topics,
                      last_seen_at: payload.new.last_seen_at,
                    }
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

  // Outgoing Audio Ringtone
  const audioCtxRef = useRef<AudioContext | null>(null)
  const ringIntervalRef = useRef<any>(null)

  const startOutgoingRing = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

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
              setCallError('The host was unable to take your call. Your credits have been returned to your wallet.')
              setRingingCall(null)
              if (checkMembershipStatus) {
                checkMembershipStatus().catch(() => {})
              }
            }
          }
        }
      )
      .subscribe()

    const timeout = setTimeout(async () => {
      stopOutgoingRing()
      if (ringingCall?.id) {
        await cancelCallSessionApi(ringingCall.id, ringingCall.user_id).catch(() => {})
      }
      setCallError('No answer from host. Your credits remain safe in your wallet. Please try another online host.')
      setRingingCall(null)
      if (checkMembershipStatus) {
        checkMembershipStatus().catch(() => {})
      }
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

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 pb-20 font-sans">
      
      {/* Breadcrumbs for SEO and Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Phone a Friend</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-regular border border-rose-100 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Just Talk — Anonymous 1-on-1 Audio Calls
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Need Someone Just for a Talk? <br className="hidden sm:inline" />
            <span className="text-rose-600">Credit-Based Anonymous Calling</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Feeling stressed, lonely, bored, or just want to vent? Connect 1-on-1 with verified, empathetic listeners across India instantly using your call credits. 100% anonymous, zero judgment, and no video camera required.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-gray-600 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Anonymous (No Number Shared)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <Volume2 className="w-4 h-4 text-rose-500" />
              Audio Only (No Camera)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <MessageCircle className="w-4 h-4 text-indigo-600" />
              Hindi, English & Regional
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <Coins className="w-4 h-4 text-amber-600" />
              Credit-Based (490 Credits / 15m)
            </span>
          </div>
        </div>
      </section>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-2 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area: Wallet Card + Hosts List + Guidelines + FAQs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* User Call Credit Wallet Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/30 border border-amber-200 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-amber-200">
                    🪙
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                        Your Call Credits
                      </span>
                      {user && (
                        <span className="text-xs text-gray-500 font-medium">
                          ({user.email})
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-2">
                      <span>{(credits || 0).toLocaleString()}</span>
                      <span className="text-xs font-bold text-gray-500">Credits Available</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      {(credits || 0) >= 490 
                        ? `Ready to call! You have enough credits for ~${Math.floor((credits || 0) / 490)} session(s).`
                        : 'Recharge credits to connect instantly with available online hosts.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user ? (
                    <button
                      type="button"
                      onClick={() => setShowRechargeModal(true)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm shadow-amber-200"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Recharge Credits
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In to Use Credits
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Language & Topic Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-gray-400 font-medium whitespace-nowrap pl-1">Language:</span>
                {allLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors border ${
                      selectedLanguage === lang
                        ? 'bg-gray-900 text-white border-gray-900 font-semibold'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 font-normal'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="text-xs text-gray-500 font-semibold">
                <span className="text-rose-600 font-bold">{onlineHosts.length}</span> Hosts Online
              </div>
            </div>

            {/* Error banner if any */}
            {callError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center flex items-center justify-between gap-3">
                <span>{callError}</span>
                <button onClick={() => setCallError(null)} className="text-red-500 hover:text-red-700 font-bold text-sm">
                  ✕
                </button>
              </div>
            )}

            {/* Online Hosts Grid */}
            <div className="space-y-4">
              {onlineHosts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200/80 p-10 text-center space-y-4 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                    <PhoneOff className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">No hosts online right now</h3>
                    <p className="text-xs text-gray-500 font-normal max-w-sm mx-auto">
                      Our friendly hosts are currently in calls or taking a short break. Please check back in a few minutes!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {onlineHosts.map((item) => {
                    const host = item.host || {}
                    const rateInr = item.rate_per_session || 49
                    const rateCredits = Math.round(rateInr * 10)
                    const userHasCredits = (credits || 0) >= rateCredits

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm hover:border-rose-200 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div>
                          {/* Host Avatar & Details */}
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-inner">
                              {host.profile_image ? (
                                <Image
                                  src={host.profile_image}
                                  alt={host.display_name || 'Host'}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-black text-rose-500 bg-rose-50 text-base">
                                  {(host.display_name || 'H').substring(0, 2)}
                                </div>
                              )}
                              <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full ring-2 ring-emerald-500/20" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-bold text-gray-900 truncate">
                                  {host.display_name}
                                </h3>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  ONLINE
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-500 font-normal mt-0.5">
                                <span>{host.city || 'India'}</span>
                                <span>•</span>
                                <div className="flex items-center gap-0.5 text-amber-500 font-medium">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  <span className="text-gray-700">{item.rating_avg || '5.0'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-xs text-gray-600 font-normal line-clamp-2 leading-relaxed mb-3">
                            {item.bio || host.description || 'Warm, empathetic listener ready to talk about anything on your mind.'}
                          </p>

                          {/* Spoken Languages & Topics */}
                          <div className="flex flex-wrap gap-1">
                            {(item.languages || ['Hindi', 'English']).map((lang: string) => (
                              <span key={lang} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600">
                                {lang}
                              </span>
                            ))}
                            {(item.topics || ['Casual Chat']).slice(0, 2).map((t: string) => (
                              <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-100">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Price in Credits & Instant Call Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <div className="text-xs font-black text-gray-900 flex items-center gap-1">
                              <span className="text-amber-600 text-sm">🪙 {rateCredits}</span>
                              <span className="text-[11px] text-gray-400 font-medium">/ 15m</span>
                            </div>
                            <div className="text-[10px] text-gray-400">
                              (₹{rateInr} value)
                            </div>
                          </div>

                          {user ? (
                            userHasCredits ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveCallHost(item)
                                  setCheckoutDuration(15)
                                }}
                                className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-rose-200"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                Call Now
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setShowRechargeModal(true)
                                }}
                                className="px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm shadow-amber-200"
                              >
                                <Coins className="w-3.5 h-3.5" />
                                Top Up & Call
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={handleGoogleSignIn}
                              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              <LogIn className="w-3.5 h-3.5" />
                              Sign In to Call
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* About Phone a Friend */}
            <div className="bg-gradient-to-r from-rose-50/70 via-white to-amber-50/50 rounded-3xl p-6 sm:p-7 border border-rose-100/90 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/60 text-rose-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                About Phone a Friend
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                What is Stranger Mingle Phone a Friend?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                <strong>Stranger Mingle Phone a Friend</strong> is India&apos;s premier verified 1-on-1 voice calling platform providing safe, platonic, and confidential conversations. Whether you need a warm listener to vent about your workday, combat late-night loneliness, or get neutral life advice, connect instantly with empathetic hosts who listen with an open heart. All calls are audio-only, 100% anonymous, and backed by strict safety standards.
              </p>
            </div>

            {/* Caller Instructions & Safety Rules */}
            <section className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Caller Instructions, Safety Rules & Legal Disclaimer
                  </h2>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    Please read these mandatory guidelines carefully before starting any call on Stranger Mingle.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Anti-Harassment & Legal Warning */}
                <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-700">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Zero Harassment Policy
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-200/60 text-red-900">
                      Legal Warning
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-red-950">
                    Harassment Against Hosts Leads to Serious Legal Action
                  </h3>
                  <p className="text-[11px] text-red-900 leading-relaxed font-normal">
                    Any form of harassment, verbal abuse, obscenity, sexual remarks, threats, or intimidation toward hosts is strictly prohibited. Violators face immediate permanent banning, IP blacklisting, and referral to Indian Cyber Crime authorities for formal criminal proceedings under the IT Act.
                  </p>
                </div>

                {/* 2. Caller Etiquette */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Mutual Respect
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                      Etiquette
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-emerald-950">
                    Callers Must Be Polite, Courteous & Respectful
                  </h3>
                  <p className="text-[11px] text-emerald-900 leading-relaxed font-normal">
                    Hosts are empathetic peers offering a listening ear. Callers are required to be gentle, polite, and calm. Maintain a platonic, constructive atmosphere where both sides feel safe, heard, and respected throughout the session.
                  </p>
                </div>

                {/* 3. Protect Personal Privacy */}
                <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                      <Lock className="w-3.5 h-3.5" />
                      Confidentiality
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-200/60 text-indigo-900">
                      Strict Rule
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-indigo-950">
                    Do Not Reveal or Request Personal Information
                  </h3>
                  <p className="text-[11px] text-indigo-900 leading-relaxed font-normal">
                    Never exchange phone numbers, WhatsApp numbers, residential addresses, social media handles (Instagram, LinkedIn), or financial/UPI details during calls. Stranger Mingle guarantees anonymity—let&apos;s keep it protected and secure.
                  </p>
                </div>

                {/* 4. Platform Disclaimer */}
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      <Scale className="w-3.5 h-3.5" />
                      Platform Scope
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200/60 text-amber-900">
                      Disclaimer
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-amber-950">
                    No Responsibility for Off-Platform Arrangements
                  </h3>
                  <p className="text-[11px] text-amber-900 leading-relaxed font-normal">
                    Stranger Mingle solely facilitates on-platform, audio-only voice calls. Stranger Mingle will not be responsible or liable under any circumstances if a host and caller settle, negotiate, or arrange anything outside of platform calls (including personal in-person meetings, private deals, or money transfers).
                  </p>
                </div>

              </div>
            </section>

            {/* FAQs Section */}
            <section className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    Everything you need to know about anonymous 1-on-1 audio calling, credits, and community safety.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50/80 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                          {faq.q}
                        </span>
                        <span className="text-gray-400 shrink-0">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-rose-500" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-1 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-600 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

          </div>

          {/* Sidebar Area: Safety + Ads + Host Application */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Safety & Assurance Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Safety & Privacy First
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-gray-600 font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>100% Anonymous:</strong> Phone numbers and identities are strictly hidden.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Audio-Only Technology:</strong> No webcam, video feed, or physical cameras.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Verified Listeners:</strong> All hosts are vetted for empathy and conversational warmth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Credit-Based Simplicity:</strong> No per-call payment checkouts if you have credits.</span>
                </li>
              </ul>
            </div>

            {/* Sponsored Ad */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Featured Partner
              </div>
              <SponsoredAd />
            </div>

            {/* Become a Host Card */}
            <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-white/10 space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Host With Us
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold tracking-tight text-white">
                  Become a Phone a Friend Host
                </h3>
                <p className="text-xs text-rose-100/90 leading-relaxed font-normal">
                  Turn your active listening skills and empathy into income. Set your session price, go online whenever free, and receive calls from users across India.
                </p>
              </div>

              <Link
                href="/host-application"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-all shadow-md active:scale-95"
              >
                Apply as a Host <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Membership Ad */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Community Access
              </div>
              <MembershipAd />
            </div>

          </aside>
        </div>

        {/* Offline Weekend Meetups Section */}
        <section className="mt-16 pt-12 border-t border-gray-200 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
              <Users className="w-3.5 h-3.5" />
              Offline In-Person Connections
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Looking for Real-World Friendships?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              Step out into your city this weekend! Join curated, small-group stranger meetups, board game cafes, coffee mixers, and house parties across 20+ Indian cities.
            </p>
          </div>

          <WeekendEvents limit={4} />
        </section>

      </div>

      {/* Direct Credit Call Modal (Duration Selector) */}
      {activeCallHost && !ringingCall && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md border border-gray-200 p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setActiveCallHost(null)
                setCallError(null)
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pt-1">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto border border-gray-200 shadow-inner">
                {activeCallHost.host?.profile_image ? (
                  <Image
                    src={activeCallHost.host?.profile_image}
                    alt={activeCallHost.host?.display_name || 'Host'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-rose-500 bg-rose-50 text-xl">
                    {(activeCallHost.host?.display_name || 'H').substring(0, 2)}
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-gray-900">
                  Call with {activeCallHost.host?.display_name}
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Private 1-on-1 audio conversation • 100% Anonymous
                </p>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Select Call Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { mins: 15 },
                  { mins: 30 },
                  { mins: 45 },
                  { mins: 60 },
                ].map(({ mins }) => {
                  const baseRate = activeCallHost.rate_per_session || 49
                  const rateInr = Math.round((baseRate / 15) * mins)
                  const rateCredits = rateInr * 10
                  const isSelected = checkoutDuration === mins
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setCheckoutDuration(mins)}
                      className={`p-2 rounded-2xl text-center border transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{mins}m</div>
                      <div className="text-[10px] font-bold text-amber-700 mt-0.5">🪙 {rateCredits}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Credit Cost Summary */}
            {(() => {
              const baseRate = activeCallHost.rate_per_session || 49
              const calculatedRate = Math.round((baseRate / 15) * checkoutDuration)
              const creditsNeeded = calculatedRate * 10
              const userHasCredits = (credits || 0) >= creditsNeeded

              return (
                <div className="space-y-4">
                  <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-500 font-medium">Session Cost ({checkoutDuration}m):</span>
                      <div className="text-base font-black text-amber-700">
                        🪙 {creditsNeeded} Credits
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 font-medium">Your Balance:</span>
                      <div className="text-sm font-bold text-gray-900">
                        🪙 {credits || 0}
                      </div>
                    </div>
                  </div>

                  {userHasCredits ? (
                    <>
                      <button
                        type="button"
                        disabled={isInitiating}
                        onClick={() => handleStartCallWithCredits(activeCallHost, checkoutDuration)}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-98 text-white text-xs font-bold transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2"
                      >
                        {isInitiating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Phone className="w-4 h-4" />
                        )}
                        Redeem {creditsNeeded} Credits & Start Call
                      </button>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                        <Mic className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Microphone access will be verified before connecting</span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-amber-800 text-center font-medium bg-amber-100/50 p-2.5 rounded-xl border border-amber-200">
                        🪙 You need {creditsNeeded - (credits || 0)} more credits for this {checkoutDuration}-min call.
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCallHost(null)
                          setShowRechargeModal(true)
                        }}
                        className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-98 text-white text-xs font-bold transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Top Up Credits Now
                      </button>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Credit Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-md border border-gray-200 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowRechargeModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
                🪙
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recharge Call Credits</h3>
              <p className="text-xs text-gray-500 font-medium">
                1 INR = 10 Credits • 490 Credits per 15-minute call
              </p>
            </div>

            {rechargeSuccessMessage ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-gray-900">{rechargeSuccessMessage}</h4>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {CREDIT_PACKS.map((pack) => {
                    const isSelected = selectedPack.id === pack.id
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPack(pack)}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/30'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {pack.popular && (
                          <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                            Popular
                          </span>
                        )}
                        <div className="text-base font-black text-amber-700">
                          🪙 {pack.credits}
                        </div>
                        <div className="text-xs font-bold text-gray-900 mt-1">
                          ₹{pack.priceInr}
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                          {pack.label}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="bg-gray-50 rounded-2xl p-3.5 text-xs text-gray-600 space-y-1 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span>Current Wallet Balance:</span>
                    <span className="font-bold text-gray-900">🪙 {credits || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Balance After Recharge:</span>
                    <span className="font-bold text-emerald-600">
                      🪙 {(credits || 0) + selectedPack.credits}
                    </span>
                  </div>
                </div>

                {user ? (
                  <button
                    type="button"
                    disabled={isRecharging}
                    onClick={() => handlePurchaseCredits(selectedPack)}
                    className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-98 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2"
                  >
                    {isRecharging ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Coins className="w-4 h-4" />
                    )}
                    Pay ₹{selectedPack.priceInr} & Add {selectedPack.credits} Credits
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-98 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In with Google to Purchase
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ringing Screen Modal */}
      {ringingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-150 text-white">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-sm border border-zinc-800 p-8 space-y-5 text-center shadow-2xl">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
              <div className="relative w-full h-full rounded-full border-2 border-rose-500 flex items-center justify-center bg-zinc-800 shadow-xl shadow-rose-500/10">
                <Phone className="w-10 h-10 text-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
                Outgoing Call
              </span>
              <h3 className="text-xl font-bold text-white">
                Ringing Host...
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Ref: {ringingCall.call_ref}
              </p>
            </div>

            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              We have alerted the host on their mobile device. Please hold on while they answer...
            </p>

            <button
              onClick={async () => {
                stopOutgoingRing()
                const callToCancel = ringingCall
                setRingingCall(null)
                if (callToCancel?.id) {
                  await cancelCallSessionApi(callToCancel.id, callToCancel.user_id).catch(() => {})
                }
                if (checkMembershipStatus) {
                  checkMembershipStatus().catch(() => {})
                }
              }}
              className="w-full py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-bold text-zinc-300 transition-all border border-zinc-700"
            >
              Cancel Call
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
