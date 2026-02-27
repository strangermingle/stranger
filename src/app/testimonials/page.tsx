import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Stories & Testimonials | Stranger Mingle",
    description: "Read real stories and experiences from community members who found friendship and connection through Stranger Mingle meetups.",
    alternates: {
        canonical: "/testimonials",
    }
};

export default function Testimonials() {

    const testimonials = [
        {
            name: "Suraj Bhan Singh",
            location: "Pune, India",
            text: "I joined this group with my friend and initially we were just 2 of us. But slowly we started meeting new people and now we have a group of 10-15 people who regularly hang out together. It's a great way to meet new people and make friends.",
            rating: 4.5
        },
        {
            name: "Anuradha",
            location: "Pune, India",
            text: "I met Trishul through my another friend and now he is my good friend. I wanted to meet people naturally. The board game night was so much fun, and I didn't have to worry about forcing conversation.",
            rating: 5
        },
        {
            name: "Ajay Chandra",
            location: "Bengaluru, India",
            text: "I am MBA student. I was looking for a way to meet new people and make friends. I found this group and it has been a great experience.",
            rating: 4
        },
        {
            name: "Varsha Sundaram",
            location: "Bengaluru, India",
            text: "I'm working in Bengaluru since last 5 years and i haven't met many people. This group helped me to connect with new people and make friends.",
            rating: 5
        },
        {
            name: "Arun G",
            location: "Bengaluru, India",
            text: "I'm into theater and Trishul helped me to connect with like minded people. I made good connections with locals.",
            rating: 5
        },
        {
            name: "Priya S",
            location: "Pune, India",
            text: "Basically from Bengaluru and I met Trishul in Bengaluru. When he started initial activities in Bengaluru, I was one of the first few to join. I had a great time and made some good friends. Now I'm in Pune and I'm glad to see that Trishul has started activities in Pune as well. I'm looking forward to join them and make some new friends.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen p-8 pt-32 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    User Stories
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    See what people are saying about their experiences on Stranger Mingle.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl hover:border-blue-300 transition-colors shadow-sm">
                        <div className="flex text-yellow-500 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{t.name}</div>
                                <div className="text-xs text-gray-500">{t.location}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
