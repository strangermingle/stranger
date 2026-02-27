import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail, ShieldCheck, Zap, Heart, Palette, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';

const teamMembers = [
    {
        name: "Trishul D N",
        role: "Founder",
        image: "/images/team/trishul.png",
        bio: "Trishul is on a mission to solve urban loneliness in India. With a background in Gender Trainer and AI startups, he envisioned Stranger Mingle as a way to create meaningful human connections in our fast-paced cities.",
        icon: <Zap className="w-5 h-5" />,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        social: {
            linkedin: "https://www.linkedin.com/in/trishuldn/",
        }
    },
    {
        name: "Ashwini",
        role: "Co-Founder",
        image: "/images/team/priya.png",
        bio: "A tech visionary who believes in using technology to bring people together rather than pull them apart. Ashwini ensures our platform is safe, seamless, and built for scale.",
        icon: <ShieldCheck className="w-5 h-5" />,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        social: {
            linkedin: "https://www.linkedin.com/company/strangermingle",
        }
    }
];

export const metadata: Metadata = {
    title: "Meet the Team | Stranger Mingle",
    description: "Meet the passionate team behind Stranger Mingle, building a more connected world through shared experiences and genuine friendships.",
    alternates: {
        canonical: "/team",
    }
};

export default function TeamPage() {

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-blue-50/50 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
                        Meet the Dream Team
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        The passionate individuals working behind the scenes to help you build genuine friendships and discover the magic of shared experiences.
                    </p>
                </div>
            </div>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-32 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            className={`group relative bg-white rounded-4xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${index === 3 ? 'lg:col-start-1 lg:ml-auto md:max-w-md' : index === 4 ? 'lg:col-start-2 lg:mr-auto md:max-w-md' : ''}`}
                        >
                            {/* Member Image */}
                            <div className="relative w-full aspect-square mb-8 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    unoptimized={true}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* Info */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-xl ${member.bgColor} ${member.color}`}>
                                    {member.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                            </div>

                            <p className={`text-sm font-semibold tracking-wider uppercase mb-4 ${member.color}`}>
                                {member.role}
                            </p>

                            <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
                                {member.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                {member.social.linkedin && (
                                    <a href={member.social.linkedin} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {(member.social as any).twitter && (
                                    <a href={(member.social as any).twitter} className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {(member.social as any).github && (
                                    <a href={(member.social as any).github} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {(member.social as any).mail && (
                                    <a href={(member.social as any).mail} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 pb-32 sm:px-6 lg:px-8">
                <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-4xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Join us on our journey to connect people.</h2>
                        <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto italic">
                            &quot;The greatness of a community is most accurately measured by the compassionate actions of its members.&quot;
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/blog"
                                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg shadow-blue-900/20 min-w-[200px]"
                            >
                                Read Blogs
                            </Link>
                            <Link
                                href="/events"
                                className="bg-blue-500 text-white border-2 border-white/20 px-8 py-4 rounded-full font-bold hover:bg-blue-400 transition-all hover:scale-105 shadow-lg shadow-blue-900/20 min-w-[200px]"
                            >
                                Join MeetUps
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
