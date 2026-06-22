'use client';

import Image from "next/image";
import { sendGAEvent } from "@/lib/gtag";

export default function SocialMediaQRSection() {
  const trackClick = (platform: string) => {
    sendGAEvent({
      action: 'qr_code_click',
      category: 'social_link',
      label: `Homepage QR Section: ${platform}`
    });
  };

  return (
    <section className="w-full bg-linear-to-b from-blue-50 to-white py-20 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Join Our Community
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect With Us <br className="hidden sm:block" /> Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mb-8 leading-relaxed">
            Be the first to know about new meetups, weekend events, and exclusive community news. Join our official channels.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="https://whatsapp.com/channel/0029Vb6lxh0L7UVX9VPXiM3U"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('WhatsApp Join Button')}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-green-200"
            >
              Join Channel
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
            </a>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-6 justify-center w-full max-w-md mx-auto md:max-w-none md:mx-0">
          {/* WhatsApp */}
          <div className="relative group p-2 bg-white rounded-2xl shadow-xl border border-gray-100 transition-transform hover:-translate-y-2">
            <a
              href="https://whatsapp.com/channel/0029Vb6lxh0L7UVX9VPXiM3U"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('WhatsApp')}
              className="block relative"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-green-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl overflow-hidden aspect-square">
                <Image sizes="(max-width: 480px) 50vw, 224px"
                  src="/whatsapp.jpg"
                  alt="WhatsApp Channel QR Code"
                  fill
                  className="object-cover p-1"
                  unoptimized
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-bold text-gray-700">WhatsApp</p>
              </div>
            </a>
          </div>

          {/* Instagram */}
          <div className="relative group p-2 bg-white rounded-2xl shadow-xl border border-gray-100 transition-transform hover:-translate-y-2">
            <a
              href="https://www.instagram.com/strangermingle/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('Instagram')}
              className="block relative"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl overflow-hidden aspect-square">
                <Image sizes="(max-width: 480px) 50vw, 224px"
                  src="/instagram.jpg"
                  alt="Instagram QR Code"
                  fill
                  className="object-cover p-1"
                  unoptimized
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-bold text-gray-700">Instagram</p>
              </div>
            </a>
          </div>

          {/* Facebook */}
          <div className="relative group p-2 bg-white rounded-2xl shadow-xl border border-gray-100 transition-transform hover:-translate-y-2">
            <a
              href="https://www.facebook.com/strangermingle"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('Facebook')}
              className="block relative"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl overflow-hidden aspect-square">
                <Image sizes="(max-width: 480px) 50vw, 224px"
                  src="/facebook.jpg"
                  alt="Facebook QR Code"
                  fill
                  className="object-cover p-1"
                  unoptimized
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-bold text-gray-700">Facebook</p>
              </div>
            </a>
          </div>

          {/* Reddit */}
          <div className="relative group p-2 bg-white rounded-2xl shadow-xl border border-gray-100 transition-transform hover:-translate-y-2">
            <a
              href="https://reddit.com/r/StrangerMingle"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('Reddit')}
              className="block relative"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl overflow-hidden aspect-square">
                <Image sizes="(max-width: 480px) 50vw, 224px"
                  src="/reddit.jpg"
                  alt="Reddit QR Code"
                  fill
                  className="object-cover p-1"
                  unoptimized
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-bold text-gray-700">Reddit</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
