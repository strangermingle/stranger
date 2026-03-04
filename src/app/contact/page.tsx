import type { Metadata } from 'next';
import SocialLinks from '@/components/SocialLinks';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Contact Us | Stranger Mingle",
    description: "Have questions or need assistance? Reach out to the Stranger Mingle team. We're here to help you make new friends.",
    alternates: {
        canonical: "/contact",
    },
};

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions, suggestions, or need assistance? Reach out to the <strong>Stranger Mingle</strong> team (a brand of <strong>Salty Media Production (opc) Pvt Ltd</strong>) and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                                    <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 hover:text-blue-700">
                                        strangermingleteam@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                                    <p className="text-gray-600">We usually reply within 24 hours during business days.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">We're in India</h3>
                                    <p className="text-gray-600">Serving Pune, Hyderabad, Mumbai, Bangalore, and more cities.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-900 mb-1">Follow Us</h3>
                            <SocialLinks />
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
