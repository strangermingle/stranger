'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const CITIES = ['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Delhi', 'Other'];

const EVENT_FORMATS = [
  'Chai Circles & Social Meetups',
  'Board Game Nights',
  'Treks & Outdoor Walks',
  'Heritage & Cultural Walks',
  'Food & Culture Outings',
  'Volunteering Events',
  'Talk to Me / Emotional Connection Sessions',
  'Workshop & Skill-Sharing Sessions',
];

const AVAILABILITY = [
  'Weekday mornings',
  'Weekday evenings',
  'Weekend mornings',
  'Weekend afternoons',
  'Weekend evenings',
  'Flexible',
];

type FormData = {
  fullName: string;
  age: string;
  city: string;
  cityOther: string;
  phone: string;
  email: string;
  occupation: string;
  memberSince: string;
  eventsAttended: string;
  whyHost: string;
  eventFormats: string[];
  availability: string[];
  hasPriorExperience: string;
  priorExperienceDetail: string;
  safetyUnderstanding: string;
  agreeToTerms: boolean;
  agreeToSafety: boolean;
  agreeToZeroHarassment: boolean;
};

const EMPTY_FORM: FormData = {
  fullName: '',
  age: '',
  city: '',
  cityOther: '',
  phone: '',
  email: '',
  occupation: '',
  memberSince: '',
  eventsAttended: '',
  whyHost: '',
  eventFormats: [],
  availability: [],
  hasPriorExperience: '',
  priorExperienceDetail: '',
  safetyUnderstanding: '',
  agreeToTerms: false,
  agreeToSafety: false,
  agreeToZeroHarassment: false,
};

