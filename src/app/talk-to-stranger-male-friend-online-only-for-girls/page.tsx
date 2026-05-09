import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Phone, UserCheck, Heart, Sparkles, ArrowRight, Lock, CheckCircle, Mic, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anonymous calling - Safe space to talk to strangers for girls',
  description: 'For the first time in India, women have a space that is truly their own. A place to speak freely, breathe deeply, and be heard — without fear, without filters.',
  keywords: [
    'safe online call for women india',
    'talk to stranger male safely',
    'anonymous call service for girls india',
    'online male friend for indian women',
    'safe chat platform for females india',
    'talk to random stranger without dating',
    'non judgmental conversation for women',
    'verified male strangers online india',
    'safe platform to talk to boys india',
    'online friend for lonely women india',
    'stranger call app india for girls',
    'safe space to talk for indian females'
  ],
  alternates: {
    canonical: '/safe-online-call-service-for-indian-women',
  },
  openGraph: {
    title: 'Anonymous calling - Safe space to talk to strangers for girls',
    description: 'India\'s first anonymous, non-judgmental online call service for women. Talk to verified male strangers safely — on your terms.',
    type: 'website',
  },
};

export default function ForWomenPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-white">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 bg-fuchsia-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-bold uppercase tracking-widest mb-8">
            <Shield className="w-4 h-4" />
            India&apos;s First Safe women only call sessions
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
            Talk to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-600">Verified Stranger Male</span> Online — Safely & Without Judgement.
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium mb-6">
            No advice. No opinions. No strings. Just a real, unfiltered conversation with a verified man — whenever you need it. Built exclusively for Indian women.
          </p>

          <p className="max-w-xl mx-auto text-base text-gray-500 mb-12">
            Whether you want to vent, laugh, kill time, or simply hear a different voice — this is your space. Completely anonymous. Completely safe. Completely yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/members"
              className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 active:scale-95 flex items-center gap-2 group"
            >
              Book Your First Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative -ml-2 first:ml-0">
                    <Image
                      src={`https://i.pravatar.cc/100?u=woman${i + 20}`}
                      alt="Member"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-500">Women Already Talking</span>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-400 font-medium uppercase tracking-widest">
            Starting at ₹99 per session · Cancel anytime · 100% Anonymous
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 lg:gap-16">
          {[
            { icon: <UserCheck className="w-5 h-5 text-rose-400" />, label: 'ID-Verified Males Only' },
            { icon: <Lock className="w-5 h-5 text-rose-400" />, label: 'Fully Anonymous for You' },
            { icon: <CheckCircle className="w-5 h-5 text-rose-400" />, label: 'No Fake Profiles' },
            { icon: <Heart className="w-5 h-5 text-rose-400" />, label: 'Non-Judgmental Sessions' },
            { icon: <Mic className="w-5 h-5 text-rose-400" />, label: 'Voice Calls — Not Text' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Why This Exists</span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
          Sometimes You Just Want to Talk to a Man — Without It Being a Whole Thing.
        </h2>
        <p className="text-gray-600 text-xl leading-relaxed font-medium mb-6">
          Every Indian woman knows this feeling. You want to have a real conversation with someone from the opposite gender — not a relative, not a colleague, not a guy from a dating app who has his own agenda. Just someone to talk to.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          The problem? There&apos;s no safe place to do that. Until now. Stranger Mingle&apos;s dedicated women&apos;s call service fills that gap — with verified men, zero pressure, and complete anonymity on your side.
        </p>
      </section>

      {/* How It&apos;s Different Section */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Not a Dating App. Not a Therapy Line. Something New.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We built this specifically because nothing like it existed for Indian women. Here is exactly what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-6 h-6" />,
                title: 'Voice Calls, Not Chat',
                desc: 'Text can be misread. A real voice carries tone, warmth, and honesty. Our sessions are live voice calls so the conversation feels genuine — not typed.',
                color: 'bg-rose-600',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Your Identity Stays Hidden',
                desc: 'The man you speak to never sees your name, number, or photo unless you choose to share it. Your anonymity is protected at the platform level — not just by a setting.',
                color: 'bg-fuchsia-600',
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: 'He Listens. He Does Not Advise.',
                desc: 'Every verified male on our platform is briefed to listen, respond naturally, and not offer unsolicited advice or judgement. This is conversation — not counselling.',
                color: 'bg-pink-600',
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                title: 'Verified, Background-Checked Males',
                desc: 'Every man on this platform has submitted government ID, passed a behavioural screening, and agreed to our strict code of conduct. We take this seriously.',
                color: 'bg-rose-500',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Available on Your Schedule',
                desc: 'Book a session at 11 PM after a long day or during your lunch break. Our platform is designed around your time, not ours.',
                color: 'bg-fuchsia-500',
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: 'Rate and Block — No Questions Asked',
                desc: 'After every session you can rate your experience and block a caller permanently. Our team reviews every low rating within 24 hours.',
                color: 'bg-pink-500',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl order-last lg:order-first">
            <Image
              src="https://res.cloudinary.com/strangermingle/image/upload/v1774261273/full-shot-friends-with-fireworks_tijjpi.jpg"
              alt="Indian women relaxing and talking"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-8 bottom-8 p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl">
              <p className="text-white font-bold text-lg mb-2 italic">
                &quot;Mujhe kisi se baat karni thi jo mujhe personally jaanta na ho. Stranger Mingle mein pehli baar aisa feel hua ki koi sach mein sun raha hai — bina judge kiye.&quot;
              </p>
              <p className="text-white/80 text-sm font-black uppercase tracking-widest">— Priya, 29, Delhi NCR</p>
            </div>
          </div>

          <div>
            <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Who Should Use This</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
              Which Indian Woman Is This Safe Call Service Actually For?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Working Women Who Feel Isolated',
                  desc: 'You are surrounded by colleagues all day but genuinely lonely in the evenings. You want conversation without office politics or WhatsApp drama.',
                },
                {
                  title: 'Women Navigating Big Life Decisions',
                  desc: 'Career shifts, relationship confusion, family pressure — sometimes you need to think out loud with someone who has zero stakes in your choices.',
                },
                {
                  title: 'Homemakers Who Crave Adult Conversation',
                  desc: 'Your world is the home. You are not looking for validation or advice — you just want to speak your mind to another adult without worry.',
                },
                {
                  title: 'Students Away from Home',
                  desc: 'New city, new hostel, few friends. A non-romantic conversation with a verified stranger can feel grounding when everything else is uncertain.',
                },
                {
                  title: 'Women Recovering from Difficult Relationships',
                  desc: 'You are not ready to date. But talking to a decent man — safely, anonymously — can gently restore your trust in people at your own pace.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Simple by Design</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              How to Start Your First Safe Online Call Session in Minutes
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              No long sign-up forms. No complicated settings. Just a few steps between you and a real conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create an Anonymous Profile',
                desc: 'Use a nickname. Your real name, number, and photo are never required — or shared.',
                icon: <Lock className="w-6 h-6" />,
              },
              {
                step: '02',
                title: 'Choose Your Session Type',
                desc: 'Pick from open conversation, topic-led sessions (career, life, humour), or interest-matched calls.',
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                step: '03',
                title: 'Get Matched to a Verified Male',
                desc: 'Our system connects you with a background-checked, trained listener based on your preferences and availability.',
                icon: <UserCheck className="w-6 h-6" />,
              },
              {
                step: '04',
                title: 'Talk. Rate. Done.',
                desc: 'Your call happens through our encrypted in-app system. After the session, rate your experience. No follow-ups unless you want them.',
                icon: <Phone className="w-6 h-6" />,
              },
            ].map((item) => (
              <div key={item.step} className="p-8 rounded-[2rem] bg-white border border-rose-100 shadow-sm relative group hover:shadow-md transition-all">
                <div className="text-6xl font-black text-rose-100 absolute top-4 right-6 group-hover:text-rose-200 transition-colors">{item.step}</div>
                <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-rose-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Safety First, Always</span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
            How We Keep Indian Women Safe on Our Platform — Every Single Session
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Safety is not a feature we added. It is the entire foundation this service was built on.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Government ID Verification for All Males',
              desc: 'Every man on the platform has submitted Aadhaar or PAN for identity verification. No verified ID, no access — no exceptions.',
            },
            {
              title: 'Encrypted Voice Calls — Your Number is Never Exposed',
              desc: 'Calls happen inside our app on masked, encrypted lines. The other person never sees your mobile number or location.',
            },
            {
              title: '24/7 Moderation and Reporting',
              desc: 'A dedicated safety team monitors the platform around the clock. Any report is acknowledged within 30 minutes and resolved within 24 hours.',
            },
            {
              title: 'One-Tap Block and Report',
              desc: 'If a session feels wrong at any point, one tap ends the call, blocks the user permanently, and files an automatic report for review.',
            },
            {
              title: 'Strict Code of Conduct for Male Listeners',
              desc: 'Every verified male undergoes a briefing on respectful communication before their first session. Repeat complaints result in permanent removal.',
            },
            {
              title: 'No Recording, No Data Selling',
              desc: 'Your conversations are never recorded, stored, or used for any commercial purpose. We do not sell your data to third parties — ever.',
            },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-rose-200 transition-all">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-5">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Real Women. Real Conversations. Real Relief.
            </h2>
            <p className="text-gray-400 text-lg">What Indian women across the country are saying.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'I have a husband, a family, a job — and no one I can actually talk to without filtering myself. This service gave me that space. I cried after my first session. In a good way.',
                name: 'Ananya R.',
                city: 'Bengaluru',
                age: 34,
              },
              {
                quote: 'Main pehle bahut nervous thi. But the guy I spoke to was just... normal. No flirting, no agenda. We spoke about books for 40 minutes. It felt like talking to a friend I never had.',
                name: 'Zoya M.',
                city: 'Hyderabad',
                age: 26,
              },
              {
                quote: 'I was sceptical — safe online calls for women in India sounded too good to be true. Three months later I book a session almost every weekend. Worth every rupee.',
                name: 'Kavitha S.',
                city: 'Chennai',
                age: 41,
              },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                <div className="flex mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-rose-400 fill-rose-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic leading-relaxed mb-6 font-medium">&quot;{t.quote}&quot;</p>
                <div>
                  <p className="font-black text-white">{t.name}, {t.age}</p>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Transparent Pricing</span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
          How Much Does a Safe Online Call Session Cost for Women in India?
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-16">
          We have kept pricing straightforward. Pay per session or get a monthly plan at a better rate.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              plan: 'Single Session',
              price: '₹49',
              duration: 'per 30-min call',
              features: ['1 voice call session', 'Verified male listener', 'Fully anonymous', 'Rate & block access'],
              cta: 'Book Now',
              highlight: false,
            },
            {
              plan: 'Monthly Plan',
              price: '₹199',
              duration: 'per month · 5 sessions',
              features: ['5 voice call sessions', 'Priority matching', 'Choose your listener type', 'Full anonymity', '24/7 safety support'],
              cta: 'Start Monthly',
              highlight: true,
            },
            {
              plan: 'Flexi Pack',
              price: '₹499',
              duration: '10 sessions · no expiry',
              features: ['10 voice call sessions', 'Sessions never expire', 'All listener categories', 'Priority queue', 'Dedicated support'],
              cta: 'Get Flexi Pack',
              highlight: false,
            },
          ].map((p, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2rem] border ${p.highlight
                ? 'bg-rose-600 border-rose-500 text-white shadow-2xl shadow-rose-200 scale-105'
                : 'bg-white border-gray-200 text-gray-900'
                } transition-all`}
            >
              {p.highlight && (
                <div className="text-xs font-black uppercase tracking-widest text-rose-100 mb-4">Most Popular</div>
              )}
              <div className="text-sm font-black uppercase tracking-widest mb-2 opacity-70">{p.plan}</div>
              <div className={`text-5xl font-black mb-1 ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.price}</div>
              <div className={`text-sm font-medium mb-8 ${p.highlight ? 'text-rose-200' : 'text-gray-500'}`}>{p.duration}</div>
              <ul className="space-y-3 mb-10">
                {p.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-3 text-sm font-medium ${p.highlight ? 'text-rose-50' : 'text-gray-600'}`}>
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${p.highlight ? 'text-rose-200' : 'text-rose-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/members"
                className={`block w-full py-4 rounded-xl font-black text-center uppercase tracking-wider transition-all active:scale-95 ${p.highlight
                  ? 'bg-white text-rose-600 hover:bg-rose-50'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-400">All plans include full anonymity protection · UPI, Cards & Netbanking accepted · Cancel anytime</p>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-black uppercase tracking-widest text-sm mb-4 block">Common Questions</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Questions Indian Women Ask Before Their First Call Session
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Will the man know who I am or be able to find me?',
                a: 'No. Your name, phone number, location, and photo are never shared with anyone on the platform. You speak through our encrypted in-app call system. You are completely anonymous unless you choose otherwise.',
              },
              {
                q: 'Is this a dating app in disguise?',
                a: 'Absolutely not. There is no profile matching, no swipes, no romantic intent built into the product. This is a conversation service. Men on the platform are explicitly told this is a non-romantic, non-advisory space.',
              },
              {
                q: 'What if a man says something inappropriate?',
                a: 'End the call with one tap. Block the user permanently. An automatic report is filed. Our moderation team reviews it within 24 hours and the user risks permanent removal. We have zero tolerance for misconduct.',
              },
              {
                q: 'Who are the men on this platform? Are they paid?',
                a: 'The verified males are volunteers and community members who have applied, submitted ID, passed screening, and been briefed on our conduct standards. They are not therapists or counsellors — they are real people who want to have genuine conversations.',
              },
              {
                q: 'Can I use this service from a small town or city in India?',
                a: 'Yes. The service is entirely online via voice call. As long as you have a smartphone and internet connection, you can use it from anywhere in India — regardless of city size.',
              },
              {
                q: 'I am much older. Is this service only for young women?',
                a: 'Not at all. This service is for Indian women of every age — 18 to 70 and beyond. We have users across all age groups. You can specify your preference for a listener of a similar age group when booking.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-12 uppercase tracking-tighter italic">Growing Every Week Across India</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: '8,000+', label: 'Women Using the Service' },
            { stat: '500+', label: 'Verified Male Listeners' },
            { stat: '12 States', label: 'Across India' },
            { stat: '98%', label: 'Sessions Rated Safe or Better' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-black text-rose-600 mb-2">{s.stat}</div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-rose-600 to-fuchsia-700 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-rose-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight">
              You Deserve a Space to <span className="text-rose-200 italic">Just Talk.</span>
            </h2>
            <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto mb-4">
              India&apos;s first safe, anonymous, non-judgmental online call service — built for you, by women who understood the need.
            </p>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-12">
              Your first session is ₹99. No commitment. No strings. Just a real conversation on your terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/members"
                className="px-12 py-5 bg-white text-rose-600 rounded-2xl font-black text-xl hover:bg-rose-50 transition-all shadow-xl active:scale-95 uppercase tracking-wider"
              >
                Book My First Call — ₹99
              </Link>
              <Link
                href="/about"
                className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-xl hover:bg-white/20 transition-all active:scale-95 uppercase tracking-wider"
              >
                Learn More
              </Link>
            </div>
            <p className="mt-8 text-white/40 text-xs font-medium uppercase tracking-[0.3em]">
              100% Anonymous · Encrypted Calls · Cancel Anytime · Made in India
            </p>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="py-12 border-t border-gray-100 text-center">
        <Link
          href="/"
          className="text-gray-400 hover:text-rose-600 font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
        >
          ← Back to Stranger Mingle Home
        </Link>
      </section>
    </div>
  );
}