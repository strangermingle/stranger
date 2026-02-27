import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Stranger Mingle",
    description: "Find answers to common questions about Stranger Mingle events, registration, safety, and community guidelines.",
    alternates: {
        canonical: "/faqs",
    },
};

export default function FAQs() {
    const faqs = [
        {
            category: "Getting Started",
            questions: [
                {
                    q: "What is Stranger Mingle and how does it work?",
                    a: "Stranger Mingle is a community platform that helps people make real friends through organized weekend events across Indian cities. We host meetups, treks, cultural activities, and social gatherings where strangers meet and genuine friendships form. Simply browse our events, register for ones that interest you, and show up – we handle the introductions and ice-breakers."
                },
                {
                    q: "Is Stranger Mingle free to use?",
                    a: "Stranger Mingle is not free, but it's not expensive either. We charge reasonable fees (typically ₹299-₹599 per event) purely to maintain the platform, book venues, and run activities smoothly. This is not for profit – it's to ensure quality experiences and sustainable operations. The fees cover venue bookings, organizer support, safety measures, and platform maintenance."
                },
                {
                    q: "Do I need to join or create an account?",
                    a: "Yes, you need to join our member community to attend events. Joining includes basic verification (name, age, phone number, email) through our Member Portal to ensure community safety. This helps us maintain a verified, trustworthy community where everyone feels secure."
                },
                {
                    q: "Which cities does Stranger Mingle operate in?",
                    a: "We currently operate in Pune, and we're expanding to Mumbai, Bangalore, Delhi, Hyderabad, and other major Indian cities. Check our events page to see what's available in your city. If Stranger Mingle isn't in your city yet, you can also reach out about bringing it to your location."
                },
                {
                    q: "Who attends Stranger Mingle events?",
                    a: "People who've just moved to a new city, students who've lost touch with college friends, IT professionals, anyone who wants to make friends but doesn't know where to start. What binds our community isn't job titles or backgrounds – it's the courage to show up and the desire for genuine friendships."
                }
            ]
        },
        {
            category: "Events and Registration",
            questions: [
                {
                    q: "How do I join an event?",
                    a: "Visit our Events page, browse upcoming activities, select an event that interests you, and click 'Join / Book'. You will be directed to our Member Portal to complete the payment through our secure payment gateway. Once done, you'll receive a confirmation email with event details, venue address, and organizer contact information."
                },
                {
                    q: "What types of events do you organise?",
                    a: "We organise diverse events including casual social meetups (chai circles, board game nights), adventure outings (treks, cycling, camping), cultural experiences (heritage walks, art gallery visits, food tours), and volunteering activities (animal shelter visits, community cleanups). There's something for everyone, from low-key coffee meetups to full-day adventures."
                },
                {
                    q: "How many people attend each event?",
                    a: "We keep groups small and manageable – typically 15-25 people per event. This ensures everyone gets a chance to interact meaningfully and no one feels left out. Smaller groups create more intimate connections and better conversations."
                },
                {
                    q: "Can I bring a friend to events?",
                    a: "Yes, but they need to register separately with their own account. Each person must complete verification and pay the event fee. Most people come alone though – you're in good company!"
                },
                {
                    q: "What should I bring to events?",
                    a: "Bring yourself, an open mind, and your phone (charged). For outdoor events, bring water, comfortable shoes, and any personal medications. For specific events like treks or camping, we'll send a detailed packing list after registration. Don't bring unnecessary valuables."
                },
                {
                    q: "Do I need any special skills or fitness level?",
                    a: "For casual social events, no special requirements. For physical activities like trekking or cycling, we specify the difficulty level during registration. If you have health conditions, disclose them to organizers beforehand. Don't participate in physical activities if you're unwell or not adequately fit."
                }
            ]
        },
        {
            category: "Safety and Community",
            questions: [
                {
                    q: "Is Stranger Mingle safe for women?",
                    a: "Absolutely. We have zero tolerance for harassment and maintain strict safety protocols. All participants complete verification before attending. We encourage women to participate and have specific safety measures in place – event organizers are trained, events are in public locations, groups are manageable, and any harassment results in immediate removal and permanent ban. We've created thousands of safe interactions across our events."
                },
                {
                    q: "How do you verify members?",
                    a: "All members must provide verified information during registration including full name, age, phone number, and email. For certain events, we may require government ID verification. This basic verification helps maintain community safety and accountability."
                },
                {
                    q: "What happens if someone makes me uncomfortable?",
                    a: "Inform the event organizer immediately. They are trained to handle such situations and will intervene. You can also leave the event if you feel unsafe. Anyone making others uncomfortable will be removed from the event without refund and may face permanent ban. After the event, you can report the incident, and we'll investigate thoroughly."
                },
                {
                    q: "Do you tolerate discrimination based on caste, religion, or background?",
                    a: "Absolutely not. Stranger Mingle stands firmly against discrimination of any kind – caste, religion, gender, skin colour, economic status, or educational background. We're building a community where people look beyond these divisions. Anyone found discriminating will be removed immediately and permanently banned."
                },
                {
                    q: "What is your policy on harassment?",
                    a: "Zero tolerance. Any form of harassment – sexual, verbal, physical, or otherwise – results in immediate removal from events and permanent platform ban. We take all reports seriously, investigate thoroughly, and act swiftly. Your safety and comfort are non-negotiable."
                }
            ]
        },
        {
            category: "Payments and Refunds",
            questions: [
                {
                    q: "What payment methods do you accept?",
                    a: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway. All transactions are encrypted and safe."
                },
                {
                    q: "Can I get a refund if I can't attend?",
                    a: "Yes, depending on when you cancel. If you cancel 48+ hours before the event, you get 100% refund or credit. If you cancel 24-48 hours before, you get 50% refund or 75% credit. Cancellations less than 24 hours before are not refundable, but you can transfer your spot to someone else. See our Refund Policy page for complete details."
                },
                {
                    q: "What if Stranger Mingle cancels the event?",
                    a: "If we cancel an event for any reason (weather, low registrations, venue issues), you'll receive a full 100% refund within 5-7 business days, or 110% credit for future events (bonus 10% for the inconvenience). We'll notify you immediately via email and SMS."
                },
                {
                    q: "Can I transfer my ticket to someone else?",
                    a: "Yes! If you can't attend, you can transfer your spot to another person. Contact us at least 24 hours before the event with the new attendee's details (name, email, phone). Transfers are free. The new attendee must meet our age and verification requirements."
                },
                {
                    q: "Do you offer any discounts or free trials?",
                    a: "We occasionally run special offers and discounts. Follow us on social media or subscribe to our newsletter to stay updated. Pricing information for current events is always transparent during registration."
                }
            ]
        },
        {
            category: "After Events",
            questions: [
                {
                    q: "Can I meet people from events outside of Stranger Mingle activities?",
                    a: "Yes, absolutely! Members often exchange contact details and meet independently. However, these interactions are your personal choice and responsibility. Stranger Mingle is not responsible for what happens outside our organized events. We recommend meeting in public places initially and exercising common sense."
                },
                {
                    q: "Is Stranger Mingle a dating platform?",
                    a: "No. Stranger Mingle is strictly for platonic friendships. If you're looking for dating or romantic connections, there are other platforms for that. Anyone using our events primarily for dating purposes will be removed. We're here for people who want genuine friends they can call on a random Tuesday."
                },
                {
                    q: "How do I stay connected with people I meet?",
                    a: "Exchange contact details during or after events – WhatsApp, phone numbers, social media handles. Members often stay in touch directly via WhatsApp, text messages, or emails. Some groups of friends who meet at our events continue organizing their own meetups independently."
                },
                {
                    q: "What if I don't connect with anyone at my first event?",
                    a: "Friendships take time. Don't be discouraged if the first event doesn't result in instant connections. Try different types of events, attend regularly, and give yourself a few opportunities. Some people click immediately, others take 3-4 events to find their circle. Keep showing up."
                }
            ]
        },
        {
            category: "Technical and Account",
            questions: [
                {
                    q: "How do I update my account information?",
                    a: "Log into your account, go to Settings or Profile, and update your information. If you need help, contact our support team at strangermingleteam@gmail.com."
                },
                {
                    q: "I forgot my password. How do I reset it?",
                    a: "Go to the Member Portal login page and click 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to set a new password."
                },
                {
                    q: "Can I delete my account?",
                    a: "Yes. Contact us at strangermingleteam@gmail.com requesting account deletion. We'll process your request within 7 business days. Note that some information may be retained for legal or accounting purposes (like transaction records)."
                },
                {
                    q: "Why was my account suspended or banned?",
                    a: "Accounts are suspended or banned for violating our Terms of Service or Community Guidelines – harassment, discrimination, repeated no-shows, fake information, or inappropriate behaviour. If you believe this was an error, contact us at strangermingleteam@gmail.com with your account details."
                },
                {
                    q: "How do I unsubscribe from emails?",
                    a: "Click the 'Unsubscribe' link at the bottom of any marketing email. You'll still receive essential service emails (event confirmations, safety alerts) but won't get promotional newsletters."
                }
            ]
        },
        {
            category: "Privacy and Data",
            questions: [
                {
                    q: "What information do you collect about me?",
                    a: "We collect basic information needed to run events safely: name, age, email, phone number, and basic verification details. We also collect event participation history and payment information. Read our complete Privacy Policy for detailed information about data collection and usage."
                },
                {
                    q: "Do you sell my data to third parties?",
                    a: "Never. We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your data is used solely to provide you with safe, quality events and improve our services."
                },
                {
                    q: "Is my payment information safe?",
                    a: "Yes. All payments are processed through secure, encrypted third-party payment gateways. We do not store your complete credit/debit card details on our servers. Your financial information is protected by industry-standard security measures."
                },
                {
                    q: "Can other members see my personal information?",
                    a: "No. Other members can only see your first name, age range, and city when you're registered for the same event. Your full contact details, address, and other personal information are never shared unless you choose to exchange them personally."
                }
            ]
        },
        {
            category: "Organising Events",
            questions: [
                {
                    q: "Can I organise Stranger Mingle events in my city?",
                    a: "Yes! We encourage people who want to take initiative and bring Stranger Mingle to their cities. This is done under strict rules and regulations to maintain our quality and safety standards. Contact us at strangermingleteam@gmail.com if you're interested in organizing events in your city."
                },
                {
                    q: "What support do event organizers get?",
                    a: "Organizers receive training on community guidelines, safety protocols, event management, and conflict resolution. We provide branding materials, platform access for registrations, payment processing support, and ongoing guidance. You'll be part of a larger community of organizers across India."
                },
                {
                    q: "Are event organizers paid?",
                    a: "Yes, event organizers receive compensation for their time and effort. The structure varies based on event size, type, and city. Contact us for specific details about organizer compensation in your region."
                }
            ]
        },
        {
            category: "Troubleshooting",
            questions: [
                {
                    q: "I registered for an event but didn't receive confirmation email",
                    a: "Check your spam/junk folder first. If you still don't see it, contact us at strangermingleteam@gmail.com with your registered email and event name. We'll resend the confirmation and verify your registration."
                },
                {
                    q: "The payment went through but registration shows as pending",
                    a: "Sometimes payment confirmations take a few minutes to process. Wait 10-15 minutes and refresh your account page. If it's still pending after 30 minutes, contact strangermingleteam@gmail.com with your payment reference number."
                },
                {
                    q: "I can't find events in my city",
                    a: "We may not have launched in your city yet. Check our Events page regularly, or subscribe to notifications for when we expand to your location. You can also express interest in bringing Stranger Mingle to your city by contacting us."
                },
                {
                    q: "The venue address is unclear or I can't find the location",
                    a: "Contact the event organizer directly using the contact details provided in your confirmation email. They'll help you with directions or arrange a meeting point if needed."
                }
            ]
        },
        {
            category: "General Questions",
            questions: [
                {
                    q: "What makes Stranger Mingle different from other meetup platforms?",
                    a: "We're focused solely on genuine friendships, not networking or dating. We're built specifically for Indian communities with awareness of our unique social dynamics. We maintain strict safety standards, particularly for women. We keep groups small for meaningful connections. And we're transparent about being sustainable, not profit-driven."
                },
                {
                    q: "Are there age restrictions?",
                    a: "Yes. You must be at least 18 years old to participate in Stranger Mingle events. We verify age during registration and may request ID proof at events."
                },
                {
                    q: "What languages are spoken at events?",
                    a: "Most events are conducted in English and Hindi, but it varies by city and participant mix. Some events may have regional language conversations. Communication is always respectful and inclusive."
                },
                {
                    q: "Can introverts join Stranger Mingle?",
                    a: "Absolutely! Many of our members are introverts. We structure events specifically so introverts feel comfortable – with ice-breakers, smaller groups, and activities that don't require constant talking. Some of our best success stories come from introverts who found their circle through Stranger Mingle."
                },
                {
                    q: "What should I wear to events?",
                    a: "Dress comfortably and appropriately for the activity. For casual meetups, wear whatever makes you feel confident and comfortable. For treks or outdoor events, wear appropriate activewear and comfortable shoes. We'll provide specific guidelines for special events in your confirmation email."
                },
                {
                    q: "Can I attend events alone?",
                    a: "Yes – most people do! In fact, we encourage it. Coming alone makes you more open to meeting new people. The organizer handles introductions and ice-breakers, so you're never awkwardly standing alone."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                            Frequently Asked Questions About Making Friends in India
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about joining Stranger Mingle, attending weekend friendship events, staying safe, and building genuine connections across Indian cities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="max-w-4xl mx-auto px-8 py-12">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Answers to Common Questions About Friendship Meetups</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                        <p className="leading-relaxed">
                            Making friends as an adult in India can feel impossible – especially when you&apos;re new to a city, working long hours, or have lost touch with your college crowd. Stranger Mingle exists to change that through real, offline weekend events where genuine friendships form naturally.
                        </p>
                        <p className="leading-relaxed">
                            Below you&apos;ll find answers to the most common questions about how Stranger Mingle works, event safety, registration, payments, and what to expect. If you don&apos;t find your answer here, reach out to us directly – we&apos;re always happy to help.
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                        <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
                        <div className="text-sm text-gray-600">Minimum Age for Events</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-100">
                        <div className="text-4xl font-bold text-purple-600 mb-2">25-30</div>
                        <div className="text-sm text-gray-600">People Per Event</div>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-6 text-center border border-pink-100">
                        <div className="text-4xl font-bold text-pink-600 mb-2">Every Weekend</div>
                        <div className="text-sm text-gray-600">Events Across Cities</div>
                    </div>
                </div>

                {/* Popular Topics Navigation */}
                <div className="bg-gray-50 rounded-xl p-6 mb-12 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Jump to Popular Topics:</h3>
                    <div className="flex flex-wrap gap-3">
                        {faqs.map((category, idx) => (
                            <a
                                key={idx}
                                href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 hover:text-blue-600"
                            >
                                {category.category}
                            </a>
                        ))}
                    </div>
                </div>

                {/* FAQ Categories */}
                {faqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} id={category.category.toLowerCase().replace(/\s+/g, '-')} className="mb-16 scroll-mt-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
                            {category.category}
                        </h2>
                        <div className="space-y-4">
                            {category.questions.map((faq, faqIndex) => (
                                <details
                                    key={faqIndex}
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 group hover:bg-white transition-colors shadow-sm hover:shadow-md"
                                >
                                    <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                                        <span className="text-lg pr-4">{faq.q}</span>
                                        <svg
                                            className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <p className="text-gray-700 mt-4 leading-relaxed pl-2 border-l-2 border-blue-500/50">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Still Have Questions */}
                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100 mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Can&apos;t find the answer you&apos;re looking for? Our support team is here to help. Reach out and we&apos;ll get back to you within 24-48 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:strangermingleteam@gmail.com"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Email Support
                        </a>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            Contact Form
                        </a>
                    </div>
                </div>

                {/* Related Resources */}
                <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <a href="/about" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">About Stranger Mingle</h4>
                            <p className="text-sm text-gray-600">Learn about our mission, values, and how we&apos;re building safe friendship communities across India.</p>
                        </a>
                        <a href="/safety-guidelines" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">Safety Guidelines</h4>
                            <p className="text-sm text-gray-600">Comprehensive safety tips for before, during, and after events to ensure your protection.</p>
                        </a>
                        <a href="/refund-policy" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">Refund Policy</h4>
                            <p className="text-sm text-gray-600">Clear cancellation and refund terms for event registrations.</p>
                        </a>
                        <a href="/events" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">Browse Events</h4>
                            <p className="text-sm text-gray-600">See what&apos;s happening this weekend in your city and register for upcoming friendship meetups.</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.flatMap(category =>
                            category.questions.map(faq => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a
                                }
                            }))
                        )
                    })
                }}
            />

            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Stranger Mingle",
                        "url": "https://www.strangermingle.com",
                        "logo": "https://www.strangermingle.com/logo.png",
                        "description": "Stranger Mingle helps people make genuine friendships through organized weekend events across Indian cities. We create safe spaces for meaningful connections beyond class, caste, and background.",
                        "sameAs": [
                            "https://www.facebook.com/strangermingle",
                            "https://www.instagram.com/strangermingle",
                            "https://twitter.com/strangermingle"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "Customer Support",
                            "email": "strangermingleteam@gmail.com",
                            "availableLanguage": ["English", "Hindi"]
                        }
                    })
                }}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://www.strangermingle.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "FAQs",
                                "item": "https://www.strangermingle.com/faqs"
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}