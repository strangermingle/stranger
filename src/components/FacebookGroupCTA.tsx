import Link from 'next/link';
import { Users } from 'lucide-react';

export default function FacebookGroupCTA() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 mb-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-6 shadow-xl border border-blue-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-[12px] font-bold uppercase tracking-widest mb-2">
            <Users className="w-4 h-4" />
            Members Only
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-[20px] mb-2 leading-tight">
            Join Our Private Facebook Group
          </h2>
          <p className="text-blue-100 text-[12px] sm:text-xl font-medium leading-relaxed mb-2 max-w-2xl">
            Want to see who's coming to the next event? Join our private Facebook community to connect with other members, plan pre-meetups, and stay in touch after the events!
          </p>
          <a 
            href="https://www.facebook.com/groups/strangermingle" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl font-bold text-[16px] transition-all hover:scale-105 shadow-xl group"
          >
            Join Facebook Group
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
