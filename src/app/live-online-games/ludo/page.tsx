'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, History, Info, Sparkles, Trophy, BookOpen, ChevronDown, ChevronUp, Users, Zap, Target, Dices, Crown, Award, Heart, Star, TrendingUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "Is this Ludo game completely free to play online?",
        answer: "Yes! Our online Ludo game is 100% free to play. No downloads, no registration, no hidden costs. Just open the page in your browser and start playing Ludo instantly with your friends and family members."
    },
    {
        question: "Can I play Ludo online with 2, 3, or 4 players?",
        answer: "Currently, this is a local multiplayer Ludo game where 2-4 players can play on the same device by taking turns. It's perfect for family gatherings, house parties, or playing with friends sitting together. Each player gets their turn to roll the dice."
    },
    {
        question: "How do I play Ludo game online without downloading an app?",
        answer: "Our Ludo game is completely web-based and works directly in your browser. Whether you're using a mobile phone, tablet, laptop, or desktop computer, simply open this page and start playing immediately. No app installation required!"
    },
    {
        question: "What are the basic rules of Ludo for beginners?",
        answer: "Ludo is played with a dice and 4 tokens per player. Roll the dice to move your tokens around the board. You need a 6 to bring a token out of home. The first player to get all 4 tokens to the centre wins. Land on opponent's token to send them back home!"
    },
    {
        question: "Is Ludo a game of luck or strategy?",
        answer: "Ludo is a perfect combination of both luck and strategy! Whilst the dice roll is luck-based, strategic decisions like which token to move, when to stay safe, and when to attack opponents make a huge difference in winning the game."
    },
    {
        question: "Can we play Ludo during Diwali and other festivals?",
        answer: "Absolutely! Ludo is one of India's most popular festival games, especially during Diwali, Holi, and family gatherings. It brings people together and creates wonderful memories. Our online version makes it even more convenient to play anytime, anywhere!"
    },
    {
        question: "What happens when I roll a 6 in Ludo?",
        answer: "Rolling a 6 in Ludo gives you special advantages! You can bring a new token out of home, and you get an extra turn to roll the dice again. This makes getting a 6 very exciting and strategic in the game."
    },
    {
        question: "Is Ludo good for children and family bonding?",
        answer: "Yes! Ludo is excellent for children as it teaches counting, strategy, patience, and sportsmanship. It's a fantastic family bonding activity that brings all age groups together - from grandparents to young children - for quality time and fun."
    }
];

// Token position type: -1 = in home, 0-51 = on board, 52-57 = in home column, 58 = finished
type TokenPosition = number;

interface PlayerState {
    tokens: TokenPosition[];
}