export default function HostApplicationFormPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const set = (field: keyof FormData, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleArray = (field: 'eventFormats' | 'availability', value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.age.trim()) newErrors.age = 'Age is required.';
    else if (parseInt(form.age) < 21) newErrors.age = 'You must be at least 21 years old to apply as a host.';
    if (!form.city) newErrors.city = 'Please select your city.';
    if (form.city === 'Other' && !form.cityOther.trim()) newErrors.cityOther = 'Please specify your city.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.email.trim()) newErrors.email = 'Email address is required.';
    if (!form.memberSince.trim()) newErrors.memberSince = 'Please tell us when you joined.';
    if (!form.eventsAttended.trim()) newErrors.eventsAttended = 'Please tell us how many events you have attended.';
    if (!form.whyHost.trim()) newErrors.whyHost = 'This field is required.';
    if (form.eventFormats.length === 0) newErrors.eventFormats = 'Please select at least one event format.';
    if (form.availability.length === 0) newErrors.availability = 'Please select at least one availability window.';
    if (!form.hasPriorExperience) newErrors.hasPriorExperience = 'Please answer this question.';
    if (!form.safetyUnderstanding.trim()) newErrors.safetyUnderstanding = 'This field is required.';
    if (!form.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the Terms of Service.';
    if (!form.agreeToSafety) newErrors.agreeToSafety = 'You must agree to the Safety Guidelines.';
    if (!form.agreeToZeroHarassment) newErrors.agreeToZeroHarassment = 'You must confirm your understanding of the zero-harassment policy.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const city = form.city === 'Other' ? form.cityOther : form.city;

    try {
      const { error } = await supabase.from('host_applications').insert([
        {
          full_name: form.fullName,
          age: parseInt(form.age),
          city: city,
          phone: form.phone,
          email: form.email,
          occupation: form.occupation,
          member_since: form.memberSince,
          events_attended: form.eventsAttended,
          why_host: form.whyHost,
          event_formats: form.eventFormats,
          availability: form.availability,
          has_prior_experience: form.hasPriorExperience,
          prior_experience_detail: form.priorExperienceDetail,
          safety_understanding: form.safetyUnderstanding,
          agree_to_terms: form.agreeToTerms,
          agree_to_safety: form.agreeToSafety,
          agree_to_zero_harassment: form.agreeToZeroHarassment,
        },
      ]);

      if (error) throw error;

      // Optional: Still provide mailto link as a confirmation/redundancy if desired
      // const body = [ ... ]
      // const mailtoLink = `mailto:...`;
      // window.location.href = mailtoLink;

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Error submitting application:', err);
      const message = err instanceof Error ? err.message : 'Something went wrong while submitting your application. Please try again or email us directly.';
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Your host application has been sent to the Stranger Mingle team. We read every
            application personally and will respond within 5–7 working days.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            If you do not hear from us within 7 working days, please check your spam folder
            or follow up at{' '}
            <a
              href="mailto:strangermingleteam@gmail.com"
              className="text-blue-600 hover:underline"
            >
              strangermingleteam@gmail.com
            </a>
            .
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Host Application
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Apply to Become a Verified Host
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">
            Fill in every section honestly and completely. We read every application personally.
            Incomplete or vague applications will not proceed to the next stage.
          </p>
          <div className="bg-white/10 rounded-xl p-5 text-sm text-gray-300 leading-relaxed">
            <p className="font-semibold text-white mb-2">Before you apply — confirm you meet these requirements:</p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">→</span> You are at least 21 years old</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">→</span> You are a verified Stranger Mingle member</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">→</span> You have attended at least one Stranger Mingle event</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">→</span> You understand and fully accept our zero-harassment policy</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">→</span> You can commit to hosting events at public venues only — no private residences</li>
            </ul>
            <p className="mt-3 text-gray-400 text-xs">
              Not yet a verified host? Read the full requirements on our{' '}
              <Link href="/host-an-event" className="text-blue-400 hover:text-white underline">
                Host an Event page
              </Link>{' '}
              first.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-12">

            {/* Section 1 — Personal Details */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
              </div>
              <div className="space-y-5">

                <div data-error={!!errors.fullName}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    placeholder="As on your government ID"
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                  />
                  {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-error={!!errors.age}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => set('age', e.target.value)}
                      min={21}
                      max={80}
                      placeholder="Must be 21 or above"
                      className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                    />
                    {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                  </div>

                  <div data-error={!!errors.city}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => set('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.city ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                    >
                      <option value="">Select your city</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>

                {form.city === 'Other' && (
                  <div data-error={!!errors.cityOther}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Specify Your City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.cityOther}
                      onChange={(e) => set('cityOther', e.target.value)}
                      placeholder="Your city name"
                      className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.cityOther ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                    />
                    {errors.cityOther && <p className="text-red-600 text-xs mt-1">{errors.cityOther}</p>}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-error={!!errors.phone}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div data-error={!!errors.email}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Occupation <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={(e) => set('occupation', e.target.value)}
                    placeholder="e.g. Software Engineer, Teacher, Freelancer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
                  />
                </div>

              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Section 2 — Member History */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                <h2 className="text-xl font-bold text-gray-900">Your Stranger Mingle History</h2>
              </div>
              <div className="space-y-5">

                <div data-error={!!errors.memberSince}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    When did you join Stranger Mingle as a member? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.memberSince}
                    onChange={(e) => set('memberSince', e.target.value)}
                    placeholder="e.g. January 2025, about 6 months ago"
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.memberSince ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                  />
                  {errors.memberSince && <p className="text-red-600 text-xs mt-1">{errors.memberSince}</p>}
                </div>

                <div data-error={!!errors.eventsAttended}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    How many Stranger Mingle events have you attended? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.eventsAttended}
                    onChange={(e) => set('eventsAttended', e.target.value)}
                    placeholder="e.g. 4 events — two chai circles, one trek, one board game night"
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.eventsAttended ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                  />
                  {errors.eventsAttended && <p className="text-red-600 text-xs mt-1">{errors.eventsAttended}</p>}
                </div>

              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Section 3 — Why You Want to Host */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                <h2 className="text-xl font-bold text-gray-900">Your Application</h2>
              </div>
              <div className="space-y-5">

                <div data-error={!!errors.whyHost}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Why do you want to become a Stranger Mingle host? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-2">
                    Be honest and specific. Tell us what draws you to hosting — not what you think we want to hear. There are no right answers here, only genuine ones.
                  </p>
                  <textarea
                    value={form.whyHost}
                    onChange={(e) => set('whyHost', e.target.value)}
                    rows={5}
                    placeholder="Write in your own words..."
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition ${errors.whyHost ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                  />
                  {errors.whyHost && <p className="text-red-600 text-xs mt-1">{errors.whyHost}</p>}
                </div>

                <div data-error={!!errors.eventFormats}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Which event formats would you like to host? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-3">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EVENT_FORMATS.map((format) => (
                      <label
                        key={format}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          form.eventFormats.includes(format)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.eventFormats.includes(format)}
                          onChange={() => toggleArray('eventFormats', format)}
                          className="accent-blue-600 w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                  {errors.eventFormats && <p className="text-red-600 text-xs mt-2">{errors.eventFormats}</p>}
                </div>

                <div data-error={!!errors.availability}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    When are you generally available to host? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-3">Select all that apply.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVAILABILITY.map((slot) => (
                      <label
                        key={slot}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          form.availability.includes(slot)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.availability.includes(slot)}
                          onChange={() => toggleArray('availability', slot)}
                          className="accent-blue-600 w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{slot}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availability && <p className="text-red-600 text-xs mt-2">{errors.availability}</p>}
                </div>

                <div data-error={!!errors.hasPriorExperience}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Do you have prior experience organising or facilitating group events? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    {['Yes', 'No'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg border cursor-pointer transition ${
                          form.hasPriorExperience === opt
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasPriorExperience"
                          value={opt}
                          checked={form.hasPriorExperience === opt}
                          onChange={() => set('hasPriorExperience', opt)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700 font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hasPriorExperience && <p className="text-red-600 text-xs mt-1">{errors.hasPriorExperience}</p>}
                </div>

                {form.hasPriorExperience === 'Yes' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Briefly describe your prior experience
                    </label>
                    <textarea
                      value={form.priorExperienceDetail}
                      onChange={(e) => set('priorExperienceDetail', e.target.value)}
                      rows={3}
                      placeholder="What kind of events, how many people, what was your role..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white transition"
                    />
                  </div>
                )}

                <div data-error={!!errors.safetyUnderstanding}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    In your own words — what does Stranger Mingle&apos;s zero-harassment policy mean to you as a host? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-2">
                    This is not a test with a correct answer. We want to understand how you think about safety and your responsibility as a host.
                  </p>
                  <textarea
                    value={form.safetyUnderstanding}
                    onChange={(e) => set('safetyUnderstanding', e.target.value)}
                    rows={4}
                    placeholder="Write in your own words..."
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition ${errors.safetyUnderstanding ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
                  />
                  {errors.safetyUnderstanding && <p className="text-red-600 text-xs mt-1">{errors.safetyUnderstanding}</p>}
                </div>

              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Section 4 — Declarations */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
                <h2 className="text-xl font-bold text-gray-900">Declarations</h2>
              </div>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                All three declarations below are mandatory. Applications without all three
                confirmed will not be processed.
              </p>
              <div className="space-y-4">

                <label
                  data-error={!!errors.agreeToTerms}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                    form.agreeToTerms ? 'border-blue-400 bg-blue-50' : errors.agreeToTerms ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={(e) => set('agreeToTerms', e.target.checked)}
                    className="accent-blue-600 w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I have read and agree to the Stranger Mingle{' '}
                    <Link href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">
                      Terms of Service
                    </Link>
                    . I understand that hosting is a responsibility, not a privilege, and that
                    my host access can be revoked at any time for policy violations.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-600 text-xs -mt-2 ml-1">{errors.agreeToTerms}</p>}

                <label
                  data-error={!!errors.agreeToSafety}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                    form.agreeToSafety ? 'border-blue-400 bg-blue-50' : errors.agreeToSafety ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.agreeToSafety}
                    onChange={(e) => set('agreeToSafety', e.target.checked)}
                    className="accent-blue-600 w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I have read and agree to uphold the Stranger Mingle{' '}
                    <Link href="/safety-guidelines" target="_blank" className="text-blue-600 hover:underline font-medium">
                      Safety Guidelines
                    </Link>
                    . I understand that as a host I am the frontline of safety at every event
                    I run and I take that responsibility seriously.
                  </span>
                </label>
                {errors.agreeToSafety && <p className="text-red-600 text-xs -mt-2 ml-1">{errors.agreeToSafety}</p>}

                <label
                  data-error={!!errors.agreeToZeroHarassment}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                    form.agreeToZeroHarassment ? 'border-blue-400 bg-blue-50' : errors.agreeToZeroHarassment ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.agreeToZeroHarassment}
                    onChange={(e) => set('agreeToZeroHarassment', e.target.checked)}
                    className="accent-blue-600 w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I confirm that I have zero tolerance for harassment of any kind — towards
                    members, co-hosts, or anyone at my events. I understand that any harassment
                    on my part will result in immediate and permanent removal from the platform,
                    and that I will actively intervene if I witness harassment by others.
                  </span>
                </label>
                {errors.agreeToZeroHarassment && <p className="text-red-600 text-xs -mt-2 ml-1">{errors.agreeToZeroHarassment}</p>}

              </div>
            </div>

            {/* Error Message */}
            {submissionError && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
                {submissionError}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-base transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Host Application →'}
              </button>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                Submitting this form will open your email client with your application
                pre-filled. Send the email to complete your submission. We respond within
                5–7 working days.
              </p>
            </div>

          </form>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Host applications are processed by{' '}
          <span className="text-gray-600 font-medium">Salty Media Production (opc) Pvt Ltd</span>.
          Submitting an application does not guarantee host approval. All applications are
          reviewed individually. For questions, write to{' '}
          <a
            href="mailto:strangermingleteam@gmail.com"
            className="text-blue-600 hover:underline"
          >
            strangermingleteam@gmail.com
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/host-an-event"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-white transition-colors"
          >
            Read Host Requirements First
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
}