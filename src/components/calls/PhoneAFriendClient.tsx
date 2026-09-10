'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
  MessageCircle,
  AlertTriangle,
  Scale,
  HeartHandshake,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Users,
  Info,
  Shield,
  FileText,
  Download
} from 'lucide-react'
import { createClientClient } from '@/lib/supabaseClient'
import { initiateCallSession, fetchHostCallingDetails, createCallPaymentOrderApi } from '@/lib/callService'
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
    a: 'You can either choose an active online host and click "Call Now" for an instant 1-on-1 audio conversation or switch to "Book a Slot" to schedule a convenient 15-minute time window. Payments are securely completed upfront via Razorpay, and voice calls are streamed privately with zero personal contact exchange.'
  },
  {
    q: 'What are the charges and session duration?',
    a: 'Calls are charged per 15-minute session at rates set by individual hosts, typically ranging from ₹49 to ₹199 per session. Each session provides 15 minutes of uninterrupted conversation with transparent upfront pricing and no recurring subscriptions.'
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
    a: 'If a host is busy or declines your instant call, the ringing stops immediately and you are notified without being connected to an empty room. You can choose another online host or schedule an upcoming slot.'
  },
  {
    q: 'How can I apply to become a Phone a Friend host?',
    a: 'If you are an empathetic, articulate communicator who enjoys active listening, you can apply through Stranger Mingle\'s Host Partner portal. Approved hosts set their own rates, manage their availability slots, and earn per completed session.'
  }
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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function PhoneAFriendClient({ initialHosts, faqs = DEFAULT_FAQS }: PhoneAFriendClientProps) {
  const router = useRouter()
  const { user, mappedUserId } = useAuth()
  const [hosts, setHosts] = useState(initialHosts)
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [activeTab, setActiveTab] = useState<'online' | 'slots'>('online')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

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

  // Caller contact info & duration state for checkout
  const [checkoutDuration, setCheckoutDuration] = useState<number>(15)
  const [callerName, setCallerName] = useState<string>('')
  const [callerEmail, setCallerEmail] = useState<string>('')
  const [callerPhone, setCallerPhone] = useState<string>('')
  const [contactError, setContactError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.displayName && !callerName) setCallerName(user.displayName)
    if (user?.email && !callerEmail) setCallerEmail(user.email)
    if ((user as any)?.phone && !callerPhone) setCallerPhone((user as any).phone)
  }, [user])

  // Pay via Razorpay and initiate call session
  const payAndInitiateCall = async ({
    hostId,
    hostName,
    callType,
    slotId = null,
    amount,
    durationMinutes = 15,
    name,
    email,
    phone,
    onSuccess,
  }: {
    hostId: string
    hostName: string
    callType: 'instant' | 'scheduled'
    slotId?: string | null
    amount: number
    durationMinutes?: number
    name?: string
    email?: string
    phone?: string
    onSuccess: (res: any) => void
  }) => {
    const isLoaded = await loadRazorpayScript()
    if (!isLoaded) {
      throw new Error('Could not load payment gateway. Please check your internet connection.')
    }

    const callerUid = getCallerUid()
    const dfp = getDeviceFingerprint()

    // 1. Create Razorpay order on backend
    const orderData = await createCallPaymentOrderApi({
      userId: callerUid,
      hostId,
      callType,
      slotId,
      amount,
      durationMinutes,
      callerName: name,
      callerEmail: email,
      callerPhone: phone,
      deviceFingerprint: dfp,
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
            ? `1-on-1 Audio Call with ${hostName} (${durationMinutes}m)`
            : `Scheduled Call Slot with ${hostName}`,
        order_id: orderData.orderId,
        prefill: {
          name: name || user?.displayName || '',
          email: email || user?.email || '',
          contact: phone || (user as any)?.phone || '',
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
              durationMinutes,
              callerName: name,
              callerEmail: email,
              callerPhone: phone,
              deviceFingerprint: dfp,
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

  // Active Instant Call host target
  const [activeCallHost, setActiveCallHost] = useState<any | null>(null)
  const [isInitiating, setIsInitiating] = useState(false)
  const [callError, setCallError] = useState<string | null>(null)

  // Ringing Call object (stores call record when host is being rung)
  const [ringingCall, setRingingCall] = useState<any | null>(null)

  // Booking slots modal state
  const [slotHostDetails, setSlotHostDetails] = useState<any | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null)
  const [isBookingSlot, setIsBookingSlot] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

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

  // Audio elements for outgoing ring tone
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

    if (!callerName.trim() || callerName.trim().length < 2) {
      setContactError('Please enter your full name.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!callerEmail.trim() || !emailRegex.test(callerEmail.trim())) {
      setContactError('Please provide a valid email address.')
      return
    }
    const cleanedPhone = callerPhone.replace(/\D/g, '')
    if (!cleanedPhone || cleanedPhone.length < 10) {
      setContactError('Please enter a valid 10-digit mobile number.')
      return
    }
    setContactError(null)

    const baseRate = activeCallHost.rate_per_session || 49
    const calculatedRate = Math.round((baseRate / 15) * checkoutDuration)

    setIsInitiating(true)
    setCallError(null)

    try {
      await payAndInitiateCall({
        hostId: activeCallHost.host_id,
        hostName: activeCallHost.host?.display_name || 'Host',
        callType: 'instant',
        durationMinutes: checkoutDuration,
        name: callerName.trim(),
        email: callerEmail.trim(),
        phone: cleanedPhone,
        amount: calculatedRate,
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
      
      {/* Breadcrumbs for SEO and Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Phone a Friend</span>
        </nav>
      </div>

      {/* Hero Section — Optimized for SEO, AEO & GEO */}
      <section className="bg-white border-b border-gray-100 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-regular border border-rose-100 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Just Talk — Phone a Friend Online
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Need Someone Just for a Talk? <br className="hidden sm:inline" />
            <span className="text-rose-600">1-on-1 Anonymous Voice Calls</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Feeling stressed, lonely, bored, or just want to share your thoughts? Talk 1-on-1 with verified, empathetic listeners across India over private, secure audio calls. 100% anonymous, zero judgment, and no video camera required.
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
              <Clock className="w-4 h-4 text-amber-600" />
              15-Min Focused Sessions
            </span>
          </div>
        </div>
      </section>

      {/* Main Layout Container: Main Content (8 cols) + Sidebar with Ads (4 cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-2 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area: Hosts List + Guidelines + FAQs */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Navigation Tabs (Talk Now vs Book a Slot) */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setActiveTab('online')}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                    activeTab === 'online'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === 'online' ? 'bg-white' : 'bg-emerald-500'} animate-pulse`} />
                  Talk Now ({onlineHosts.length} Online)
                </button>
                <button
                  onClick={() => setActiveTab('slots')}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                    activeTab === 'slots'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book a Slot
                </button>
              </div>

              {/* Language Filters */}
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
            </div>

            {/* Tab 1: Talk Now (Online Hosts) */}
            {activeTab === 'online' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-normal px-1">
                  <span>Online hosts available for instant 1-on-1 audio call</span>
                  <span>Transparent rates • Paid via Razorpay</span>
                </div>

                {onlineHosts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center space-y-3 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                      <PhoneOff className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-gray-900">No hosts online right this second</h3>
                      <p className="text-xs text-gray-500 font-normal max-w-sm mx-auto">
                        Our hosts are currently in calls or taking a short break. Please switch to &quot;Book a Slot&quot; to pick an upcoming time.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('slots')}
                      className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      View Upcoming Slots
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {onlineHosts.map((item) => {
                      const host = item.host || {}
                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-xs hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
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
                                <div className="w-full h-full flex items-center justify-center font-bold text-rose-600 bg-rose-50 text-sm">
                                  {(host.display_name || 'H').substring(0, 2)}
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-rose-600 transition-colors">
                                  {host.display_name}
                                </h3>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" title="Online" />
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                                <span>{host.city || 'India'}</span>
                                <span>•</span>
                                <div className="flex items-center gap-0.5 text-amber-500 font-medium">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="text-gray-700">{item.rating_avg || '5.0'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-xs text-gray-600 font-normal line-clamp-2 leading-relaxed">
                            {item.bio || host.description || 'Warm, empathetic listener ready to talk about anything on your mind.'}
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
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="text-xs text-gray-500 font-normal">
                              <span className="text-sm font-bold text-gray-900">₹{item.rate_per_session || 49}</span>
                              <span className="text-[11px]"> / {item.session_duration_minutes || 15}m</span>
                            </div>

                            <button
                              onClick={() => setActiveCallHost(item)}
                              className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm shadow-rose-200"
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
                  Select an empathetic host to view their available 15-minute call slots
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredHosts.map((item) => {
                    const host = item.host || {}
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between space-y-3"
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
                              <div className="w-full h-full flex items-center justify-center font-bold text-gray-600 bg-gray-100 text-sm">
                                {(host.display_name || 'H').substring(0, 2)}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-gray-900 truncate">
                              {host.display_name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                              <span>{host.city || 'India'}</span>
                              <span>•</span>
                              <div className="flex items-center gap-0.5 text-amber-500 font-medium">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-gray-700">{item.rating_avg || '5.0'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 font-normal line-clamp-2 leading-relaxed">
                          {item.bio || host.description || 'Friendly, non-judgmental listener ready to talk with you.'}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {(item.languages || ['Hindi', 'English']).map((lang: string) => (
                            <span key={lang} className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                              {lang}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 font-normal">
                            <span className="text-sm font-bold text-gray-900">₹{item.rate_per_session || 49}</span>
                            <span className="text-[11px]"> / {item.session_duration_minutes || 15}m</span>
                          </div>

                          <button
                            onClick={() => handleOpenSlots(item)}
                            className="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-800 text-xs font-semibold transition-all flex items-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" />
                            Pick a Time
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* What is Stranger Mingle Phone a Friend? (Moved below host section) */}
            <div className="bg-linear-to-r from-rose-50/70 via-white to-amber-50/50 rounded-3xl p-6 sm:p-7 border border-rose-100/90 shadow-xs space-y-3">
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

            {/* Clear Instruction Set & Legal Disclaimer Section */}
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
                    Please read these mandatory guidelines carefully before starting or booking any call on Stranger Mingle.
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
                    Any form of harassment, verbal abuse, obscenity, sexual remarks, threats, or intimidation toward hosts is strictly prohibited. Violators face immediate permanent banning, IP blacklisting, and referral to Indian Cyber Crime authorities and law enforcement for formal criminal proceedings under the IT Act and applicable penal laws.
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
                    Hosts are empathetic peers offering a listening ear. Callers are required to be gentle, polite, and calm. Maintain a platonic, constructive atmosphere where both sides feel safe, heard, and respected throughout the 15-minute conversation.
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

            {/* Comprehensive FAQs Section */}
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
                    Everything you need to know about anonymous 1-on-1 audio calling, pricing, and community safety.
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

          {/* Sidebar Area: Ad Cards + Trust + Host Onboarding */}
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
                  <span><strong>Secure Checkout:</strong> Instant payment validation via Razorpay UPI & Cards.</span>
                </li>
              </ul>
            </div>

            {/* Sponsored Ad Card in Sidebar */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Featured Partner
              </div>
              <SponsoredAd />
            </div>

            {/* Become a Host Card */}
            <div className="bg-linear-to-br from-rose-900 via-rose-800 to-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-white/10 space-y-4">
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
                  Turn your active listening skills and empathy into income. Set your own session price (₹49 - ₹199 per 15 mins), open your available slots, and talk to people across India.
                </p>
              </div>

              <Link
                href="/host-application"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-all shadow-md active:scale-95"
              >
                Apply as a Host <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Stranger Mingle Club / Membership Ad Card */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Community Access
              </div>
              <MembershipAd />
            </div>

          </aside>
        </div>

        {/* Upcoming Weekend Meetups Section */}
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

      {/* Instant Call Modal */}
      {activeCallHost && !ringingCall && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md border border-gray-200 p-6 space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setActiveCallHost(null)
                setContactError(null)
                setCallError(null)
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pt-1">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border border-gray-200">
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

            {/* Duration Selector (15m @ ₹49, 30m @ ₹98, 45m @ ₹147, 60m @ ₹196) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">
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
                  const rate = Math.round((baseRate / 15) * mins)
                  const isSelected = checkoutDuration === mins
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setCheckoutDuration(mins)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/70 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{mins}m</div>
                      <div className="text-[11px] font-semibold text-gray-900 mt-0.5">₹{rate}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Caller Contact Information */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700">
                  Your Details (For Ticket & Membership)
                </label>
                <span className="text-[10px] text-emerald-600 font-medium">Free 1-Mo Club Pass</span>
              </div>

              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={callerName}
                    onChange={(e) => {
                      setCallerName(e.target.value)
                      if (contactError) setContactError(null)
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address (Ticket sent here)"
                    value={callerEmail}
                    onChange={(e) => {
                      setCallerEmail(e.target.value)
                      if (contactError) setContactError(null)
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number"
                    maxLength={10}
                    value={callerPhone}
                    onChange={(e) => {
                      setCallerPhone(e.target.value.replace(/\D/g, ''))
                      if (contactError) setContactError(null)
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

            {contactError && (
              <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium text-center border border-red-100">
                {contactError}
              </div>
            )}

            {callError && (
              <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-normal text-center border border-red-100">
                {callError}
              </div>
            )}

            <div className="bg-gray-50/80 rounded-xl p-3 space-y-1.5 text-xs text-gray-600 border border-gray-100">
              <div className="flex justify-between items-center">
                <span>Total Charges ({checkoutDuration} mins):</span>
                <span className="font-bold text-gray-900 text-sm">
                  ₹{Math.round(((activeCallHost.rate_per_session || 49) / 15) * checkoutDuration)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Ticket PDF emailed directly + 1-Month Free Club Pass</span>
              </div>
            </div>

            <button
              onClick={handleStartInstantCall}
              disabled={isInitiating}
              className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-98 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm shadow-rose-200"
            >
              {isInitiating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Phone className="w-3.5 h-3.5" />
              )}
              Pay ₹{Math.round(((activeCallHost.rate_per_session || 49) / 15) * checkoutDuration)} & Start Call
            </button>
          </div>
        </div>
      )}

      {/* Ringing Screen Modal */}
      {ringingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-150 text-white">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-sm border border-zinc-800 p-8 space-y-5 text-center shadow-2xl">
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

            <div className="space-y-1.5">
              <div className="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-medium animate-pulse">
                Calling...
              </div>
              <h3 className="text-lg font-bold text-white">
                {activeCallHost?.host?.display_name}
              </h3>
              <p className="text-xs text-zinc-400 font-normal">
                Please wait while the host picks up your call...
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-medium">
                📧 Ticket and confirmation sent to {callerEmail || 'your email'}.
              </div>
              <div>
                <a
                  href={`${BACKEND_URL}/api/calls/ticket/${ringingCall.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-rose-400 hover:text-rose-300 hover:underline pt-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download Call Ticket PDF
                </a>
              </div>
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
                  <div className="w-full h-full flex items-center justify-center font-bold text-gray-600 bg-gray-100 text-xs">
                    {(slotHostDetails.host?.display_name || 'H').substring(0, 2)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {slotHostDetails.host?.display_name}
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Select a convenient 15-minute slot
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
                      <div className="font-bold text-gray-900">
                        {isBooked ? <span className="text-gray-400">Booked</span> : `₹${s.price}`}
                      </div>
                    </div>
                  )
                })}

                {selectedSlot && (
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-gray-700 block">
                          Your Details (For Ticket & Membership)
                        </label>
                        <span className="text-[10px] text-emerald-600 font-medium">Free 1-Mo Club Pass</span>
                      </div>

                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={callerName}
                        onChange={(e) => {
                          setCallerName(e.target.value)
                          if (contactError) setContactError(null)
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                      />
                      <input
                        type="email"
                        placeholder="Email Address (Ticket sent here)"
                        value={callerEmail}
                        onChange={(e) => {
                          setCallerEmail(e.target.value)
                          if (contactError) setContactError(null)
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                      />
                      <input
                        type="tel"
                        placeholder="10-digit Mobile Number"
                        maxLength={10}
                        value={callerPhone}
                        onChange={(e) => {
                          setCallerPhone(e.target.value.replace(/\D/g, ''))
                          if (contactError) setContactError(null)
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50/50"
                      />
                    </div>

                    {contactError && (
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium text-center border border-red-100">
                        {contactError}
                      </div>
                    )}

                    <div className="text-[11px] text-emerald-700 flex items-center gap-1.5 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Ticket emailed automatically + 1-Month Free Club Pass</span>
                    </div>

                    <button
                      disabled={isBookingSlot}
                      onClick={async () => {
                        if (!callerName.trim() || callerName.trim().length < 2) {
                          setContactError('Please enter your full name.')
                          return
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (!callerEmail.trim() || !emailRegex.test(callerEmail.trim())) {
                          setContactError('Please provide a valid email address.')
                          return
                        }
                        const cleanedPhone = callerPhone.replace(/\D/g, '')
                        if (!cleanedPhone || cleanedPhone.length < 10) {
                          setContactError('Please enter a valid 10-digit mobile number.')
                          return
                        }
                        setContactError(null)

                        setIsBookingSlot(true)
                        try {
                          await payAndInitiateCall({
                            hostId: slotHostDetails.host_id,
                            hostName: slotHostDetails.host?.display_name || 'Host',
                            callType: 'scheduled',
                            slotId: selectedSlot.id,
                            durationMinutes: 15,
                            name: callerName.trim(),
                            email: callerEmail.trim(),
                            phone: cleanedPhone,
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
                      className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-98 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      {isBookingSlot ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Pay & Confirm Slot (₹{selectedSlot.price || 49})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