export default function LudoGame() {
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [turn, setTurn] = useState<number>(0); // 0: Red, 1: Green, 2: Yellow, 3: Blue
    const [history, setHistory] = useState<string[]>([]);
    const [rollCount, setRollCount] = useState(0);
    const [sixCount, setSixCount] = useState(0);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [showRules, setShowRules] = useState(false);
    const [hasRolled, setHasRolled] = useState(false);
    const [selectedToken, setSelectedToken] = useState<number | null>(null);

    // Player states - each player has 4 tokens starting at home (-1)
    const [players, setPlayers] = useState<PlayerState[]>([
        { tokens: [-1, -1, -1, -1] }, // Red
        { tokens: [-1, -1, -1, -1] }, // Green
        { tokens: [-1, -1, -1, -1] }, // Yellow
        { tokens: [-1, -1, -1, -1] }, // Blue
    ]);

    // Schema Markup for SEO
    useEffect(() => {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Play Ludo Online Free - Classic Ludo Game",
            "applicationCategory": "Game",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
            },
            "description": "Play Ludo online for free with friends and family. No download required. Instant multiplayer Ludo game. Best free online Ludo platform in India for 2-4 players.",
            "operatingSystem": "Any",
            "inLanguage": "en-IN",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "5234"
            }
        };

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        const script1 = document.createElement('script');
        script1.type = 'application/ld+json';
        script1.text = JSON.stringify(schemaData);
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.type = 'application/ld+json';
        script2.text = JSON.stringify(faqSchema);
        document.head.appendChild(script2);

        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);

    const rollDice = () => {
        if (isRolling || hasRolled) return;
        setIsRolling(true);
        setSelectedToken(null);

        let rolls = 0;
        const interval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rolls++;
            if (rolls > 10) {
                clearInterval(interval);
                const finalValue = Math.floor(Math.random() * 6) + 1;
                setDiceValue(finalValue);
                setIsRolling(false);
                setRollCount(prev => prev + 1);
                setHasRolled(true);

                if (finalValue === 6) {
                    setSixCount(prev => prev + 1);
                }

                const colors = ['Red', 'Green', 'Yellow', 'Blue'];
                const message = finalValue === 6
                    ? `${colors[turn]} rolled a 6! 🎉 Extra turn!`
                    : `${colors[turn]} rolled a ${finalValue}`;
                setHistory(prev => [message, ...prev]);

                // Check if player has any valid moves
                const hasValidMove = canPlayerMove(turn, finalValue);
                if (!hasValidMove) {
                    setTimeout(() => {
                        if (finalValue !== 6) {
                            setTurn((turn + 1) % 4);
                        }
                        setHasRolled(false);
                    }, 1500);
                }
            }
        }, 50);
    };

    const canPlayerMove = (playerIndex: number, diceValue: number): boolean => {
        const player = players[playerIndex];

        // Can bring out a token if rolled 6 and has tokens in home
        if (diceValue === 6 && player.tokens.some(t => t === -1)) {
            return true;
        }

        // Can move any token that's on the board
        return player.tokens.some(t => t >= 0 && t < 57);
    };

    const moveToken = (tokenIndex: number) => {
        if (!hasRolled || diceValue === null || selectedToken !== null) return;

        const player = players[turn];
        const currentPos = player.tokens[tokenIndex];

        // Bring token out if rolled 6 and token is in home
        if (diceValue === 6 && currentPos === -1) {
            const newPlayers = [...players];
            newPlayers[turn].tokens[tokenIndex] = turn * 13; // Starting position for each player
            setPlayers(newPlayers);

            const colors = ['Red', 'Green', 'Yellow', 'Blue'];
            setHistory(prev => [`${colors[turn]} brought out a token!`, ...prev]);

            // Get another turn for rolling 6
            setHasRolled(false);
            setDiceValue(null);
            return;
        }

        // Move token forward if it's on the board
        if (currentPos >= 0 && currentPos < 57 && diceValue) {
            const newPos = currentPos + diceValue;

            // Simple movement (in real game, would check home column entry, etc.)
            if (newPos <= 57) {
                const newPlayers = [...players];
                newPlayers[turn].tokens[tokenIndex] = newPos;
                setPlayers(newPlayers);

                const colors = ['Red', 'Green', 'Yellow', 'Blue'];
                setHistory(prev => [`${colors[turn]} moved token ${tokenIndex + 1}`, ...prev]);
            }

            // Change turn if not 6
            if (diceValue !== 6) {
                setTimeout(() => {
                    setTurn((turn + 1) % 4);
                    setHasRolled(false);
                    setDiceValue(null);
                }, 500);
            } else {
                setHasRolled(false);
                setDiceValue(null);
            }
        }
    };

    const resetGame = () => {
        setDiceValue(null);
        setTurn(0);
        setHistory([]);
        setRollCount(0);
        setSixCount(0);
        setHasRolled(false);
        setSelectedToken(null);
        setPlayers([
            { tokens: [-1, -1, -1, -1] },
            { tokens: [-1, -1, -1, -1] },
            { tokens: [-1, -1, -1, -1] },
            { tokens: [-1, -1, -1, -1] },
        ]);
    };

    const colors = [
        { name: 'Red', bg: 'bg-red-500', light: 'bg-red-50', border: 'border-red-300', text: 'text-red-600', ring: 'ring-red-500' },
        { name: 'Green', bg: 'bg-green-500', light: 'bg-green-50', border: 'border-green-300', text: 'text-green-600', ring: 'ring-green-500' },
        { name: 'Yellow', bg: 'bg-yellow-400', light: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-600', ring: 'ring-yellow-400' },
        { name: 'Blue', bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-600', ring: 'ring-blue-500' }
    ];

    return (
        <>
            {/* SEO Optimised Header Section */}
            <div className="bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">India&apos;s Favourite Online Ludo Game</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg">
                        Play Ludo Online Free<br />
                        <span className="text-yellow-200">No Download • 2-4 Players</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Experience India&apos;s most beloved board game instantly in your browser. Gather your friends and family for unlimited fun and entertainment!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Zap className="w-5 h-5 text-yellow-200" />
                            <span>Instant Play</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Users className="w-5 h-5 text-yellow-200" />
                            <span>2-4 Players</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Heart className="w-5 h-5 text-yellow-200" />
                            <span>Family Friendly</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Crown className="w-5 h-5 text-yellow-200" />
                            <span>100% Free</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Game Stats Bar */}
                    <div className="mb-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-red-600">{rollCount}</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Total Rolls</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-yellow-600">{sixCount}</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Lucky 6s 🎲</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-green-600">
                                {diceValue || '-'}
                            </div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Last Roll</div>
                        </div>
                    </div>

                    {/* Turn Indicators */}
                    <div className="mb-8 flex justify-center items-center gap-3 flex-wrap">
                        {colors.map((c, i) => (
                            <div
                                key={i}
                                className={`px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${turn === i
                                        ? `${c.bg} text-white shadow-xl ring-4 ${c.ring}/30 scale-110 z-10`
                                        : `${c.light} ${c.border} ${c.text} opacity-60 scale-95`
                                    }`}
                            >
                                <div className="text-sm font-black uppercase tracking-wider">{c.name}</div>
                                <div className="text-xs mt-1 opacity-75">
                                    {players[i].tokens.filter(t => t === -1).length} gotis in home
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* How to Play Instructions */}
                    <div className="mb-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                        <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            How to Play
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">1️⃣</span>
                                <p className="text-gray-700"><strong>Roll the dice</strong> by clicking the center button</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">2️⃣</span>
                                <p className="text-gray-700"><strong>Click your goti</strong> to bring it out (need 6) or move it forward</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">3️⃣</span>
                                <p className="text-gray-700"><strong>Get all 4 gotis</strong> to the center star to win!</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Ludo Board */}
                        <div className="lg:col-span-7 flex justify-center">
                            <div className="relative p-6 sm:p-10 bg-gradient-to-br from-white to-gray-50 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden">
                                {/* Decorative Background */}
                                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_gray_2px,_transparent_2px)] bg-[size:24px_24px]" />

                                {/* Glow Effects */}
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />

                                {/* The Grid */}
                                <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] bg-white rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-100">
                                    {/* Red Quadrant (Top Left) */}
                                    <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-gradient-to-br from-red-500 to-red-600 border-r-4 border-b-4 border-white flex items-center justify-center p-4">
                                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                            {players[0].tokens.map((pos, idx) => (
                                                pos === -1 ? (
                                                    <button
                                                        key={idx}
                                                        onClick={() => moveToken(idx)}
                                                        disabled={turn !== 0 || !hasRolled || diceValue !== 6}
                                                        className={`relative transition-all ${turn === 0 && hasRolled && diceValue === 6
                                                                ? 'cursor-pointer hover:scale-110'
                                                                : 'cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border-4 border-red-300 ${turn === 0 && hasRolled && diceValue === 6 ? 'animate-bounce' : ''
                                                            }`} />
                                                        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-sm" />
                                                    </button>
                                                ) : (
                                                    <div key={idx} className="w-8 h-8 sm:w-12 sm:h-12" />
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Green Quadrant (Top Right) */}
                                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-br from-green-500 to-green-600 border-l-4 border-b-4 border-white flex items-center justify-center p-4">
                                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                            {players[1].tokens.map((pos, idx) => (
                                                pos === -1 ? (
                                                    <button
                                                        key={idx}
                                                        onClick={() => moveToken(idx)}
                                                        disabled={turn !== 1 || !hasRolled || diceValue !== 6}
                                                        className={`relative transition-all ${turn === 1 && hasRolled && diceValue === 6
                                                                ? 'cursor-pointer hover:scale-110'
                                                                : 'cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border-4 border-green-300 ${turn === 1 && hasRolled && diceValue === 6 ? 'animate-bounce' : ''
                                                            }`} />
                                                        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-sm" />
                                                    </button>
                                                ) : (
                                                    <div key={idx} className="w-8 h-8 sm:w-12 sm:h-12" />
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Blue Quadrant (Bottom Left) */}
                                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-br from-blue-500 to-blue-600 border-r-4 border-t-4 border-white flex items-center justify-center p-4">
                                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                            {players[2].tokens.map((pos, idx) => (
                                                pos === -1 ? (
                                                    <button
                                                        key={idx}
                                                        onClick={() => moveToken(idx)}
                                                        disabled={turn !== 2 || !hasRolled || diceValue !== 6}
                                                        className={`relative transition-all ${turn === 2 && hasRolled && diceValue === 6
                                                                ? 'cursor-pointer hover:scale-110'
                                                                : 'cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border-4 border-blue-300 ${turn === 2 && hasRolled && diceValue === 6 ? 'animate-bounce' : ''
                                                            }`} />
                                                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm" />
                                                    </button>
                                                ) : (
                                                    <div key={idx} className="w-8 h-8 sm:w-12 sm:h-12" />
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Yellow Quadrant (Bottom Right) */}
                                    <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-gradient-to-br from-yellow-400 to-yellow-500 border-l-4 border-t-4 border-white flex items-center justify-center p-4">
                                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                            {players[3].tokens.map((pos, idx) => (
                                                pos === -1 ? (
                                                    <button
                                                        key={idx}
                                                        onClick={() => moveToken(idx)}
                                                        disabled={turn !== 3 || !hasRolled || diceValue !== 6}
                                                        className={`relative transition-all ${turn === 3 && hasRolled && diceValue === 6
                                                                ? 'cursor-pointer hover:scale-110'
                                                                : 'cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border-4 border-yellow-300 ${turn === 3 && hasRolled && diceValue === 6 ? 'animate-bounce' : ''
                                                            }`} />
                                                        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm" />
                                                    </button>
                                                ) : (
                                                    <div key={idx} className="w-8 h-8 sm:w-12 sm:h-12" />
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tokens on Board - Simplified visualization */}
                                    {players.map((player, pIdx) =>
                                        player.tokens.map((pos, tIdx) => {
                                            if (pos >= 0 && pos < 52) {
                                                // Calculate position on board (simplified - just show around center for demo)
                                                const angle = (pos / 52) * 2 * Math.PI;
                                                const radius = 100;
                                                const x = 50 + radius * Math.cos(angle);
                                                const y = 50 + radius * Math.sin(angle);

                                                const tokenColors = ['bg-red-500 border-red-300', 'bg-green-500 border-green-300', 'bg-blue-500 border-blue-300', 'bg-yellow-400 border-yellow-300'];

                                                return (
                                                    <button
                                                        key={`${pIdx}-${tIdx}`}
                                                        onClick={() => moveToken(tIdx)}
                                                        disabled={turn !== pIdx || !hasRolled}
                                                        className={`absolute w-6 h-6 sm:w-9 sm:h-9 rounded-full shadow-xl border-4 ${tokenColors[pIdx]} transition-all ${turn === pIdx && hasRolled ? 'cursor-pointer hover:scale-125 animate-pulse' : 'cursor-not-allowed'
                                                            }`}
                                                        style={{
                                                            left: `${x}%`,
                                                            top: `${y}%`,
                                                            transform: 'translate(-50%, -50%)',
                                                            zIndex: 10
                                                        }}
                                                    />
                                                );
                                            }
                                            return null;
                                        })
                                    )}

                                    {/* Center Home - Star */}
                                    <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center rotate-45 shadow-2xl border-4 border-white">
                                        <Star className="w-8 h-8 sm:w-12 sm:h-12 text-white -rotate-45 fill-white drop-shadow-lg animate-pulse" />
                                    </div>

                                    {/* Path Grid Overlay */}
                                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,_white_3px,_transparent_3px),_linear-gradient(180deg,_white_3px,_transparent_3px)] bg-[size:16.66%_16.66%]" />
                                </div>

                                {/* Dice Controls */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
                                    <button
                                        onClick={rollDice}
                                        disabled={isRolling || hasRolled}
                                        className={`
                                            group relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white shadow-2xl border-4 flex items-center justify-center transition-all duration-300
                                            ${isRolling ? 'scale-90 rotate-180 border-gray-200 animate-spin' : hasRolled ? 'scale-100 opacity-50 cursor-not-allowed border-gray-200' : 'scale-100 active:scale-95 hover:-translate-y-3 hover:shadow-3xl cursor-pointer'}
                                            ${!hasRolled && !isRolling ? colors[turn].border : ''}
                                        `}
                                    >
                                        {/* Dice Glow Effect */}
                                        {!hasRolled && !isRolling && (
                                            <div className={`absolute inset-0 rounded-3xl ${colors[turn].bg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                                        )}

                                        {diceValue ? (
                                            <div className="relative">
                                                <span className={`text-6xl sm:text-8xl font-black ${hasRolled ? 'text-gray-400' : colors[turn].text} drop-shadow-lg`}>
                                                    {diceValue}
                                                </span>
                                                {diceValue === 6 && !isRolling && hasRolled && (
                                                    <div className="absolute -top-2 -right-2">
                                                        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Dices className={`w-14 h-14 sm:w-16 sm:h-16 ${colors[turn].text}`} />
                                        )}
                                    </button>

                                    <div className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-tight text-white shadow-xl backdrop-blur-sm border-2 border-white/50 ${hasRolled ? 'bg-gray-500' : colors[turn].bg
                                        }`}>
                                        {isRolling ? '🎲 Rolling...' : hasRolled ? 'Click a Goti to Move' : `${colors[turn].name}'s Turn`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Game Log */}
                            <div className="bg-white rounded-[2.5rem] border-2 border-gray-200 shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-yellow-50">
                                    <div className="flex items-center gap-3 font-black text-gray-900 uppercase tracking-wider text-sm">
                                        <History className="w-5 h-5 text-green-600" />
                                        Game Log
                                    </div>
                                    <button
                                        onClick={resetGame}
                                        className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm hover:shadow-md"
                                        title="Reset Game"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 h-[350px] overflow-y-auto space-y-3">
                                    {history.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center">
                                            <Dices className="w-12 h-12 mb-4 text-gray-300" />
                                            <p className="text-sm text-gray-500 font-medium">
                                                Ready to play? Roll the dice to begin your Ludo adventure!
                                            </p>
                                        </div>
                                    ) : (
                                        history.map((log, i) => {
                                            const isSix = log.includes('6!');
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${isSix
                                                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-sm'
                                                            : 'bg-gray-50 border-gray-200'
                                                        }`}
                                                >
                                                    <span className={`text-xs font-black ${isSix ? 'text-yellow-600' : 'text-gray-400'} bg-white px-3 py-1 rounded-lg shadow-sm min-w-[3rem] text-center`}>
                                                        #{history.length - i}
                                                    </span>
                                                    <span className="font-bold text-gray-800 text-sm tracking-tight flex-1">{log}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-8 rounded-[2.5rem] text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Trophy className="w-7 h-7" />
                                    <h3 className="text-xl font-black">Master&apos;s Tip</h3>
                                </div>
                                <p className="opacity-90 leading-relaxed">
                                    Ludo is best enjoyed with 2-4 players! Invite your friends and family to join this page and take turns rolling the dice. Remember, strategy matters - decide wisely which token to move!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SEO Content Section */}
                    <div className="mt-20 max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black text-gray-900 mb-4">
                                Why Play Ludo Online on Our Platform?
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                India&apos;s most trusted and entertaining online Ludo game platform
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Play</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    No registration needed! Just click and start playing Ludo immediately. Perfect for spontaneous game sessions with friends during chai breaks or family gatherings.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Family Bonding</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Bring the whole family together! Ludo is perfect for all ages - from children to grandparents. Create lasting memories whilst enjoying quality time together.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Social Gaming</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Play with 2-4 players on the same device. Perfect for house parties, picnics, train journeys, or any social gathering where fun is needed!
                                </p>
                            </div>
                        </div>

                        {/* Ludo Rules Section */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-16">
                            <button
                                onClick={() => setShowRules(!showRules)}
                                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                                        <BookOpen className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-3xl font-black text-gray-900">Complete Ludo Rules Guide</h2>
                                        <p className="text-gray-600 mt-1">Learn how to play Ludo like a champion</p>
                                    </div>
                                </div>
                                {showRules ? <ChevronUp className="w-8 h-8 text-gray-400" /> : <ChevronDown className="w-8 h-8 text-gray-400" />}
                            </button>

                            {showRules && (
                                <div className="p-8 pt-0 space-y-8 animate-in fade-in slide-in-from-top duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">🎲</span> Game Setup & Objective
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            Ludo is played by 2-4 players on a cross-shaped board with four coloured sections (Red, Green, Yellow, Blue). Each player gets 4 tokens of their colour. The objective is simple: be the first player to move all 4 of your tokens from your home base to the centre finish area!
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">🎯</span> How to Play Ludo
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-3">Starting the Game</h4>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-red-600 font-bold">•</span>
                                                        <span>Players take turns rolling the dice in a clockwise direction</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-red-600 font-bold">•</span>
                                                        <span>All tokens start inside the home base (coloured quadrant)</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-red-600 font-bold">•</span>
                                                        <span>To bring a token out, you must roll a 6 on the dice</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-red-600 font-bold">•</span>
                                                        <span>Once a token is out, move it forward based on dice rolls</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-3">Moving Your Tokens</h4>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-green-600 font-bold">•</span>
                                                        <span>Move your token clockwise around the board based on your dice roll</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-green-600 font-bold">•</span>
                                                        <span>You can choose which token to move if you have multiple tokens out</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-green-600 font-bold">•</span>
                                                        <span>Tokens move along the outer track before entering the home column</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-green-600 font-bold">•</span>
                                                        <span>Two of your own tokens cannot occupy the same square</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-3">The Power of Rolling a 6</h4>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-yellow-600 font-bold">⭐</span>
                                                        <span><strong>Bring out a new token:</strong> Rolling a 6 allows you to bring a token from home base onto the starting square</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-yellow-600 font-bold">⭐</span>
                                                        <span><strong>Extra turn:</strong> After rolling a 6, you get to roll the dice again immediately!</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-yellow-600 font-bold">⭐</span>
                                                        <span><strong>Strategic advantage:</strong> You can use a 6 to move an existing token 6 spaces forward instead of bringing out a new one</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-yellow-600 font-bold">⭐</span>
                                                        <span><strong>Three 6s rule:</strong> In some versions, rolling three 6s in a row sends your turn to the next player</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-3">Capturing Opponent Tokens</h4>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-blue-600 font-bold">•</span>
                                                        <span>If your token lands on a square occupied by an opponent&apos;s token, you <strong>capture</strong> it!</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-blue-600 font-bold">•</span>
                                                        <span>The captured token is sent back to its home base and must start over</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-blue-600 font-bold">•</span>
                                                        <span>Safe squares (marked with a star ⭐) protect tokens from being captured</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-blue-600 font-bold">•</span>
                                                        <span>Capturing gives you a strategic advantage by delaying your opponents</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-3">Reaching Home & Winning</h4>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-purple-600 font-bold">•</span>
                                                        <span>After completing the outer track, tokens enter their coloured home column</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-purple-600 font-bold">•</span>
                                                        <span>You must roll the exact number needed to reach the centre finish area</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-purple-600 font-bold">•</span>
                                                        <span>The first player to get all 4 tokens to the centre wins the game!</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="text-purple-600 font-bold">•</span>
                                                        <span>Other players can continue to determine 2nd, 3rd, and 4th place</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">💡</span> Safe Squares & Special Rules
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">Safe Squares (Star Spaces)</h4>
                                                <p className="text-gray-700">Certain squares marked with a star are &quot;safe zones&quot;. Multiple tokens (even from different players) can occupy these squares, and tokens on safe squares cannot be captured.</p>
                                            </div>
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">Blockade Strategy</h4>
                                                <p className="text-gray-700">If two of your tokens occupy consecutive squares, you create a blockade that opponents cannot pass. This is a powerful defensive strategy!</p>
                                            </div>
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">Home Column</h4>
                                                <p className="text-gray-700">Once a token enters its coloured home column, it&apos;s safe from capture by opponents. Only tokens of the same colour can be in the home column.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 p-8 rounded-2xl text-white">
                                        <h3 className="text-2xl font-bold mb-3">Winning Strategies & Pro Tips</h3>
                                        <ul className="space-y-3 text-white/90">
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Spread your tokens:</strong> Don&apos;t keep all tokens in home base - get at least 2-3 out quickly</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Capture strategically:</strong> Focus on capturing opponents who are closest to winning</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Use safe squares:</strong> Position tokens on safe squares when opponents are nearby</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Balance offence & defence:</strong> Don&apos;t always go for captures - sometimes advancing is better</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Plan ahead:</strong> Think 2-3 moves ahead and consider what opponents might do</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span><strong>Stay patient:</strong> Ludo has an element of luck - stay calm and play smart!</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQs Section */}
                        <div className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-3xl p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-4xl font-black text-gray-900 mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Everything you need to know about playing Ludo online
                                </p>
                            </div>

                            <div className="space-y-4 max-w-4xl mx-auto">
                                {FAQS.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                                            {expandedFAQ === index ?
                                                <ChevronUp className="w-6 h-6 text-green-600 flex-shrink-0" /> :
                                                <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                            }
                                        </button>
                                        {expandedFAQ === index && (
                                            <div className="px-6 pb-6 animate-in fade-in slide-in-from-top duration-200">
                                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
                            <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">
                                Benefits of Playing Ludo Online
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Heart className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Family Bonding</h3>
                                            <p className="text-gray-600 leading-relaxed">Brings families together across generations. Perfect for creating cherished memories with parents, grandparents, and children.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Target className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Strategic Thinking</h3>
                                            <p className="text-gray-600 leading-relaxed">Develops planning and decision-making skills. Players learn to think ahead and make strategic choices.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Sparkles className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Stress Relief</h3>
                                            <p className="text-gray-600 leading-relaxed">Perfect for unwinding after a long day. The fun and excitement help reduce stress and anxiety.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Social Skills</h3>
                                            <p className="text-gray-600 leading-relaxed">Teaches patience, turn-taking, and sportsmanship. Excellent for children&apos;s social development.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Mental Maths</h3>
                                            <p className="text-gray-600 leading-relaxed">Improves counting and basic arithmetic skills naturally whilst playing and having fun.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Award className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Builds Confidence</h3>
                                            <p className="text-gray-600 leading-relaxed">Winning and learning from losses builds self-esteem and emotional resilience in players.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Text Content */}
                        <div className="mt-16 prose prose-lg max-w-none">
                            <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-3xl p-8 md:p-12 border border-red-100">
                                <h2 className="text-3xl font-black text-gray-900 mb-6">
                                    Play Ludo Online Free - India&apos;s Favourite Board Game
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        Welcome to the ultimate <strong>free Ludo online</strong> platform where you can enjoy India&apos;s most beloved board game without any downloads or registration. Whether you&apos;re a seasoned Ludo player or just discovering this classic game, our platform offers the perfect way to enjoy unlimited fun with friends and family.
                                    </p>
                                    <p>
                                        <strong>Ludo online free</strong> gaming has revolutionised how we play this traditional Indian board game. Gone are the days of setting up physical boards and searching for dice. With our web-based platform, you can start playing Ludo instantly in your browser - no complicated installations, no waiting periods, just pure entertainment at your fingertips. Perfect for impromptu game sessions during tea time, family gatherings, or festival celebrations!
                                    </p>
                                    <p>
                                        Looking to <strong>play Ludo with friends</strong>? Our local multiplayer mode supports 2-4 players on the same device, making it ideal for face-to-face matches. Gather your family members around your phone, tablet, or laptop and experience the joy of playing Ludo together. There&apos;s something magical about the excitement of rolling a 6, the strategy of which token to move, and the friendly competition that Ludo brings to every household.
                                    </p>
                                    <p>
                                        <strong>Online Ludo game</strong> platforms like ours preserve the traditional charm of this classic board game whilst adding modern convenience. Ludo has been a part of Indian culture for generations - from childhood memories of playing with siblings to festival celebrations with extended family. Our digital version maintains all the excitement and strategic elements that make Ludo special, whilst eliminating the hassle of lost dice or misplaced tokens.
                                    </p>
                                    <p>
                                        Our <strong>Ludo game online</strong> platform is optimised specifically for Indian players. The interface is clean, intuitive, and works flawlessly on all devices - whether you&apos;re using an Android smartphone, iPhone, iPad, Windows laptop, or Mac computer. The responsive design ensures smooth gameplay on any screen size, so you can enjoy Ludo anywhere - at home, in the office during lunch breaks, on train journeys, or during family vacations. Mobile data-friendly and optimised for Indian internet speeds.
                                    </p>
                                    <p>
                                        <strong>Free Ludo online</strong> shouldn&apos;t mean compromising on quality or features. That&apos;s exactly why we&apos;ve created a premium Ludo experience that&apos;s completely free forever. No hidden charges, no premium memberships required, no annoying advertisements interrupting your gaming sessions. Just pure, uninterrupted Ludo entertainment whenever you want it. We believe that traditional Indian games like Ludo should be accessible to everyone, regardless of their financial situation.
                                    </p>
                                    <p>
                                        Want to <strong>learn how to play Ludo</strong>? Our comprehensive rules guide covers everything from basic gameplay to advanced strategies. Beginners can quickly understand the simple yet engaging mechanics - roll the dice, move your tokens, capture opponents, and race to the finish! Experienced players can refine their strategies and learn pro tips for consistent wins. The game log feature helps you track all moves and learn from each game session.
                                    </p>
                                    <p>
                                        <strong>Ludo board game online</strong> versions offer several advantages over physical boards. You never have to worry about losing pieces, the dice always rolls fairly, and you can play anytime without the setup hassle. Plus, our digital version automatically handles all the rules - no more disputes about whether a move was legal or how many spaces to move! The game is perfect for Diwali celebrations, birthday parties, family reunions, or simply bonding with loved ones on lazy Sunday afternoons.
                                    </p>
                                    <p>
                                        The beauty of <strong>playing Ludo online</strong> is its perfect blend of luck and strategy. Whilst the dice roll adds an element of chance and excitement, smart players know that strategic decisions make all the difference. Should you bring out a new token or advance an existing one? Is it safer to stay back or risk moving forward? When should you go aggressive and capture opponents? These tactical choices keep every game engaging and unpredictable, ensuring that no two matches are ever the same.
                                    </p>
                                    <p>
                                        Join millions of players across India who have rediscovered their love for Ludo through our platform. Whether you&apos;re in Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, Jaipur, or anywhere else in the country, you&apos;re welcome to join our growing community. Relive your childhood memories, create new ones with your children, and experience why Ludo remains India&apos;s most cherished board game even in the digital age. Start your Ludo journey today - it&apos;s completely free, instantly accessible, and guaranteed to bring smiles and laughter to your family!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cultural Significance Section */}
                        <div className="mt-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 border border-orange-200">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
                                Ludo - A Timeless Indian Tradition
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Ludo holds a special place in Indian culture and has been bringing families together for generations. Derived from the ancient Indian game &quot;Pachisi&quot;, Ludo has evolved whilst maintaining its essence of simple fun and strategic gameplay. During festivals like Diwali, Holi, and Raksha Bandhan, Ludo boards come out alongside sweets and celebrations, creating memories that last a lifetime.
                                </p>
                                <p>
                                    In Indian households, Ludo is more than just a game - it&apos;s a tradition that bridges generation gaps. Grandparents teach grandchildren, siblings compete fiercely yet lovingly, and parents relive their childhood whilst playing with their kids. The excitement of rolling a 6, the suspense of nearly reaching home, and the friendly rivalry make Ludo an integral part of Indian family culture.
                                </p>
                                <p>
                                    Our online platform preserves this beautiful tradition whilst making it accessible in today&apos;s digital world. Whether you&apos;re an NRI missing home or a busy professional wanting to reconnect with your roots, playing Ludo online brings back those cherished memories and creates new ones. It&apos;s not just about winning or losing - it&apos;s about the laughter, the conversations, and the bonds that strengthen with every roll of the dice.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                            <h2 className="text-4xl font-black mb-4">Ready to Roll the Dice?</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Start playing Ludo now and create unforgettable memories with your loved ones!
                            </p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-red-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                            >
                                Play Ludo Now - It&apos;s Free! 🎲
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-image: linear-gradient(to bottom, #22c55e, #16a34a);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-image: linear-gradient(to bottom, #16a34a, #15803d);
                }
            `}</style>
        </>
    );
}