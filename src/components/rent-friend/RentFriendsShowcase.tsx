'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  HeartHandshake,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Phone,
  Loader2,
  Users,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useGlobalCall } from '@/components/providers/GlobalCallProvider';

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

interface RentFriendsShowcaseProps {
  maxDisplay?: number;
  className?: string;
}

export default function RentFriendsShowcase({ maxDisplay = 3, className }: RentFriendsShowcaseProps) {
  const router = useRouter();
  const { user, isMember, isMemberVerified } = useAuth();
  const { initiateCall } = useGlobalCall();

  const [profiles, setProfiles] = useState<RentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async () => {
      if (!user) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/rent-a-friend/profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (isMounted) setLoading(false);
          return;
        }

        const data = await res.json();
        if (isMounted) {
          setProfiles(data.profiles || []);
          setLoading(false);
        }
      } catch (err) {
        console.warn('[RentFriendsShowcase] Failed to load rent profiles:', err);
        if (isMounted) setLoading(false);
      }
    };

    if (user && isMember && isMemberVerified) {
      fetchProfiles();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user, isMember, isMemberVerified]);

  const displayList = profiles.slice(0, maxDisplay);

  return (
    <div className={className || 'my-8'}>
      <div className="bg-gradient-to-br from-rose-950/90 via-slate-900 to-rose-950/90 rounded-3xl p-6 shadow-xl border border-rose-500/20 relative overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 text-lg shrink-0">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Rent a Companion
                </h3>
                <span className="text-[10px] text-rose-300 font-bold bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  100% Platonic
                </span>
              </div>
              <p className="text-[11px] text-rose-200/70 font-light mt-0.5">
                Find verified companions for coffee, movies, events, or exploring your city together.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/members/friends-on-rent"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white font-medium transition-all active:scale-95"
            >
              <span>Browse All ({profiles.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-300" />
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(maxDisplay)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse h-48 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="w-24 h-4 bg-white/10 rounded" />
                    <div className="w-16 h-3 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="w-full h-9 bg-white/10 rounded-xl" />
              </div>
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10 px-4">
            <Users className="w-8 h-8 text-rose-300/60 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-white">No companion profiles live yet</h4>
            <p className="text-xs text-gray-300 mt-1 max-w-sm mx-auto">
              Be the first verified companion in your city to earn ₹500–₹2,000/hr.
            </p>
            <div className="mt-4">
              <Link
                href="/rent-a-friend-registration"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition-all"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Become a Companion</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayList.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-4 transition-all hover:border-rose-400/40 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Header info */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-white font-mono">
                          {p.stranger_id}
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.2 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          {Number(p.rating_avg || 5.0).toFixed(1)}
                        </span>
                        <span className="text-[9px] font-bold text-rose-300 bg-rose-500/20 px-1.5 py-0.2 rounded-full uppercase">
                          3 Pics Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-light mt-0.5">
                        <span className="capitalize">{p.legal_gender} Friend</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-rose-300">
                          <MapPin className="w-2.5 h-2.5" />
                          {p.city}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">
                        ₹{p.hourly_rate}
                      </span>
                      <span className="text-[10px] text-gray-400 block font-light">/ hour</span>
                    </div>
                  </div>

                  {/* 3 MANDATORY PHOTOS DISPLAY GALLERY */}
                  <div className="grid grid-cols-3 gap-1.5 h-28 rounded-2xl overflow-hidden bg-black/20 p-1 border border-white/10">
                    {[0, 1, 2].map((slotIdx) => {
                      const photoUrl = p.profile_photos && p.profile_photos[slotIdx];
                      return (
                        <div
                          key={slotIdx}
                          className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center"
                        >
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={`${p.stranger_id} photo ${slotIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-gray-400 text-xs text-center">
                              <span className="text-base block">👤</span>
                              <span className="text-[8px] text-gray-400">Pic {slotIdx + 1}</span>
                            </div>
                          )}
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded-md bg-black/70 backdrop-blur-xs text-[8px] font-bold text-white">
                            {slotIdx + 1}/3
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Headline & Bio */}
                  <div>
                    {p.display_title && (
                      <h4 className="text-xs font-semibold text-rose-300 line-clamp-1 mb-0.5">
                        {p.display_title}
                      </h4>
                    )}
                    <p className="text-xs text-gray-300 font-light line-clamp-2 min-h-[32px] italic">
                      "{p.bio || 'Verified platonic companion ready to join you for friendly activities.'}"
                    </p>
                  </div>

                  {/* Serves */}
                  <div className="text-[10px] text-gray-400 font-medium">
                    Interested to meet:{' '}
                    <span className="text-gray-200">
                      {[p.serves_male && 'Boys', p.serves_female && 'Girls', p.serves_lgbtq && 'LGBTQ+']
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  {p.has_active_booking ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/members/chat"
                        className="py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => initiateCall(p.stranger_id)}
                        className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={`/members/friends-on-rent?hire=${encodeURIComponent(p.stranger_id)}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30 transition-all active:scale-95"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Hire Friend</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-white/10 text-center text-[10px] text-rose-200/70">
          Purely Platonic Friendship to Combat Loneliness &bull; Public Venues Only &bull; <strong>Stranger Mingle is strictly not liable if people meet in private places like home, hotel room, etc.</strong>
        </div>
      </div>
    </div>
  );
}

