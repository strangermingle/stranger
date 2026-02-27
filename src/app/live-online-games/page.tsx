import { ArrowRight, Trophy, Users, Zap, Search, Joystick } from "lucide-react";
import Link from 'next/link';
import type { Metadata } from "next";

const games = [
    {
        id: 'chess',
        name: 'Online Chess',
        description: 'Challenge a friend or test your skills against the board. Real-time strategy at your fingertips.',
        icon: <Trophy className="w-8 h-8 text-yellow-500" />,
        color: 'from-orange-500/10 to-yellow-500/10',
        href: '/live-online-games/chess',
        badge: 'Classic'
    },
    {
        id: 'ludo',
        name: 'Online Ludo',
        description: 'The ultimate childhood classic. Roll the dice, move your tokens, and race to the finish line.',
        icon: <Joystick className="w-8 h-8 text-green-500" />,
        color: 'from-green-500/10 to-emerald-500/10',
        href: '/live-online-games/ludo',
        badge: 'Popular'
    },
    {
        id: 'mafia',
        name: 'Mafia Hub',
        description: 'A social deduction experience. Find the imposters or survive the night in this intense mingle.',
        icon: <Users className="w-8 h-8 text-purple-500" />,
        color: 'from-purple-500/10 to-indigo-500/10',
        href: '/live-online-games/mafia',
        badge: 'Social'
    }
];

export const metadata: Metadata = {
    title: "Live Online Games Hub | Play & Connect - Stranger Mingle",
    description: "Play classic online games like Chess, Ludo, and Mafia with strangers. Connect through interactive gameplay right in your browser.",
    alternates: {
        canonical: "/live-online-games",
    }
};

export default function LiveOnlineGames() {

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-200 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-6 animate-bounce">
                        <Zap className="w-4 h-4" />
                        No Registration Required. Just Play.
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
                        Live <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Online Games</span><br /> Hub
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
                        Connect with strangers through interactive games. Choose a board, invite a friend, and start playing right in your browser.
                    </p>
                </div>
            </div>

            {/* Games Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {games.map((game) => (
                        <Link
                            key={game.id}
                            href={game.href}
                            className="group relative flex flex-col p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className={`absolute inset-0 bg-linear-to-br ${game.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        {game.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-[10px] uppercase font-bold tracking-widest">
                                        {game.badge}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {game.name}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-8 h-20 overflow-hidden">
                                    {game.description}
                                </p>
                                <div className="flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
                                    Play Now <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* How to Play Section */}
            <div className="bg-gray-50/50 py-24 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-16 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-gray-100">
                                <Search className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Choose a Game</h4>
                            <p className="text-gray-600">Browse our library of classic games designed for connection.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-gray-100">
                                <Users className="w-8 h-8 text-purple-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Instant Join</h4>
                            <p className="text-gray-600">No login required. Just jump in and start playing immediately.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-gray-100">
                                <Joystick className="w-8 h-8 text-pink-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Play & Connect</h4>
                            <p className="text-gray-600">Enjoy real-time gameplay and stay for the community vibez.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <div className="p-12 md:p-20 rounded-[3rem] bg-gray-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            More Games Coming Soon
                        </h2>
                        <p className="text-indigo-200 text-xl mb-10 max-w-2xl mx-auto">
                            We're constantly adding new ways to mingle. Suggest a game you'd like to see here!
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-black hover:bg-indigo-50 transition-colors shadow-2xl">
                            Suggest a Game
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
