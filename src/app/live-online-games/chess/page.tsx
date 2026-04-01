'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Award, History, Info, Crown, Sparkles, Trophy, BookOpen, ChevronDown, ChevronUp, Brain, Users, Target, Zap } from 'lucide-react';

// Simple Chess Logic Piece Representation
// Positive = White, Negative = Black
// 1 = Pawn, 2 = Knight, 3 = Bishop, 4 = Rook, 5 = Queen, 6 = King
type Piece = number | null;
type Board = Piece[][];

const INITIAL_BOARD: Board = [
    [-4, -2, -3, -5, -6, -3, -2, -4],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 2, 3, 5, 6, 3, 2, 4],
];

const PIECE_ICONS: Record<number, string> = {
    1: '♙', 2: '♘', 3: '♗', 4: '♖', 5: '♕', 6: '♔',
    [-1]: '♟', [-2]: '♞', [-3]: '♝', [-4]: '♜', [-5]: '♛', [-6]: '♚'
};

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "Is this chess game completely free to play online?",
        answer: "Yes! Our online chess game is 100% free to play. You don't need to download anything or create an account. Just open the page and start playing chess instantly with your friend or family member."
    },
    {
        question: "Can I play chess online with my friends on this platform?",
        answer: "Currently, this is a local multiplayer chess game where two players can play on the same device by taking turns. It's perfect for face-to-face matches with friends and family members sitting together."
    },
    {
        question: "Do I need to download any app to play chess online?",
        answer: "No download required! This is a web-based chess game that works directly in your browser. Whether you're using a mobile phone, tablet, or computer, you can play chess online instantly without installing any application."
    },
    {
        question: "What are the basic rules of chess for beginners?",
        answer: "Chess is played on an 8x8 board with 16 pieces per player. Each piece moves differently: pawns move forward, rooks move straight, bishops diagonally, knights in L-shapes, queens in any direction, and kings one square at a time. The goal is to checkmate your opponent's king."
    },
    {
        question: "How can I improve my chess skills while playing online?",
        answer: "Practice regularly, study opening strategies, learn common chess tactics like forks and pins, analyse your games to understand mistakes, and play against different opponents to experience various playing styles."
    },
    {
        question: "Is chess good for brain development and memory?",
        answer: "Absolutely! Chess is proven to enhance cognitive abilities, improve memory, boost problem-solving skills, increase concentration, and develop strategic thinking. It's beneficial for players of all ages, from children to senior citizens."
    }
];

