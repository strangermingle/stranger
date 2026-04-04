'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Plus, Users, Layout, Shield, MapPin, Tag, ChevronDown, Check, Loader2, Globe, Camera, Image as ImageIcon } from 'lucide-react';
import { callRpc } from '@/lib/rpc-client';

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Image Upload State
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Meta Data State
    const [locations, setLocations] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [metaLoading, setMetaLoading] = useState(true);

    // "Create New" State
    const [showNewLocation, setShowNewLocation] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);

    // New Location Form Fields
    const [newLocName, setNewLocName] = useState('');
    const [newLocAddress, setNewLocAddress] = useState('');
    const [newLocCity, setNewLocCity] = useState('');
    const [newLocCountry, setNewLocCountry] = useState('');

    // New Category Form Fields
    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');
    const [newCatColor, setNewCatColor] = useState('#6366f1');

    const fetchMetaData = useCallback(async () => {
        setMetaLoading(true);
        try {
            const locRes = await callRpc('metaService', 'getLocations', []);
            const catRes = await callRpc('metaService', 'getCategories', []);
            if (locRes.success) setLocations(locRes.locations);
            if (catRes.success) setCategories(catRes.categories);
        } catch (err) {
            console.error('Failed to fetch meta data', err);
        } finally {
            setMetaLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchMetaData();
        }
    }, [isOpen, fetchMetaData]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64Data = reader.result as string;
            setBase64Image(base64Data);
            setPreviewUrl(base64Data);
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let finalLocId = selectedLocationId;
            let finalCatId = selectedCategoryId;

            // 1. Create Location if requested
            if (showNewLocation) {
                const locRes = await callRpc('metaService', 'createLocation', [{
                    venue_name: newLocName,
                    address_line1: newLocAddress,
                    city: newLocCity,
                    country: newLocCountry
                }]);
                if (!locRes.success) throw new Error(locRes.error || 'Failed to create location');
                finalLocId = locRes.location.id;
            }

            // 2. Create Category if requested
            if (showNewCategory) {
                const catRes = await callRpc('metaService', 'createCategory', [{
                    name: newCatName,
                    description: newCatDesc,
                    color_hex: newCatColor
                }]);
                if (!catRes.success) throw new Error(catRes.error || 'Failed to create category');
                finalCatId = catRes.category.id;
            }

            // 3. Create Group (Backend will handle icon update if imageUrl is provided)
            // But wait, the createGroup RPC didn't handle base64 image yet.
            // I'll update the RPC call to just include the base64 if I want to do it in one go.
            // Actually, I'll update groupService.ts later if needed, but let's see.
            // For now, I'll call createGroup then uploadGroupImage.
            
            const result = await callRpc('groupService', 'createGroup', [null, name, description, finalLocId || null, finalCatId || null]);
            
            if (result.success) {
                // 4. Upload Image if exists
                if (base64Image) {
                    await callRpc('groupService', 'uploadGroupImage', [null, result.group.id, base64Image]);
                }
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to create group');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative flex justify-between items-start">
                        <div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">Create Local Group</h2>
                            <p className="text-indigo-100 font-medium mt-1">Start a community for like-minded strangers.</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            {error}
                        </div>
                    )}

                    {/* Image Selector Section */}
                    <div className="flex flex-col items-center gap-4 py-4 border-b border-gray-50 mb-6">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-[1.5rem] bg-gray-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-300" />
                                )}
                            </div>
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-110 transition-all active:scale-95"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                        <div className="text-center">
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none">Group Icon</h4>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Optional</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                Group Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold text-lg"
                                placeholder="e.g. Bangalore Night Riders"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                Description
                            </label>
                            <textarea
                                required
                                rows={2}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold resize-none"
                                placeholder="What is this group about?"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                                    Category
                                </label>
                                {!showNewCategory ? (
                                    <div className="relative">
                                        <select
                                            value={selectedCategoryId}
                                            onChange={(e) => {
                                                if (e.target.value === 'new') setShowNewCategory(true);
                                                else setSelectedCategoryId(e.target.value);
                                            }}
                                            className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold appearance-none pr-12"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                            <option value="new" className="text-indigo-600 font-black">+ Create New Category</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-indigo-50/50 rounded-[1.5rem] border-2 border-dashed border-indigo-200 space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-xs font-black text-indigo-600 uppercase">New Category</span>
                                            <button type="button" onClick={() => setShowNewCategory(false)} className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase">Cancel</button>
                                        </div>
                                        <input 
                                            placeholder="Category Name"
                                            value={newCatName}
                                            onChange={e => setNewCatName(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-indigo-100 bg-white outline-none text-sm font-bold"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Location Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                                    Location
                                </label>
                                {!showNewLocation ? (
                                    <div className="relative">
                                        <select
                                            value={selectedLocationId}
                                            onChange={(e) => {
                                                if (e.target.value === 'new') setShowNewLocation(true);
                                                else setSelectedLocationId(e.target.value);
                                            }}
                                            className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold appearance-none pr-12"
                                        >
                                            <option value="">Select Location</option>
                                            {locations.map(loc => (
                                                <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
                                            ))}
                                            <option value="new" className="text-indigo-600 font-black">+ Create New Location</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-blue-50/50 rounded-[1.5rem] border-2 border-dashed border-blue-200 space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-xs font-black text-blue-600 uppercase">New Location</span>
                                            <button type="button" onClick={() => setShowNewLocation(false)} className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase">Cancel</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input 
                                                placeholder="City"
                                                value={newLocCity}
                                                onChange={e => setNewLocCity(e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-white outline-none text-sm font-bold"
                                            />
                                            <input 
                                                placeholder="Country"
                                                value={newLocCountry}
                                                onChange={e => setNewLocCountry(e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-white outline-none text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <Plus className="w-6 h-6" />
                                Create Group
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
