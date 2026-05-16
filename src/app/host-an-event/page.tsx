import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Host an Event | Stranger Mingle',
  description: 'Apply to become a Verified Host for Stranger Mingle. Help strangers become friends in your city and build a real community.',
  alternates: {
    canonical: '/host-an-event',
  },
};
const benefits = [
  {
    icon: '🛡️',
    title: 'Verified Host Badge',
    description:
      'Gain the official Stranger Mingle Verified Host badge. Members trust your events because they know you\'re vetted and trained.',
  },
  {
    icon: '🏙️',
    title: 'Bring It to Your City',
    description:
      'Be the person who builds a real community in your city. Pune, Mumbai, Bengaluru, Hyderabad, Delhi — or somewhere new.',
  },
  {
    icon: '🤝',
    title: 'Full Platform Support',
    description:
      'Get access to our event toolkit, host guidelines, safety briefings, and direct support from the Stranger Mingle team.',
  },
  {
    icon: '📋',
    title: 'Structured Formats',
    description:
      'Use our proven event formats — chai circles, board game nights, treks, heritage walks — so your first event isn\'t a guessing game.',
  },
  {
    icon: '🌱',
    title: 'Grow a Real Community',
    description:
      'Host consistently and watch a circle of genuine friendships form around you. This is community work, not content creation.',
  },
  {
    icon: '✅',
    title: 'Quality Assurance',
    description:
      'Your events carry the Stranger Mingle name. We give you everything you need to deliver the safe, high-quality experience our members expect.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply Online',
    description:
      'Fill out the host application form. Tell us about yourself, your city, and why you want to host. We read every application personally.',
  },
  {
    number: '02',
    title: 'Review & Screening',
    description:
      'Our team reviews your application. We look for genuine intent, alignment with our values, and your understanding of our zero-harassment policy.',
  },
  {
    number: '03',
    title: 'Verification Call',
    description:
      'Shortlisted applicants are invited for a brief call with the Stranger Mingle team. This isn\'t an interview — it\'s a conversation.',
  },
  {
    number: '04',
    title: 'Host Onboarding',
    description:
      'Once approved, you\'ll go through our host onboarding. You\'ll receive the safety guidelines, event playbook, and operational support.',
  },
  {
    number: '05',
    title: 'Create Your First Event',
    description:
      'Verified hosts get access to the event creation panel. List your event, set capacity, and let the platform handle registrations.',
  },
];

const requirements = [
  'You must be at least 21 years old',
  'You must be a verified Stranger Mingle member first',
  'You must agree to and uphold our Safety Guidelines and Terms of Service',
  'Zero tolerance for harassment — this applies to you as a host, always',
  'You must be present and accessible for the full duration of your events',
  'Events must be held at public venues only — no private residences',
  'Events must not be used for business networking, promotions, MLM, or commercial purposes',
  'You must not use events for dating, romantic matchmaking, or hookup facilitation',
  'You must maintain small group sizes (15–30 people) to preserve quality',
  'You must respond to member queries and safety concerns promptly',
];

export default function HostAnEventPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Become a Host
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Help Strangers Become Friends — In Your City
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Stranger Mingle is growing. We&apos;re looking for passionate, responsible individuals to
            host safe and genuine community events under our brand. Only verified hosts can
            create events on the platform.
          </p>
          
          <a
            href="/host-application"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-lg transition-colors"
          >
            Apply to Host →
          </a>
        </div>
      </section>

      {/* What is a Verified Host */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is a Verified Host?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A Verified Host is a Stranger Mingle community member who has been screened,
            approved, and onboarded by our team to independently organise events under the
            Stranger Mingle name.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Hosts are not employees of Salty Media Production (opc) Pvt Ltd. They are community
            leaders who take on the responsibility of delivering safe, inclusive, and meaningful
            experiences — consistent with our brand values and Safety Guidelines.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            <strong className="text-gray-900">Only verified hosts</strong> have access to the
            event creation panel. Unverified members cannot list events. This is non-negotiable
            — it is how we protect the quality and safety of every Stranger Mingle event across
            every city.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Host with Stranger Mingle?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Hosting isn&apos;t about clout. It&apos;s about doing something real — building a community
              that didn&apos;t exist before you showed up.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Host Application Works</h2>
            <p className="text-gray-500 text-lg">
              The process is simple. We&apos;re not looking for credentials — we&apos;re looking for the
              right people.
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Host Requirements</h2>
          <p className="text-gray-600 text-lg mb-8">
            These are not optional. Every verified host must meet all of the following — no
            exceptions. Stranger Mingle&apos;s reputation is built on safety and trust, and hosts are
            the frontline of that.
          </p>
          <ul className="space-y-3">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-500">
            Hosts who violate Safety Guidelines or Terms of Service will have their host access
            revoked immediately. Depending on the severity of the violation, members may be
            permanently banned from the platform. Refer to our{' '}
            <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
              Safety Guidelines
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            for full details.
          </p>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We&apos;re Looking For</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-3 text-lg">✅ Good Fit</h3>
              <ul className="text-green-700 space-y-2 text-sm leading-relaxed">
                <li>Passionate about building real, offline communities</li>
                <li>Takes safety and inclusion seriously</li>
                <li>Reliable, communicative, and accountable</li>
                <li>Understands Stranger Mingle is about platonic friendship — not networking or dating</li>
                <li>Comfortable facilitating groups of 15–30 people</li>
                <li>Committed to consistent hosting — not one-off events</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-3 text-lg">❌ Not a Fit</h3>
              <ul className="text-red-700 space-y-2 text-sm leading-relaxed">
                <li>Using hosting to grow a personal brand, business, or audience</li>
                <li>Promoting products, services, or MLM schemes through events</li>
                <li>Treating events as networking or lead-generation opportunities</li>
                <li>Anyone with a record of harassment or conduct violations</li>
                <li>Those looking to facilitate romantic or hookup connections</li>
                <li>People who cannot commit time to proper event management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-gray-300 text-lg mb-8">
            If you believe in what Stranger Mingle is building and want to be part of it — we&apos;d
            love to hear from you. Fill out the application form and our team will get back to
            you within 5–7 working days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Host Application&body=Hi, I'd like to apply to become a Verified Host for Stranger Mingle. Here's a bit about me:"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              Apply via Email
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Contact Us First
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Email:{' '}
            
            <a
              href="mailto:strangermingleteam@gmail.com"
              className="text-gray-300 hover:text-white underline"
            >
              strangermingleteam@gmail.com
            </a>{' '}
            · We respond within 48–72 hours.
          </p>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">Salty Media Production (opc) Pvt Ltd</span>.
          All host activity is governed by our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          , and internal host policies.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
}