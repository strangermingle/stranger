'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Save, Users, Layout, Shield, MapPin, Tag, ChevronDown, Check, Loader2, Globe, Camera, Trash2, Settings, Image as ImageIcon } from 'lucide-react';
import { callRpc } from '@/lib/rpc-client';

interface EditGroupModalProps {
    isOpen: boolean;
    group: any;
    onClose: () => void;
    onSuccess: () => void;
}

export const EditGroupModal: React.FC<EditGroupModalProps> = ({ isOpen, group, onClose, onSuccess }) => {
    const [name, setName] = useState(group?.name || '');
    const [description, setDescription] = useState(group?.description || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Image Upload State
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(group?.image_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Meta Data State
    const [locations, setLocations] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string>(group?.location_id || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(group?.category_id || '');
    const [metaLoading, setMetaLoading] = useState(true);

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
            setName(group?.name || '');
            setDescription(group?.description || '');
            setSelectedLocationId(group?.location_id || '');
            setSelectedCategoryId(group?.category_id || '');
            setPreviewUrl(group?.image_url || null);
        }
    }, [isOpen, fetchMetaData, group]);

    if (!isOpen) return null;

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validations
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Data = reader.result as string;
                const result = await callRpc('groupService', 'uploadGroupImage', [null, group.id, base64Data]);
                
                if (result.success) {
                    setPreviewUrl(result.image_url);
                } else {
                    setError(result.error || 'Failed to upload image');
                }
                setUploading(false);
            };
        } catch (err: any) {
            setError('Failed to process image');
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await callRpc('groupService', 'updateGroup', [null, group.id, {
                name,
                description,
                location_id: selectedLocationId || null,
                category_id: selectedCategoryId || null,
            }]);
            
            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to update group');
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
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">Edit Group</h2>
                            <p className="text-indigo-100 font-medium mt-1">Manage your local community settings.</p>
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

                    {/* Image Upload Section */}
                    <div className="flex flex-col items-center gap-4 py-4 border-b border-gray-50 mb-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2rem] bg-gray-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-300" />
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-[2rem]">
                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                    </div>
                                )}
                            </div>
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-110 transition-all active:scale-95"
                            >
                                <Camera className="w-5 h-5" />
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
                            <h4 className="text-sm font-black text-gray-900">Group Icon</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Recommend 512x512 PNG/JPG</p>
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
                                placeholder="Group Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                Description
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold resize-none"
                                placeholder="Description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCategoryId}
                                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                                        className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold appearance-none pr-12"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Location Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                                    Location
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedLocationId}
                                        onChange={(e) => setSelectedLocationId(e.target.value)}
                                        className="w-full px-5 py-4 rounded-[1.5rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold appearance-none pr-12"
                                    >
                                        <option value="">Select Location</option>
                                        {locations.map(loc => (
                                            <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-6 h-6" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
