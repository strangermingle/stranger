"use client";

import { EventImage } from "@/lib/events";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowLeft } from "lucide-react";

export default function EventGallery({ images }: { images: EventImage[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    const handlePrev = () => setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    const handleNext = () => setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    const handleClose = () => setActiveIndex(null);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        if (activeIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [activeIndex, images.length]);

    return (
        <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Event Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {images.slice(0, 8).map((img, index) => (
                    <div 
                        key={img.id} 
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-gray-100 border border-gray-100"
                        onClick={() => setActiveIndex(index)}
                    >
                        <Image sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px" 
                            src={img.image_url} 
                            alt={img.alt_text || "Event image"} 
                            fill 
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        {index === 7 && images.length > 8 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg">
                                +{images.length - 8}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <Maximize2 className="absolute top-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            {/* Lightbox / Fullscreen Modal */}
            {activeIndex !== null && (
                <div 
                    className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Top Bar for Close/Back */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[10002]">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all group font-bold"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Go Back</span>
                        </button>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            aria-label="Close gallery"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }} 
                        className="absolute left-4 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[10002]"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <div 
                        className="relative w-full max-w-5xl aspect-video md:aspect-[16/10] lg:aspect-[3/2]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image sizes="(max-width: 1024px) 100vw, 1024px" 
                            src={images[activeIndex].image_url} 
                            alt={images[activeIndex].alt_text || "Full event image"} 
                            fill 
                            className="object-contain"
                            priority
                        />
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }} 
                        className="absolute right-4 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[10002]"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <div className="absolute bottom-6 text-white text-sm font-medium">
                        {activeIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </section>
    );
}
