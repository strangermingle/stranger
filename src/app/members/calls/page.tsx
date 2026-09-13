'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { 
    Phone, PhoneCall, Search, RefreshCw, ArrowLeft, 
    Coins, Star, CheckCircle, Loader2, X, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    fetchOnlineMembersApi, 
    toggleAvailabilityApi, 
    sendHeartbeatApi, 
    initiateMemberCallApi, 
    fetchMemberCallToken, 
    OnlineMember 
} from '@/lib/memberCallService';
import { createCreditsOrderApi, verifyCreditsOrderApi } from '@/lib/callService';
import MemberIncomingCallModal from '@/components/members/MemberIncomingCallModal';
import MemberCallRoom from '@/components/members/MemberCallRoom';

const CREDIT_PACKS = [
    { credits: 50, priceInr: 49, minutes: 5 },
    { credits: 100, priceInr: 99, minutes: 10, popular: true },
    { credits: 200, priceInr: 189, minutes: 20 },
    { credits: 500, priceInr: 449, minutes: 50 },
];

export default function CallToMembersPage() {
    const { user, mappedUserId, isMember, isMemberVerified, credits, loading: authLoading, checkMembershipStatus } = useAuth();
    const router = useRouter();

    const [isCallAvailable, setIsCallAvailable] = useState(false);
    const [isTogglingCallAvailable, setIsTogglingCallAvailable] = useState(false);
    const [onlineMembers, setOnlineMembers] = useState<OnlineMember[]>([]);
    const [isLoadingOnlineMembers, setIsLoadingOnlineMembers] = useState(false);
    const [memberSearchQuery, setMemberSearchQuery] = useState('');
    const [callingTargetId, setCallingTargetId] = useState<string | null>(null);
    const [activeMemberCall, setActiveMemberCall] = useState<any | null>(null);
    const [activeAgoraParams, setActiveAgoraParams] = useState<any | null>(null);

    // Credit Recharge Modal State
    const [showRechargeModal, setShowRechargeModal] = useState(false);
    const [rechargingPack, setRechargingPack] = useState<number | null>(null);
    const [rechargeSuccess, setRechargeSuccess] = useState<string | null>(null);

    const currentMemberId = mappedUserId || user?.uid || '';

    // Auth guard
    useEffect(() => {
        if (!authLoading && (!user || !isMember || !isMemberVerified)) {
            router.push('/members');
        }
    }, [user, isMember, isMemberVerified, authLoading, router]);

    // Fetch members and manage heartbeat
    useEffect(() => {
        if (!currentMemberId) return;

        const loadMembers = async () => {
            try {
                const res = await fetchOnlineMembersApi(currentMemberId);
                setOnlineMembers(res.members || []);
                if (res.selfStatus && typeof res.selfStatus.isCallAvailable === 'boolean') {
                    setIsCallAvailable(res.selfStatus.isCallAvailable);
                }
            } catch (err) {
                console.warn('[CallToMembers] Error loading members:', err);
            }
        };

        loadMembers();
        const pollInterval = setInterval(loadMembers, 15000); // 15s refresh

        let heartbeatInterval: any = null;
        if (isCallAvailable) {
            sendHeartbeatApi(currentMemberId);
            heartbeatInterval = setInterval(() => {
                sendHeartbeatApi(currentMemberId);
            }, 60000);
        }

        return () => {
            clearInterval(pollInterval);
            if (heartbeatInterval) clearInterval(heartbeatInterval);
        };
    }, [currentMemberId, isCallAvailable]);

    const handleToggleCallAvailability = async () => {
        if (!currentMemberId || isTogglingCallAvailable) return;
        setIsTogglingCallAvailable(true);
        const nextState = !isCallAvailable;
        try {
            const res = await toggleAvailabilityApi(currentMemberId, nextState);
            setIsCallAvailable(Boolean(res.isCallAvailable));
            const fresh = await fetchOnlineMembersApi(currentMemberId);
            setOnlineMembers(fresh.members || []);
        } catch (err: any) {
            alert(err.message || 'Failed to update availability.');
        } finally {
            setIsTogglingCallAvailable(false);
        }
    };

    const handleInitiateMemberCall = async (target: OnlineMember) => {
        if (!currentMemberId) return;

        if ((credits || 0) < 10) {
            setShowRechargeModal(true);
            return;
        }

        if (target.callStatus === 'in_call' || target.callStatus === 'ringing') {
            alert('This member is on another call. Please try again in a few moments.');
            return;
        }

        setCallingTargetId(target.id);
        try {
            const res = await initiateMemberCallApi({
                callerId: currentMemberId,
                receiverId: target.id,
            });

            if (res.call) {
                const tokenData = await fetchMemberCallToken(res.call.id, currentMemberId);
                setActiveAgoraParams(tokenData);
                setActiveMemberCall(res.call);
            }
        } catch (err: any) {
            alert(err.message || 'Unable to place call.');
        } finally {
            setCallingTargetId(null);
        }
    };

    const handleIncomingCallAccepted = async (call: any) => {
        if (!currentMemberId) return;
        try {
            const tokenData = await fetchMemberCallToken(call.id, currentMemberId);
            setActiveAgoraParams(tokenData);
            setActiveMemberCall(call);
        } catch (err: any) {
            alert(err.message || 'Failed to get voice credentials.');
        }
    };

    const handleCallClosed = async () => {
        setActiveMemberCall(null);
        setActiveAgoraParams(null);
        if (checkMembershipStatus) {
            await checkMembershipStatus();
        }
        if (currentMemberId) {
            const res = await fetchOnlineMembersApi(currentMemberId);
            setOnlineMembers(res.members || []);
            if (res.selfStatus && typeof res.selfStatus.isCallAvailable === 'boolean') {
                setIsCallAvailable(res.selfStatus.isCallAvailable);
            }
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBuyCreditPack = async (pack: { credits: number; priceInr: number }) => {
        try {
            setRechargingPack(pack.credits);
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) throw new Error('Payment gateway failed to load.');

            const orderData = await createCreditsOrderApi({
                amountInr: pack.priceInr,
                credits: pack.credits,
                userId: currentMemberId,
                email: user?.email || undefined,
                name: user?.displayName || undefined,
            });

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
                    color: '#10b981',
                },
                handler: async (response: any) => {
                    try {
                        await verifyCreditsOrderApi({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            userId: currentMemberId,
                            email: user?.email || undefined,
                            creditsToAdd: pack.credits,
                        });

                        if (checkMembershipStatus) {
                            await checkMembershipStatus();
                        }

                        setRechargeSuccess(`+${pack.credits} credits added to your wallet!`);
                        setTimeout(() => {
                            setRechargeSuccess(null);
                            setShowRechargeModal(false);
                        }, 1800);
                    } catch (verErr: any) {
                        alert(verErr.message || 'Payment verification failed.');
                    }
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert(err.message || 'Payment initiation failed.');
        } finally {
            setRechargingPack(null);
        }
    };

    const filteredOnlineMembers = onlineMembers.filter(m => 
        !memberSearchQuery.trim() || 
        m.anonymousAlias.toLowerCase().includes(memberSearchQuery.toLowerCase())
    );

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafbfc] text-gray-900 pt-20 sm:pt-24 pb-16 px-3 sm:px-6 font-sans">
            <div className="max-w-3xl mx-auto space-y-4">
                
                {/* TOP NAV & BACK BUTTON */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/members"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-white hover:bg-gray-50 text-gray-600 text-xs font-normal transition-all active:scale-95 shadow-none"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                    </Link>

                    {/* Quick Wallet Pill */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700 bg-white border border-gray-200/80 px-2.5 py-1 rounded-xl shadow-none flex items-center gap-1">
                            🪙 <span className="text-amber-600 font-semibold">{credits || 0}</span>
                            <span className="text-[11px] text-gray-400 font-light hidden sm:inline">credits</span>
                        </span>
                        <button
                            onClick={() => setShowRechargeModal(true)}
                            className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-normal transition-all"
                        >
                            + Recharge
                        </button>
                    </div>
                </div>

                {/* PAGE TITLE & AVAILABILITY CARD */}
                <div className="bg-white rounded-2xl border border-gray-200/70 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight">
                                Call to Members
                            </h1>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-light">
                                1-on-1 private calling
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 font-light mt-0.5">
                            Cost: 10 credits / minute • Receiving calls is free
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        <span className="text-xs text-gray-700 font-medium flex items-center gap-1.5">
                            {isCallAvailable && (
                                <img 
                                    src="/animated-icons/online.gif" 
                                    alt="Live" 
                                    className="w-4 h-4 object-contain rounded-full shrink-0" 
                                />
                            )}
                            <span>{isCallAvailable ? 'Online to talk' : 'Offline'}</span>
                        </span>
                        <button
                            onClick={handleToggleCallAvailability}
                            disabled={isTogglingCallAvailable}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                isCallAvailable ? 'bg-emerald-500' : 'bg-gray-200'
                            }`}
                            role="switch"
                            aria-checked={isCallAvailable}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    isCallAvailable ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* ACTIVE ONLINE STATUS BANNER */}
                {isCallAvailable ? (
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-emerald-800 text-xs shadow-none">
                        <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <div>
                                <p className="font-semibold text-emerald-900">You are currently ONLINE & ready to talk</p>
                                <p className="text-[11px] text-emerald-700 font-light mt-0.5">
                                    Verified members across India can discover you and call 1-on-1. Receiving calls is 100% free.
                                </p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-medium tracking-wide uppercase shrink-0 shadow-sm">
                            LIVE
                        </span>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200/70 p-3 flex items-center justify-between gap-3 text-gray-500 text-xs font-light">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                            <span>You are currently <strong className="font-medium text-gray-700">Offline</strong>. Toggle the switch ON above so other members can find and call you.</span>
                        </div>
                    </div>
                )}

                {/* SEARCH & REFRESH BAR */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={memberSearchQuery}
                            onChange={(e) => setMemberSearchQuery(e.target.value)}
                            placeholder="Search online members by name..."
                            className="w-full text-xs font-light pl-8 pr-3 py-2 rounded-xl border border-gray-200/80 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    <button
                        onClick={async () => {
                            setIsLoadingOnlineMembers(true);
                            try {
                                const res = await fetchOnlineMembersApi(currentMemberId);
                                setOnlineMembers(res.members || []);
                                if (res.selfStatus && typeof res.selfStatus.isCallAvailable === 'boolean') {
                                    setIsCallAvailable(res.selfStatus.isCallAvailable);
                                }
                            } finally {
                                setIsLoadingOnlineMembers(false);
                            }
                        }}
                        disabled={isLoadingOnlineMembers}
                        className="p-2 bg-white rounded-xl border border-gray-200/80 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shadow-none"
                        title="Refresh list"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoadingOnlineMembers ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* ONLINE MEMBERS LIST */}
                <div className="space-y-2.5">
                    {filteredOnlineMembers.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200/70 p-10 text-center text-xs text-gray-400 font-light">
                            <p className="mb-1 text-sm text-gray-600 font-normal">No members available right now</p>
                            <p className="text-xs text-gray-400 max-w-sm mx-auto">
                                Turn on your availability switch above so other members can discover and call you!
                            </p>
                        </div>
                    ) : (
                        filteredOnlineMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white p-3.5 rounded-2xl border border-gray-200/70 hover:border-gray-300 transition-all flex items-center justify-between gap-3 shadow-none hover:shadow-sm"
                            >
                                    {/* Left side: Avatar & info */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative shrink-0 w-12 h-12 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-base border border-gray-200 overflow-hidden shadow-inner">
                                            {member.avatarUrl ? (
                                                <img
                                                    src={member.avatarUrl}
                                                    alt={member.anonymousAlias}
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                    onError={(e) => {
                                                        (e.target as HTMLElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-gray-600 font-semibold text-sm">
                                                    {member.anonymousAlias ? member.anonymousAlias.charAt(0).toUpperCase() : '👤'}
                                                </span>
                                            )}
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                                    {member.anonymousAlias}
                                                </span>
                                                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                                                    <span>{member.ratingAvg || '5.0'}</span>
                                                    <span className="text-gray-400 font-normal">({member.ratingCount || 0} {member.ratingCount === 1 ? 'vote' : 'votes'})</span>
                                                </span>
                                            </div>

                                            {/* Demographics: Gender & Age (Thin, Sleek Pills) */}
                                            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-500 font-light">
                                                <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200/60">
                                                    {member.gender}
                                                </span>
                                                <span>•</span>
                                                <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200/60">
                                                    {member.age}
                                                </span>
                                            </div>

                                            {/* Member Bio Snippet */}
                                            {member.bio && (
                                                <p className="text-[11px] text-gray-500 font-light mt-1 line-clamp-2 italic pr-2">
                                                    "{member.bio}"
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                {/* Right side: Call button */}
                                <div className="shrink-0">
                                    {member.callStatus === 'in_call' ? (
                                        <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl cursor-not-allowed">
                                            In Call
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleInitiateMemberCall(member)}
                                            disabled={callingTargetId === member.id}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-normal shadow-sm shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {callingTargetId === member.id ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Phone className="w-3 h-3 fill-white" />
                                            )}
                                            <span>Call <span className="hidden sm:inline">• 10 🪙/min</span></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>

            {/* INCOMING CALL MODAL LISTENER */}
            <MemberIncomingCallModal
                currentUserId={currentMemberId}
                onCallAccepted={handleIncomingCallAccepted}
            />

            {/* ACTIVE CALL ROOM */}
            {activeMemberCall && activeAgoraParams && (
                <MemberCallRoom
                    call={activeMemberCall}
                    currentUserId={currentMemberId}
                    userCredits={credits || 0}
                    agoraParams={activeAgoraParams}
                    onCallClosed={handleCallClosed}
                />
            )}

            {/* RECHARGE CREDITS MODAL */}
            {showRechargeModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-5 shadow-2xl text-left animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 text-gray-900 text-sm font-medium">
                                <Coins className="w-4 h-4 text-amber-500" />
                                <span>Recharge Credits</span>
                            </div>
                            <button
                                onClick={() => setShowRechargeModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-400 font-light mb-4">
                            Cost is 10 credits per minute. Credits never expire.
                        </p>

                        {rechargeSuccess && (
                            <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-light text-center">
                                {rechargeSuccess}
                            </div>
                        )}

                        <div className="space-y-2 mb-4">
                            {CREDIT_PACKS.map((pack) => (
                                <button
                                    key={pack.credits}
                                    onClick={() => handleBuyCreditPack(pack)}
                                    disabled={rechargingPack !== null}
                                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-98 ${
                                        pack.popular
                                            ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50'
                                            : 'border-gray-200/80 bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-sm">
                                            🪙
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 flex items-center gap-1.5">
                                                <span>{pack.credits} Credits</span>
                                                {pack.popular && (
                                                    <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-light">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[11px] text-gray-400 font-light">
                                                ~{pack.minutes} minutes of calling
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-gray-900">
                                            ₹{pack.priceInr}
                                        </span>
                                        {rechargingPack === pack.credits ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                                        ) : (
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowRechargeModal(false)}
                            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-light hover:bg-gray-50 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
