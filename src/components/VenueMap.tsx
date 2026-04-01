'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { VenuePartner } from '@/lib/events';

interface VenueMapProps {
    venues: VenuePartner[];
    selectedVenue?: VenuePartner | null;
}

declare global {
    interface Window {
        google: any;
        initMap?: () => void;
    }
}

export default function VenueMap({ venues, selectedVenue }: VenueMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [map, setMap] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [markers, setMarkers] = useState<any[]>([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const initializationRef = useRef(false);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    const initializeMap = () => {
        if (!mapRef.current || !window.google || initializationRef.current) return;

        const initializedMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 20.5937, lng: 78.9629 }, // Center of India
            zoom: 5,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
        });

        setMap(initializedMap);
        setScriptLoaded(true);
        initializationRef.current = true;
    };

    useEffect(() => {
        // Define global initMap for the API callback
        window.initMap = () => {
            initializeMap();
        };

        // If google is already loaded, initialize immediately
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
            initializeMap();
        }

        return () => {
            // Clean up global callback
            if (window.initMap) {
                window.initMap = undefined;
            }
        };
    }, []);

    // Initialize markers whenever venues or map changes
    useEffect(() => {
        if (!map || !window.google || !venues.length) return;

        // Clear existing markers
        markers.forEach(m => m.setMap(null));
        
        const newMarkers = venues.map(venue => {
            if (venue.latitude === null || venue.longitude === null) return null;

            const marker = new window.google.maps.Marker({
                position: { lat: venue.latitude, lng: venue.longitude },
                map: map,
                title: venue.venue_name,
                animation: window.google.maps.Animation.DROP
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: `
                    <div style="padding: 12px; max-width: 200px; font-family: sans-serif;">
                        <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 800; color: #111; text-transform: uppercase;">${venue.venue_name}</h3>
                        <p style="margin: 0; font-size: 11px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${venue.city}</p>
                        <p style="margin: 4px 0 8px 0; font-size: 12px; color: #444; line-height: 1.4;">${venue.address}</p>
                        ${venue.google_maps_url ? `<a href="${venue.google_maps_url}" target="_blank" style="display: block; font-size: 11px; color: #2563eb; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">Open in Maps →</a>` : ''}
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            return marker;
        }).filter(Boolean);

        // Use a ref to store markers instead of state to avoid cascading renders
        setMarkers(newMarkers);

        // Auto-center and zoom to fit all markers if not specifically selecting one
        if (newMarkers.length > 0 && !selectedVenue) {
            const bounds = new window.google.maps.LatLngBounds();
            newMarkers.forEach(m => {
                if (m) bounds.extend(m.getPosition());
            });
            // Wrapping in setTimeout to avoid updating during render
            setTimeout(() => {
                map.fitBounds(bounds);
            }, 0);
            
            // Limit max zoom on fitBounds
            const listener = window.google.maps.event.addListener(map, 'idle', () => {
                if (map.getZoom() > 15) {
                    map.setZoom(15);
                }
                window.google.maps.event.removeListener(listener);
            });
        }
        
        // Cleanup old markers when the effect re-runs or component unmounts
        return () => {
             newMarkers.forEach(m => m.setMap(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, venues, selectedVenue]);

    // Handle selected venue changes (panning to location)
    useEffect(() => {
        if (!map || !selectedVenue || selectedVenue.latitude === null || selectedVenue.longitude === null) return;

        const pos = { lat: selectedVenue.latitude, lng: selectedVenue.longitude };
        map.panTo(pos);
        map.setZoom(17);

        // Find and trigger the marker's click event to show InfoWindow
        const marker = markers.find(m => {
            const mPos = m.getPosition();
            return Math.abs(mPos.lat() - (selectedVenue.latitude ?? 0)) < 0.0001 && 
                   Math.abs(mPos.lng() - (selectedVenue.longitude ?? 0)) < 0.0001;
        });
        
        if (marker) {
            window.google.maps.event.trigger(marker, 'click');
        }
    }, [selectedVenue, map, markers]);

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100">
            {!apiKey && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm text-white p-8 text-center">
                    <div>
                        <p className="text-xl font-black uppercase tracking-tighter mb-4 text-white-500">Building Robust Mapping</p>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto font-medium">Please scroll the event page till the time!</p>
                    </div>
                </div>
            )}
            
            <div ref={mapRef} className="w-full h-full" />
            
            {apiKey && (
                <Script
                    {...({
                        src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`,
                        strategy: "afterInteractive"
                    } as any)}
                />
            )}

            {!scriptLoaded && apiKey && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-xs">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