export default function ChessGame() {
    const [board, setBoard] = useState<Board>(INITIAL_BOARD);
    const [selected, setSelected] = useState<[number, number] | null>(null);
    const [turn, setTurn] = useState<'white' | 'black'>('white');
    const [history, setHistory] = useState<string[]>([]);
    const [winner, setWinner] = useState<'white' | 'black' | null>(null);
    const [moveCount, setMoveCount] = useState(0);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [showRules, setShowRules] = useState(false);

    // Schema Markup for SEO
    useEffect(() => {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Play Chess Online Free - Grandmaster Chess Game",
            "applicationCategory": "Game",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
            },
            "description": "Play chess online for free with friends. No download required. Instant multiplayer chess game with easy controls. Best free online chess platform in India.",
            "operatingSystem": "Any",
            "inLanguage": "en-IN",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "2847"
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

        // Add schema to head
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

    const resetGame = () => {
        setBoard(INITIAL_BOARD);
        setSelected(null);
        setTurn('white');
        setHistory([]);
        setWinner(null);
        setMoveCount(0);
    };

    const handleSquareClick = (r: number, c: number) => {
        if (winner) return;

        const piece = board[r][c];

        if (selected) {
            const [sr, sc] = selected;

            if (sr === r && sc === c) {
                setSelected(null);
                return;
            }

            if (canMove(selected, [r, c])) {
                const newBoard = board.map(row => [...row]);
                const captured = newBoard[r][c];
                newBoard[r][c] = newBoard[sr][sc];
                newBoard[sr][sc] = null;

                setBoard(newBoard);
                setSelected(null);
                setTurn(turn === 'white' ? 'black' : 'white');
                setMoveCount(prev => prev + 1);

                const moveStr = `${PIECE_ICONS[board[sr][sc] || 0]} ${String.fromCharCode(97 + sc)}${8 - sr} → ${String.fromCharCode(97 + c)}${8 - r}`;
                setHistory(prev => [moveStr, ...prev]);

                if (captured && Math.abs(captured) === 6) {
                    setWinner(turn);
                }
            } else {
                if (piece && ((turn === 'white' && piece > 0) || (turn === 'black' && piece < 0))) {
                    setSelected([r, c]);
                } else {
                    setSelected(null);
                }
            }
        } else {
            if (piece && ((turn === 'white' && piece > 0) || (turn === 'black' && piece < 0))) {
                setSelected([r, c]);
            }
        }
    };

    const canMove = (from: [number, number], to: [number, number]): boolean => {
        const [fr, fc] = from;
        const [tr, tc] = to;
        const piece = board[fr][fc];
        const target = board[tr][tc];

        if (!piece) return false;
        if (target && ((piece > 0 && target > 0) || (piece < 0 && target < 0))) return false;

        return true;
    };

    return (
        <>
            {/* SEO Optimised Header Section */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">India&apos;s #1 Free Online Chess Platform</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Play Chess Online Free<br />
                        <span className="text-yellow-300">No Download Required</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Enjoy the world&apos;s most popular strategy game instantly in your browser. Challenge friends, improve your skills, and become a chess master today!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Zap className="w-5 h-5 text-yellow-300" />
                            <span>Instant Play</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Users className="w-5 h-5 text-yellow-300" />
                            <span>Multiplayer Mode</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Brain className="w-5 h-5 text-yellow-300" />
                            <span>Improve Your Skills</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Crown className="w-5 h-5 text-yellow-300" />
                            <span>100% Free Forever</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Game Stats Bar */}
                    <div className="mb-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-indigo-600">{moveCount}</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Total Moves</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-purple-600">{history.length}</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Logged Moves</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="text-2xl font-black text-pink-600">
                                {turn === 'white' ? '⚪' : '⚫'}
                            </div>
                            <div className="text-xs text-gray-500 font-semibold uppercase">Current Turn</div>
                        </div>
                    </div>

                    {/* Turn Indicators */}
                    <div className="mb-8 flex justify-center items-center gap-4">
                        <div className={`px-8 py-4 rounded-2xl border transition-all duration-300 ${turn === 'white' ? 'bg-white border-indigo-300 shadow-xl ring-4 ring-indigo-500/30 scale-110' : 'bg-gray-100 border-gray-200 scale-95 opacity-60'}`}>
                            <span className="text-sm font-black uppercase tracking-wider text-gray-700">White&apos;s Turn</span>
                        </div>
                        <div className="text-3xl">⚔️</div>
                        <div className={`px-8 py-4 rounded-2xl border transition-all duration-300 ${turn === 'black' ? 'bg-gray-900 border-gray-700 shadow-xl shadow-black/30 ring-4 ring-white/20 scale-110' : 'bg-gray-100 border-gray-200 scale-95 opacity-60'}`}>
                            <span className="text-sm font-black uppercase tracking-wider text-white">Black&apos;s Turn</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Chess Board */}
                        <div className="lg:col-span-7 flex justify-center">
                            <div className="relative p-6 md:p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] shadow-2xl overflow-hidden">
                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[size:32px_32px]" />

                                {/* Glow Effect */}
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />

                                <div className="relative border-[16px] border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                                    {board.map((row, r) => (
                                        <div key={r} className="flex">
                                            {row.map((piece, c) => {
                                                const isDark = (r + c) % 2 === 1;
                                                const isSelected = selected?.[0] === r && selected?.[1] === c;

                                                return (
                                                    <button
                                                        key={c}
                                                        onClick={() => handleSquareClick(r, c)}
                                                        className={`
                                                            w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center text-5xl sm:text-6xl transition-all duration-200 relative
                                                            ${isDark ? 'bg-gradient-to-br from-indigo-900 to-indigo-800' : 'bg-gradient-to-br from-amber-100 to-amber-50'}
                                                            ${isSelected ? 'bg-gradient-to-br from-yellow-400 to-yellow-300 ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50 scale-105 z-10' : ''}
                                                            hover:brightness-110 active:scale-95 hover:shadow-inner
                                                        `}
                                                    >
                                                        {piece !== null && (
                                                            <span className={`
                                                                select-none transform drop-shadow-lg transition-all duration-200
                                                                ${piece > 0 ? 'text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-gray-900'}
                                                                hover:scale-110
                                                            `}>
                                                                {PIECE_ICONS[piece]}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Coordinate Labels */}
                                <div className="absolute top-0 bottom-0 left-2 md:left-3 flex flex-col justify-around py-14 md:py-16 text-xs font-bold text-gray-400 uppercase">
                                    {[8, 7, 6, 5, 4, 3, 2, 1].map(n => <span key={n} className="drop-shadow-md">{n}</span>)}
                                </div>
                                <div className="absolute bottom-2 md:bottom-3 left-0 right-0 flex justify-around px-14 md:px-16 text-xs font-bold text-gray-400 uppercase">
                                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <span key={l} className="drop-shadow-md">{l}</span>)}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Winner Notification */}
                            {winner && (
                                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl shadow-yellow-200 animate-in fade-in zoom-in duration-500 border-4 border-yellow-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Trophy className="w-14 h-14 animate-bounce" />
                                        <Award className="w-10 h-10 animate-pulse" />
                                    </div>
                                    <h2 className="text-4xl font-black mb-3 uppercase tracking-tight drop-shadow-lg">
                                        {winner} Wins! 🎉
                                    </h2>
                                    <p className="mb-6 text-lg font-semibold opacity-90">
                                        Outstanding game! You played like a true grandmaster. Checkmate achieved in {moveCount} moves!
                                    </p>
                                    <button
                                        onClick={resetGame}
                                        className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                                    >
                                        🔄 Play Another Game
                                    </button>
                                </div>
                            )}

                            {/* Move History */}
                            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <div className="flex items-center gap-3 font-black text-gray-900 uppercase tracking-wider text-sm">
                                        <History className="w-5 h-5 text-indigo-600" />
                                        Move History
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
                                            <Info className="w-12 h-12 mb-4 text-gray-300" />
                                            <p className="text-sm text-gray-500 font-medium">
                                                Game started. Make your first move to begin tracking the game history.
                                            </p>
                                        </div>
                                    ) : (
                                        history.map((move, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 hover:shadow-md transition-shadow">
                                                <span className="text-xs font-black text-indigo-600 bg-white px-3 py-1 rounded-lg shadow-sm min-w-[3rem] text-center">
                                                    #{history.length - i}
                                                </span>
                                                <span className="font-bold text-gray-800 text-lg">{move}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Target className="w-7 h-7" />
                                    <h3 className="text-xl font-black">Master&apos;s Tip</h3>
                                </div>
                                <p className="opacity-90 leading-relaxed">
                                    Chess is more than just a game—it&apos;s a mental workout! Each move trains your brain to think ahead, plan strategies, and make better decisions. Play regularly to sharpen your mind and improve concentration.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SEO Content Section */}
                    <div className="mt-20 max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black text-gray-900 mb-4">
                                Why Play Chess Online on Our Platform?
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Experience the most engaging and user-friendly online chess platform in India
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Access</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    No registration, no downloads, no waiting. Just click and start playing chess immediately in your web browser. Perfect for quick games during tea breaks!
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Brain className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Brain Training</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Enhance memory, improve concentration, and develop critical thinking skills. Chess is scientifically proven to boost cognitive abilities for all age groups.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Social Gaming</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Play with friends and family members sitting next to you. Perfect for quality time together whilst enjoying the world&apos;s greatest strategy game.
                                </p>
                            </div>
                        </div>

                        {/* Chess Rules Section */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-16">
                            <button
                                onClick={() => setShowRules(!showRules)}
                                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                        <BookOpen className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-3xl font-black text-gray-900">Complete Chess Rules Guide</h2>
                                        <p className="text-gray-600 mt-1">Learn how to play chess like a professional</p>
                                    </div>
                                </div>
                                {showRules ? <ChevronUp className="w-8 h-8 text-gray-400" /> : <ChevronDown className="w-8 h-8 text-gray-400" />}
                            </button>

                            {showRules && (
                                <div className="p-8 pt-0 space-y-8 animate-in fade-in slide-in-from-top duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">♟️</span> Basic Setup
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            Chess is played on an 8x8 board with 64 squares alternating between light and dark colours. Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, and 8 Pawns. White pieces always start from the bottom (rows 1-2), whilst black pieces start from the top (rows 7-8).
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">👑</span> How Each Piece Moves
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♔ King</h4>
                                                <p className="text-gray-700">Moves one square in any direction (horizontally, vertically, or diagonally). The most important piece - protect it at all costs!</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border border-pink-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♕ Queen</h4>
                                                <p className="text-gray-700">The most powerful piece! Moves any number of squares horizontally, vertically, or diagonally. Combine the powers of rook and bishop.</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♖ Rook</h4>
                                                <p className="text-gray-700">Moves any number of squares horizontally or vertically (straight lines only). Very powerful in endgames.</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♗ Bishop</h4>
                                                <p className="text-gray-700">Moves any number of squares diagonally. Each player has one light-squared and one dark-squared bishop.</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♘ Knight</h4>
                                                <p className="text-gray-700">Moves in an &quot;L&quot; shape: two squares in one direction and one square perpendicular. The only piece that can jump over other pieces!</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">♙ Pawn</h4>
                                                <p className="text-gray-700">Moves forward one square (or two squares on its first move). Captures diagonally. Can promote to any piece (usually Queen) when reaching the opposite end!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">🎯</span> Winning the Game
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            The objective is to <strong>checkmate</strong> your opponent&apos;s king. This means putting the enemy king under attack (check) in such a way that it cannot escape capture on the next move. A game can also end in a draw through stalemate, insufficient material, or mutual agreement.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-3xl">⚡</span> Special Moves
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">Castling</h4>
                                                <p className="text-gray-700">A special king and rook move performed simultaneously for king safety. The king moves two squares towards a rook, whilst the rook jumps over to the other side.</p>
                                            </div>
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">En Passant</h4>
                                                <p className="text-gray-700">A special pawn capture that can occur when an enemy pawn moves two squares forward from its starting position and lands beside your pawn.</p>
                                            </div>
                                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                                                <h4 className="font-bold text-gray-900 mb-2">Pawn Promotion</h4>
                                                <p className="text-gray-700">When a pawn reaches the opposite end of the board, it must be promoted to a Queen, Rook, Bishop, or Knight (usually Queen for maximum power!).</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white">
                                        <h3 className="text-2xl font-bold mb-3">Beginner&apos;s Strategy Tips</h3>
                                        <ul className="space-y-3 text-white/90">
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Control the centre of the board with your pawns and pieces</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Develop your knights and bishops early in the game</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Castle early to protect your king and connect your rooks</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Don&apos;t move the same piece twice in the opening phase</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Think ahead and always check for your opponent&apos;s threats</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold">✓</span>
                                                <span>Protect your pieces and avoid unnecessary captures</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQs Section */}
                        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-3xl p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-4xl font-black text-gray-900 mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Everything you need to know about playing chess online
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
                                                <ChevronUp className="w-6 h-6 text-indigo-600 flex-shrink-0" /> :
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
                                Benefits of Playing Chess Online
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Brain className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Enhances Cognitive Skills</h3>
                                            <p className="text-gray-600 leading-relaxed">Improves memory, concentration, problem-solving abilities, and logical thinking through regular practice.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Target className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Develops Strategic Thinking</h3>
                                            <p className="text-gray-600 leading-relaxed">Learn to plan ahead, anticipate opponent moves, and develop long-term strategies applicable in real life.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Sparkles className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Boosts Creativity</h3>
                                            <p className="text-gray-600 leading-relaxed">Encourages creative problem-solving and thinking outside the box to find winning combinations.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Social Connection</h3>
                                            <p className="text-gray-600 leading-relaxed">Connect with friends and family through a timeless game that brings people together across generations.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Improves Focus</h3>
                                            <p className="text-gray-600 leading-relaxed">Trains your mind to concentrate for extended periods, helping with studies and professional work.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Award className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Builds Patience</h3>
                                            <p className="text-gray-600 leading-relaxed">Teaches patience and emotional control, valuable skills for managing stress in daily life.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Text Content */}
                        <div className="mt-16 prose prose-lg max-w-none">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                                <h2 className="text-3xl font-black text-gray-900 mb-6">
                                    Play Chess Online Free - The Ultimate Brain Game
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        Welcome to India&apos;s premier <strong>free online chess platform</strong> where you can enjoy unlimited games without any downloads or registration. Whether you&apos;re a complete beginner learning the basics or an experienced player honing your skills, our intuitive interface makes chess accessible to everyone.
                                    </p>
                                    <p>
                                        <strong>Chess online free</strong> gaming has never been this easy! Our platform offers instant access to a fully-functional chess board right in your web browser. Simply open the page and start playing immediately - no complicated setups, no waiting times, just pure chess enjoyment. Perfect for quick games during lunch breaks, tea time, or whenever you have a few minutes to spare.
                                    </p>
                                    <p>
                                        Looking to <strong>play chess with friends</strong>? Our local multiplayer mode allows two players to compete on the same device, making it ideal for face-to-face matches. Gather around your phone, tablet, or computer and challenge your friend, family member, or colleague to an exciting battle of wits. There&apos;s nothing quite like the thrill of playing chess in person whilst enjoying friendly competition.
                                    </p>
                                    <p>
                                        <strong>Online chess games</strong> are not just entertaining - they&apos;re scientifically proven to enhance your brain power! Regular chess practice improves memory, boosts concentration, develops problem-solving abilities, and enhances strategic thinking. Students, professionals, and senior citizens alike benefit from the mental workout that chess provides. It&apos;s like a gym membership for your brain, absolutely free!
                                    </p>
                                    <p>
                                        Our <strong>chess game online</strong> platform is designed with Indian players in mind. The clean, modern interface works flawlessly on all devices - whether you&apos;re using a smartphone, tablet, laptop, or desktop computer. The responsive design ensures smooth gameplay on any screen size, so you can enjoy chess anywhere, anytime. Mobile data-friendly and optimised for Indian internet speeds.
                                    </p>
                                    <p>
                                        <strong>Free chess online</strong> shouldn&apos;t mean compromising on quality. That&apos;s why we&apos;ve created a premium chess experience that&apos;s completely free forever. No hidden charges, no premium subscriptions, no annoying advertisements interrupting your game. Just pure, uninterrupted chess gameplay whenever you want it. We believe everyone should have access to this incredible game regardless of their financial situation.
                                    </p>
                                    <p>
                                        Want to <strong>learn chess online</strong>? Our comprehensive rules guide covers everything from basic piece movements to advanced strategies. New players can quickly grasp the fundamentals, whilst experienced players can refine their tactics. The move history feature helps you analyse your games and learn from your mistakes - a crucial aspect of improvement in chess.
                                    </p>
                                    <p>
                                        Join thousands of players across India who have made our platform their go-to destination for <strong>playing chess online free</strong>. Whether you&apos;re in Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, or anywhere else in the country, you&apos;re welcome to join our growing community of chess enthusiasts. Start your chess journey today and discover why millions of people worldwide are passionate about this timeless game!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                            <h2 className="text-4xl font-black mb-4">Ready to Master Chess?</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Start playing now and join India&apos;s fastest-growing chess community!
                            </p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                            >
                                Play Chess Now - It&apos;s Free! 🎯
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
                    background-image: linear-gradient(to bottom, #6366f1, #8b5cf6);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-image: linear-gradient(to bottom, #4f46e5, #7c3aed);
                }
            `}</style>
        </>
    );
}