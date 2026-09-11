'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { fetchOnlineMembersApi, OnlineMember } from '@/lib/memberCallService';
import { 
  Phone, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Lock, 
  Sparkles, 
  ArrowRight,
  User,
  Radio,
  Loader2,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface OnlineMembersShowcaseProps {
  maxDisplay?: number;
  className?: string;
}

export default function OnlineMembersShowcase({ maxDisplay = 6, className }: OnlineMembersShowcaseProps) {
  const router = useRouter();
  const { user, isMember, isMemberVerified } = useAuth();
  const [members, setMembers] = useState<OnlineMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOnlineMembers = async () => {
      try {
        // Fetch real members from backend
        const list = await fetchOnlineMembersApi();
        if (isMounted) {
          setMembers(list);
          setLoading(false);
        }
      } catch (err) {
        console.warn('[OnlineMembersShowcase] Failed to fetch online members:', err);
        if (isMounted) setLoading(false);
      }
    };

    loadOnlineMembers();
    const interval = setInterval(loadOnlineMembers, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleMemberCallClick = () => {
    if (user && isMember && isMemberVerified) {
      router.push('/members/calls');
    } else {
      router.push('/members/login');
    }
  };

  const displayMembers = members.filter(m => m.callStatus !== 'offline').slice(0, maxDisplay);

  return (
    <section className={className || "my-12 px-4 max-w-6xl mx-auto"}>
      {/* Header & Value Proposition */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
              <img 
                src="/animated-icons/online.gif" 
                alt="Live" 
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-full shrink-0" 
              />
              <span>Real Verified Members Available</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-indigo-200">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Exclusive for Verified Members</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Connect Anonymously with Members Across India
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed mb-8">
            Verified members talk 1-on-1 without revealing their real phone number or identity. 
            Enjoy anonymous calling, secret member chat, local meetup groups, and genuine conversations.
          </p>

          {/* Key Membership Perks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
              <img 
                src="/animated-icons/masks.gif" 
                alt="Anonymous Masks" 
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2 rounded-lg" 
              />
              <div className="text-xs sm:text-sm font-semibold text-white">No Phone Number</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Call safely with complete privacy</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400 mb-2 p-1 bg-sky-400/10 rounded-lg" />
              <div className="text-xs sm:text-sm font-semibold text-white">Anonymous Chat</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Private messaging with strangers</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
              <img 
                src="/animated-icons/meetups.gif" 
                alt="City Groups" 
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2 rounded-lg" 
              />
              <div className="text-xs sm:text-sm font-semibold text-white">Local City Groups</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Bangalore, Mumbai, Delhi & more</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mb-2 p-1 bg-amber-400/10 rounded-lg" />
              <div className="text-xs sm:text-sm font-semibold text-white">Verified Badge</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Filtered, genuine community</div>
            </div>
          </div>

          {/* Real Members Listing (Without Profile Images) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <img 
                  src="/animated-icons/online.gif" 
                  alt="Online" 
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full shrink-0" 
                />
                <span>Active Online Members</span>
              </h3>
              <span className="text-xs text-gray-400 font-light">
                {displayMembers.length} available right now
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(maxDisplay)].map((_, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse h-40 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-white/10" />
                      <div className="space-y-2 flex-1">
                        <div className="w-24 h-4 bg-white/10 rounded" />
                        <div className="w-16 h-3 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="w-full h-8 bg-white/10 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : displayMembers.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">All members are currently in calls or resting.</p>
                <p className="text-xs text-gray-500 mt-1">Join the community to get notified when members go online!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-4 transition-all hover:border-indigo-400/50 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Mystery Anonymous Avatar (NO profile image displayed) */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-11 h-11 rounded-full bg-indigo-900/60 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                          <User className="w-5 h-5 text-indigo-200" />
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-sm font-medium text-white truncate group-hover:text-indigo-200 transition-colors">
                              {member.anonymousAlias}
                            </span>
                            <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-[10px] font-medium text-amber-300">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span>{member.ratingAvg || '5.0'}</span>
                              <span className="text-gray-300 font-light">({member.ratingCount || 0} {member.ratingCount === 1 ? 'vote' : 'votes'})</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-light mt-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-white/10">{member.gender}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10">{member.age}</span>
                          </div>
                        </div>
                      </div>

                      {/* Member Bio Snippet */}
                      <p className="text-xs text-gray-300 font-light line-clamp-2 italic mb-4 min-h-[32px]">
                        "{member.bio || 'Active verified member ready to talk and share experiences.'}"
                      </p>
                    </div>

                    {/* Action Button - Gimmick Redirect to Members Login */}
                    <button
                      onClick={handleMemberCallClick}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-medium flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white" />
                      <span>Call Anonymously</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Conversion CTA */}
          <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-2xl p-5 sm:p-6 border border-indigo-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Want to call members without sharing your phone number?</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                Unlock instant anonymous calling, private chat, and city meetups with Stranger Mingle Membership.
              </p>
            </div>

            <Link
              href="/members/login"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 shrink-0"
            >
              <span>Join Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
