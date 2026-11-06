'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useAuth } from '@/components/AuthProvider';
import {
  Users,
  Search,
  MapPin,
  Filter,
  Phone,
  MessageSquare,
  Sparkles,
  Loader2,
  Lock,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Star,
  ShieldAlert,
  Flag,
  X,
  MessageSquarePlus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalCall } from '@/components/providers/GlobalCallProvider';
import { sendGAEvent, trackBeginCheckout, trackPurchase } from '@/lib/gtag';
import { trackInitiateCheckout, trackPurchase as trackMetaPurchase } from '@/lib/metaPixel';

interface RentProfile {
  id: string;
  stranger_id: string;
  legal_gender: string;
  city: string;
  display_title: string | null;
  bio: string;
  interests: string[];
  languages: string[];
  profile_photos: string[];
  hourly_rate: number;
  serves_male: boolean;
  serves_female: boolean;
  serves_lgbtq: boolean;
  total_bookings_count: number;
  rating_avg: number;
  has_active_booking: boolean;
}

function FriendsOnRentContent() {
  const { user, isMember, isMemberVerified, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hireParam = searchParams.get('hire');
  const tabParam = searchParams.get('tab');
  const { initiateCall } = useGlobalCall();

  // Active view tab: Explore companions vs My bookings
  const [activeTab, setActiveTab] = useState<'explore' | 'bookings'>(
    tabParam === 'bookings' ? 'bookings' : 'explore'
  );
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingSuccessBanner, setBookingSuccessBanner] = useState<string | null>(null);
  const closedHireParamRef = useRef<string | null>(null);

  const [profiles, setProfiles] = useState<RentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Booking Modal State
  const [selectedProfileForHire, setSelectedProfileForHire] = useState<RentProfile | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('18:00');
  const [durationHours, setDurationHours] = useState(2);
  const [meetingLocation, setMeetingLocation] = useState('');
  const [activityNote, setActivityNote] = useState('');
  const [hiringLoading, setHiringLoading] = useState(false);

  // Reviews & Rating Modal State
  const [selectedProfileForReviews, setSelectedProfileForReviews] = useState<RentProfile | null>(null);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsBreakdown, setReviewsBreakdown] = useState<Record<number, number>>({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  // Write Review Modal State
  const [selectedProfileForWriteReview, setSelectedProfileForWriteReview] = useState<RentProfile | null>(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  // Safety Report Modal State
  const [selectedProfileForReport, setSelectedProfileForReport] = useState<RentProfile | null>(null);
  const [reportCategory, setReportCategory] = useState('inappropriate_behavior');
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);
  const [reportErrorMsg, setReportErrorMsg] = useState<string | null>(null);

  const openReviewsModal = async (profile: RentProfile) => {
    setSelectedProfileForReviews(profile);
    setReviewsLoading(true);
    try {
      const res = await fetch(`/api/rent-a-friend/reviews?rentProfileId=${profile.id}`);
      if (res.ok) {
        const data = await res.json();
        setReviewsList(data.reviews || []);
        if (data.breakdown) setReviewsBreakdown(data.breakdown);
      }
    } catch (err) {
      console.warn('Failed to fetch reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfileForWriteReview || !user) return;
    setReviewSubmitting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/rent-a-friend/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          rentProfileId: selectedProfileForWriteReview.id,
          rating: ratingScore,
          reviewText: reviewComment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review');

      setReviewSuccessMsg('Your review and rating have been posted! Thank you.');
      setTimeout(() => {
        setSelectedProfileForWriteReview(null);
        setReviewSuccessMsg(null);
        setReviewComment('');
        fetchProfiles();
      }, 1500);
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfileForReport || !user) return;
    if (reportReason.trim().length < 10) {
      setReportErrorMsg('Please provide at least 10 characters explaining your concern.');
      return;
    }
    setReportSubmitting(true);
    setReportErrorMsg(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/rent-a-friend/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          rentProfileId: selectedProfileForReport.id,
          strangerId: selectedProfileForReport.stranger_id,
          category: reportCategory,
          reason: reportReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit safety report');

      setReportSuccessMsg('Report received. Stranger Mingle Safety & Trust team will investigate within 24 hours.');
      setTimeout(() => {
        setSelectedProfileForReport(null);
        setReportSuccessMsg(null);
        setReportReason('');
      }, 2500);
    } catch (err: any) {
      setReportErrorMsg(err.message || 'Failed to submit safety report');
    } finally {
      setReportSubmitting(false);
    }
  };

  // Load Razorpay Script
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch approved profiles
  const fetchProfiles = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const params = new URLSearchParams();
      if (selectedGender !== 'all') params.append('gender', selectedGender);
      if (selectedCity !== 'all') params.append('city', selectedCity);

      const res = await fetch(`/api/rent-a-friend/profiles?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isMemberRequired) {
          setError('Rent a Friend is exclusively accessible to verified paid members.');
        } else {
          throw new Error(data.error || 'Failed to fetch profiles');
        }
        return;
      }

      setProfiles(data.profiles || []);
    } catch (err: any) {
      setError(err.message || 'Error loading profiles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's rented friend bookings
  const fetchMyBookings = async () => {
    if (!user) return;
    setBookingsLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/rent-a-friend/book/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMyBookings(data.bookings || []);
      }
    } catch (err) {
      console.warn('Failed to load my bookings:', err);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && isMember) {
      fetchProfiles();
      fetchMyBookings();
    } else if (!authLoading && (!user || !isMember)) {
      setLoading(false);
    }
  }, [user, isMember, authLoading, selectedGender, selectedCity]);

  // Sync tab with URL
  useEffect(() => {
    if (tabParam === 'bookings') {
      setActiveTab('bookings');
    } else if (tabParam === 'explore') {
      setActiveTab('explore');
    }
  }, [tabParam]);

  // If a ?hire=stranger_id query param is passed, auto-select that profile for hire
  useEffect(() => {
    if (hireParam && profiles.length > 0 && !selectedProfileForHire && closedHireParamRef.current !== hireParam) {
      const match = profiles.find(
        (p) => p.stranger_id === hireParam || p.id === hireParam
      );
      if (match) {
        setSelectedProfileForHire(match);
        const tmrw = new Date();
        tmrw.setDate(tmrw.getDate() + 1);
        setBookingDate(tmrw.toISOString().split('T')[0]);
      }
    }
  }, [hireParam, profiles, selectedProfileForHire]);

  // Cleanly close hire modal and remove ?hire=... from URL to prevent reopening
  const closeHireModal = () => {
    if (hireParam) {
      closedHireParamRef.current = hireParam;
      router.replace(activeTab === 'bookings' ? '/members/friends-on-rent?tab=bookings' : '/members/friends-on-rent', { scroll: false });
    }
    setSelectedProfileForHire(null);
  };

  // Handle Hired Booking Checkout
  const handleConfirmBookingAndPay = async () => {
    if (!user || !selectedProfileForHire) return;
    setHiringLoading(true);

    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/rent-a-friend/book/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: selectedProfileForHire.id,
          bookingDate,
          startTime: bookingTime,
          durationHours,
          meetingCity: selectedProfileForHire.city,
          meetingPublicLocation: meetingLocation,
          activityDescription: activityNote,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create booking order');

      const bookingPrice = (orderData.amount || 0) / 100;
      const bookingItem = {
        item_id: orderData.bookingId || orderData.strangerId,
        item_name: `Companion Booking: ${orderData.strangerId}`,
        item_category: 'Companion Booking Escrow',
        price: bookingPrice,
        quantity: 1,
      };

      // 1. Google Analytics / GTM: Begin Checkout Tracking
      trackBeginCheckout({
        items: [bookingItem],
        value: bookingPrice,
        currency: 'INR',
      });

      // 2. Meta Pixel: Initiate Checkout
      trackInitiateCheckout({
        content_ids: [orderData.bookingId || orderData.strangerId],
        content_name: `Companion Booking: ${orderData.strangerId}`,
        num_items: 1,
        value: bookingPrice,
        currency: 'INR',
      });

      sendGAEvent({
        action: 'begin_checkout',
        category: 'companion_booking',
        label: `Booking: ${orderData.strangerId}`,
        value: bookingPrice,
      });

      // Ensure Razorpay SDK is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || !(window as any).Razorpay) {
        throw new Error('Unable to load Razorpay payment SDK. Please try again.');
      }

      // Open Razorpay Escrow Payment
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Stranger Mingle',
        description: `Rent a Friend Booking with ${orderData.strangerId}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setHiringLoading(true);
            const token = await user.getIdToken();
            const verifyRes = await fetch('/api/rent-a-friend/book/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                bookingId: orderData.bookingId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            // 3. Fire Google Analytics / GTM: Purchase Event
            const transactionId = response.razorpay_payment_id || orderData.bookingRef || orderData.orderId;
            trackPurchase({
              transaction_id: transactionId,
              value: bookingPrice,
              currency: 'INR',
              items: [bookingItem],
            });

            // 4. Fire Meta Pixel Purchase Event
            trackMetaPurchase({
              order_id: transactionId,
              value: bookingPrice,
              currency: 'INR',
              content_ids: [orderData.bookingId || orderData.strangerId],
              content_name: `Companion Booking: ${orderData.strangerId}`,
              num_items: 1,
            }, { eventID: transactionId });

            // 5. Custom conversion event
            sendGAEvent({
              action: 'companion_booking_paid',
              category: 'ecommerce',
              label: `Companion: ${orderData.strangerId}`,
              value: bookingPrice,
              transaction_id: transactionId,
            });

            // Close modal, prevent hireParam reopen, and switch to bookings tab
            if (hireParam) {
              closedHireParamRef.current = hireParam;
            }
            setSelectedProfileForHire(null);
            setActiveTab('bookings');
            setBookingSuccessBanner(
              `Booking ${orderData.bookingRef} Confirmed! Escrow is securely held. You can now chat and call your friend anonymously before the meetup.`
            );
            router.replace('/members/friends-on-rent?tab=bookings', { scroll: false });

            // Refresh data
            await Promise.all([fetchMyBookings(), fetchProfiles()]);
          } catch (vErr: any) {
            console.error('[Booking Verify] Error:', vErr);
            alert(vErr.message || 'Payment received, but verification encountered an issue. Please contact support.');
          } finally {
            setHiringLoading(false);
          }
        },
        prefill: {
          name: user.displayName || 'Member',
          email: user.email || '',
          contact: '',
        },
        theme: {
          color: '#e11d48',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(err.message || 'Booking failed');
      setHiringLoading(false);
    }
  };

  // Auth gate check
  if (!authLoading && (!user || !isMember)) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 max-w-lg mx-auto text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Exclusive Paid Member Feature
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          The <b>Companions</b> platform is an exclusive, safe social meetup service reserved strictly for verified Stranger Mingle members.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/members?mode=apply"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-all"
          >
            <span>Activate Member Pass</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-20 sm:pt-24 pb-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP NAV & BACK BUTTON */}
        <div className="flex items-center justify-between">
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-white hover:bg-gray-50 text-gray-600 text-xs font-normal transition-all active:scale-95 shadow-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/rent-a-friend-registration"
            className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition-all shadow-none flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Become a Companion</span>
          </Link>
        </div>

        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Hire a Companion
              </h1>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                100% Platonic
              </span>
            </div>
            <p className="text-xs text-gray-500 font-light mt-0.5">
              Find verified companions for cafes, movies, events, or exploring your city together.
            </p>
          </div>
        </div>

        {/* PLATONIC FRIENDSHIP & PRIVATE PLACES DISCLAIMER BANNER */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            Purely Platonic Friendship to Combat Loneliness &bull; Public Venues Only
          </p>
          <p className="text-amber-900/90 text-[11px]">
            The companion service is strictly for platonic friendship to combat loneliness. <strong>Stranger Mingle is strictly not liable or responsible if people are meeting in private places like home, hotel room, etc.</strong> All companion meetups must happen strictly in open, public places (cafes, restaurants, malls, parks).
          </p>
        </div>

        {/* VIEW TABS: Explore Friends vs My Bookings */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab('explore');
              router.replace('/members/friends-on-rent', { scroll: false });
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'explore'
                ? 'text-rose-600 border-b-2 border-rose-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Explore Companions</span>
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
              {profiles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('bookings');
              router.replace('/members/friends-on-rent?tab=bookings', { scroll: false });
              fetchMyBookings();
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'text-rose-600 border-b-2 border-rose-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>My Bookings</span>
            {myBookings.length > 0 && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                {myBookings.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'explore' && (
          <>
        {/* FILTER BAR: GENDER & CITY */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'Girls', value: 'female' },
              { label: 'Boys', value: 'male' },
              { label: 'LGBTQ+', value: 'lgbtq' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedGender(selectedGender === tab.value && tab.value !== 'all' ? 'all' : tab.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                  selectedGender === tab.value
                    ? 'bg-rose-600 text-white font-bold shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="all">All Cities</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
        </div>

        {/* ERROR / WARNING */}
        {error && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            {error}
          </div>
        )}

        {/* PROFILES GRID */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-7 h-7 animate-spin text-rose-600" />
            <span className="text-xs">Finding verified companions near you...</span>
          </div>
        ) : profiles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
            <Users className="w-8 h-8 text-gray-300 mx-auto" />
            <h3 className="text-sm font-bold text-gray-800">No companions found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No verified companions match your filters in this city yet. Try switching to "All Cities" or "All Genders".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {profiles.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-gray-200/80 hover:border-gray-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* 3 MANDATORY PHOTOS GALLERY */}
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-1 h-44 bg-gray-100 p-1">
                      {[0, 1, 2].map((slotIdx) => {
                        const photoUrl = p.profile_photos && p.profile_photos[slotIdx];
                        return (
                          <div
                            key={slotIdx}
                            className="relative w-full h-full rounded-2xl overflow-hidden bg-rose-50/40 flex items-center justify-center"
                          >
                            {photoUrl ? (
                              <img
                                src={photoUrl}
                                alt={`${p.stranger_id} pic ${slotIdx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs text-center">
                                <span className="text-xl block">👤</span>
                                <span className="text-[9px] block">Pic {slotIdx + 1}</span>
                              </div>
                            )}
                            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded-md bg-black/60 text-[9px] font-bold text-white">
                              {slotIdx + 1}/3
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white font-mono text-[10px] font-bold z-10">
                      {p.stranger_id}
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 text-gray-900 font-bold text-xs shadow-xs z-10">
                      ₹{p.hourly_rate} / hr
                    </span>
                  </div>

                  {/* DETAILS (NO PERSONAL CONTACT / NO REAL NAME) */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900 capitalize">
                            {p.legal_gender} Friend
                          </span>
                          <button
                            type="button"
                            onClick={() => openReviewsModal(p)}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 text-[11px] font-bold transition-colors cursor-pointer"
                            title="Click to view reviews"
                          >
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{Number(p.rating_avg || 5.0).toFixed(1)}</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                          <div className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>{p.city}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProfileForReport(p);
                              setReportReason('');
                              setReportErrorMsg(null);
                              setReportSuccessMsg(null);
                            }}
                            className="text-gray-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors"
                            title="Report companion or safety violation"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {p.display_title && (
                        <p className="text-xs font-semibold text-rose-600 mt-1">{p.display_title}</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 font-normal line-clamp-3 leading-relaxed">
                      {p.bio}
                    </p>

                    <div className="text-[10px] text-gray-400 font-medium">
                      Interested to meet:{' '}
                      <span className="text-gray-700">
                        {[p.serves_male && 'Boys', p.serves_female && 'Girls', p.serves_lgbtq && 'LGBTQ+'].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION AREA */}
                <div className="p-4 pt-0 border-t border-gray-100/60 mt-2 space-y-2">
                  {/* Reviews & Rate Quick Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openReviewsModal(p)}
                      className="flex-1 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200/60 text-gray-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>Reviews</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProfileForWriteReview(p);
                        setRatingScore(5);
                        setReviewComment('');
                        setReviewSuccessMsg(null);
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <MessageSquarePlus className="w-3 h-3" />
                      <span>Rate Friend</span>
                    </button>
                  </div>

                  {p.has_active_booking ? (
                    /* DYNAMIC CHAT & CALL BUTTONS FOR CONFIRMED BOOKING */
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Active Booking Unlocked
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/members/chat"
                          className="py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => initiateCall(p.stranger_id)}
                          className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* HIRE FRIEND BUTTON */
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProfileForHire(p);
                        const tmrw = new Date();
                        tmrw.setDate(tmrw.getDate() + 1);
                        setBookingDate(tmrw.toISOString().split('T')[0]);
                      }}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-rose-600/20 active:scale-98"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>Hire Friend</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
          </>
        )}

        {/* MY BOOKINGS TAB VIEW */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Confirmation Banner */}
            {bookingSuccessBanner && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start justify-between gap-3 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">Booking Confirmed & Escrow Secured!</h4>
                    <p className="text-xs text-emerald-800 font-light mt-0.5">{bookingSuccessBanner}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingSuccessBanner(null)}
                  className="text-emerald-700 hover:text-emerald-950 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {bookingsLoading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-2 text-gray-400">
                <Loader2 className="w-7 h-7 animate-spin text-rose-600" />
                <span className="text-xs">Loading your bookings...</span>
              </div>
            ) : myBookings.length === 0 ? (
              <div className="py-16 px-4 text-center bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200/60 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                  🤝
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900">No Companion Bookings Yet</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    You haven&apos;t hired any companions yet. Explore available friends across India to hangout at cafes, movies, concerts, or city trips.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('explore');
                    router.replace('/members/friends-on-rent', { scroll: false });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-600/20 active:scale-95"
                >
                  <Users className="w-4 h-4" />
                  <span>Explore Available Friends</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
                  <span>Showing {myBookings.length} booking{myBookings.length > 1 ? 's' : ''}</span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                    🛡️ 100% Escrow Protected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myBookings.map((b) => {
                    const companion = b.companion || {};
                    const companionPhoto = (companion.photos && companion.photos.length > 0) ? companion.photos[0] : null;
                    return (
                      <div
                        key={b.id}
                        className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-4 hover:border-gray-300 transition-all"
                      >
                        {/* Header: Companion & Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-rose-50 border border-gray-200 shrink-0 relative flex items-center justify-center">
                              {companionPhoto ? (
                                <img
                                  src={companionPhoto}
                                  alt={companion.stranger_id || 'Companion'}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl">👤</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-gray-900">
                                  {companion.stranger_id || 'Companion'}
                                </h3>
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {b.booking_ref}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-light mt-0.5">
                                {companion.headline || companion.display_name || 'Verified Companion'} • {b.meeting_city}
                              </p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : b.status === 'completed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : b.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {b.status === 'confirmed' ? '✓ Confirmed' : b.status}
                          </span>
                        </div>

                        {/* Meetup Details Grid */}
                        <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span className="font-semibold">{b.booking_date}</span>
                            <span className="text-gray-400">•</span>
                            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>{b.start_time} ({b.duration_hours} hr{b.duration_hours > 1 ? 's' : ''})</span>
                          </div>
                          <div className="flex items-start gap-2 text-gray-700">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                            <span className="text-gray-600">{b.meeting_public_location}, {b.meeting_city}</span>
                          </div>
                          {b.activity_description && (
                            <div className="flex items-start gap-2 text-gray-600 text-[11px] pt-1 border-t border-gray-200/50">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span>Planned: {b.activity_description}</span>
                            </div>
                          )}
                        </div>

                        {/* Financial & Escrow Note */}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                          <div>
                            <span className="text-gray-400 text-[11px]">Total Escrow Paid: </span>
                            <span className="font-bold text-gray-900">₹{b.total_charged_to_renter}</span>
                          </div>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                            Escrow Held Securely
                          </span>
                        </div>

                        {/* Action Buttons: Chat, Call, Rate, Report */}
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <Link
                            href="/members/chat"
                            className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Chat</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => companion.stranger_id && initiateCall(companion.stranger_id)}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProfileForWriteReview(companion);
                              setRatingScore(5);
                              setReviewComment('');
                              setReviewSuccessMsg(null);
                            }}
                            className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                            title="Rate this companion"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>Rate</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProfileForReport(companion);
                              setReportReason('');
                              setReportSuccessMsg(null);
                              setReportErrorMsg(null);
                            }}
                            className="py-2 px-2.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Report safety concern"
                          >
                            <ShieldAlert className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HIRE BOOKING MODAL */}
        {selectedProfileForHire && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeHireModal();
            }}
          >
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Hire Friend ({selectedProfileForHire.stranger_id})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Rate: ₹{selectedProfileForHire.hourly_rate} / hour • City: {selectedProfileForHire.city}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeHireModal}
                  className="text-gray-400 hover:text-gray-700 p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 uppercase tracking-wider">Date of Meetup</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider">Start Time</label>
                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider">Duration (Hours)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={durationHours}
                      onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 uppercase tracking-wider">Public Venue Location</label>
                  <input
                    type="text"
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    placeholder="e.g. Starbucks, FC Road, Pune"
                    className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                  <span className="text-[10px] text-gray-400">Public venues only. Private residences are strictly prohibited.</span>
                </div>

                <div>
                  <label className="font-bold text-gray-700 uppercase tracking-wider">Planned Activity</label>
                  <input
                    type="text"
                    value={activityNote}
                    onChange={(e) => setActivityNote(e.target.value)}
                    placeholder="e.g. Cafe hangout, movie, walking around park"
                    className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                {/* 20% COMMISSION BREAKDOWN BREAKOUT */}
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Companionship ({durationHours} hrs × ₹{selectedProfileForHire.hourly_rate})</span>
                    <span>₹{selectedProfileForHire.hourly_rate * durationHours}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-[11px]">
                    <span>Stranger Mingle 20% Escrow Protection</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-1 flex justify-between font-bold text-gray-900 text-sm">
                    <span>Total Amount</span>
                    <span>₹{selectedProfileForHire.hourly_rate * durationHours}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeHireModal}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBookingAndPay}
                  disabled={!bookingDate || !meetingLocation || hiringLoading}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-600/20 disabled:opacity-50"
                >
                  {hiringLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  <span>Pay & Confirm Booking</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. REVIEWS & RATINGS MODAL */}
        {selectedProfileForReviews && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                      <span>{selectedProfileForReviews.stranger_id}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedProfileForReviews.city} • Verified Platonic Companion
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProfileForReviews(null)}
                  className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Rating Overview & Breakdown */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center shrink-0">
                <div className="text-center sm:text-left sm:border-r sm:border-amber-200/60 sm:pr-4">
                  <div className="text-4xl font-extrabold text-amber-900">
                    {Number(selectedProfileForReviews.rating_avg || 5.0).toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(selectedProfileForReviews.rating_avg || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-amber-800">
                    {reviewsList.length} total member reviews
                  </span>
                </div>

                {/* 5-Star Breakdown */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = reviewsBreakdown[stars] || 0;
                    const total = reviewsList.length || 1;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="w-5 text-[11px] font-semibold text-gray-700 flex items-center justify-end">
                          {stars}★
                        </span>
                        <div className="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-[10px] text-gray-400 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Member Feedback ({reviewsList.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProfileForWriteReview(selectedProfileForReviews);
                      setSelectedProfileForReviews(null);
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>Write a Review</span>
                  </button>
                </div>

                {reviewsLoading ? (
                  <div className="py-8 text-center text-gray-400 flex items-center justify-center gap-2 text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                    <span>Loading reviews...</span>
                  </div>
                ) : reviewsList.length === 0 ? (
                  <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-4">
                    <p className="text-xs text-gray-500 font-medium">No reviews written yet.</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Be the first verified member to rate {selectedProfileForReviews.stranger_id} after your meetup!
                    </p>
                  </div>
                ) : (
                  reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                            {rev.user_display_name ? rev.user_display_name[0].toUpperCase() : 'M'}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-900 block leading-tight">
                              {rev.user_display_name || 'Verified Member'}
                            </span>
                            {rev.is_verified_booking && (
                              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Verified Booking
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {rev.review_text && (
                        <p className="text-xs text-gray-700 leading-relaxed font-normal">
                          "{rev.review_text}"
                        </p>
                      )}

                      <div className="text-[10px] text-gray-400">
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }) : 'Recently'}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Close Button */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedProfileForReviews(null)}
                  className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. WRITE REVIEW MODAL */}
        {selectedProfileForWriteReview && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Rate Friend ({selectedProfileForWriteReview.stranger_id})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Share your companionship experience with the community.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProfileForWriteReview(null)}
                  className="text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reviewSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-800">{reviewSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Star Picker */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                      Your Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingScore(star)}
                          className="p-1.5 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer group"
                        >
                          <Star
                            className={`w-7 h-7 transition-transform group-hover:scale-110 ${
                              star <= ratingScore
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200 hover:text-amber-200'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm font-bold text-amber-700">
                        {ratingScore === 5 ? '5.0 (Excellent)' : `${ratingScore}.0`}
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Review & Experience
                    </label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share details about punctuality, engaging conversation, public venue comfort, and overall friendliness..."
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      Keep comments respectful and aligned with our strict platonic guidelines.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setSelectedProfileForWriteReview(null)}
                      className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-600/20 disabled:opacity-50"
                    >
                      {reviewSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4 fill-white" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 3. SAFETY REPORT MODAL */}
        {selectedProfileForReport && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-rose-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-rose-600">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Report Companion ({selectedProfileForReport.stranger_id})
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Confidential Trust & Safety Investigation
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProfileForReport(null)}
                  className="text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reportSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-800">{reportSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  {reportErrorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {reportErrorMsg}
                    </div>
                  )}

                  {/* Trust notice */}
                  <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 text-[11px] text-rose-900">
                    <span className="font-bold block">Strict Platonic Protection:</span>
                    Stranger Mingle has zero tolerance for solicitation, romance scams, off-platform cash extortion, or harassment. All reports are immediately reviewed by our Trust & Safety team.
                  </div>

                  {/* Violation Category */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Violation Category
                    </label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="platonic_breach">Platonic Contract Breach (Romance/Solicitation)</option>
                      <option value="inappropriate_behavior">Inappropriate or Disrespectful Behavior</option>
                      <option value="fake_profile">Fake Profile or Misleading Photos</option>
                      <option value="harassment">Harassment, Threats, or Safety Concerns</option>
                      <option value="no_show">No-Show or Extreme Tardiness</option>
                      <option value="extortion">Extortion or Cash/Off-Platform Payment Demands</option>
                      <option value="other">Other Safety Concern</option>
                    </select>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Details / Incident Description
                    </label>
                    <textarea
                      rows={3}
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      placeholder="Please provide specific details about the incident, conversation, or conduct..."
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400">Minimum 10 characters required.</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setSelectedProfileForReport(null)}
                      className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reportSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-600/20 disabled:opacity-50"
                    >
                      {reportSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Flag className="w-4 h-4" />
                          <span>Submit Report</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FriendsOnRentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafbfc] pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    }>
      <FriendsOnRentContent />
    </Suspense>
  );
}
