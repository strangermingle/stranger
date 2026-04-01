'use client';

import { useState, useEffect } from 'react';
import MembershipForm from './MembershipForm';
import { X } from 'lucide-react';

interface MembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export default function MembershipModal({ isOpen, onClose, title = 'Apply for Membership' }: MembershipModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'auto';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />
            
            <div className={`relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
                <div className="absolute top-6 right-6">
                    <button 
                        onClick={onClose}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-2xl flex items-center justify-center transition-all active:scale-90"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-8 md:p-12">
                    <div className="mb-10 text-center md:text-left">
                        <div className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                            Premimum Members
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-500 font-medium max-w-xl">
                            Provide your details below to express interest in the Stranger Mingle community.
                        </p>
                    </div>
                    
                    <div className="bg-gray-50/50 p-6 md:p-10 rounded-[2rem] border border-gray-100">
                        <MembershipForm onSuccess={onClose} source="login_apply_modal" />
                    </div>
                </div>
            </div>
        </div>
    );
}
