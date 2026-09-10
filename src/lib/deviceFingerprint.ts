'use client'

/**
 * Generates a silent, zero-permission device fingerprint.
 * Combines hardware attributes, screen specs, canvas hash, and a persistent client storage identifier.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server_render';

  try {
    // 1. Check persistent storage first
    const cached = localStorage.getItem('sm_dfp');
    if (cached && cached.length >= 16) {
      return cached;
    }

    // Check cookie fallback
    const cookieMatch = document.cookie.match(/(^|;)\s*sm_dfp=([^;]+)/);
    if (cookieMatch && cookieMatch[2]) {
      localStorage.setItem('sm_dfp', cookieMatch[2]);
      return cookieMatch[2];
    }

    // 2. Generate passive fingerprint components
    const components: string[] = [];

    // Screen
    components.push(`${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`);
    components.push(`${window.devicePixelRatio || 1}`);

    // Navigator
    components.push(navigator.userAgent || '');
    components.push(navigator.language || '');
    components.push(`${navigator.hardwareConcurrency || 2}`);
    components.push(`${(navigator as any).deviceMemory || 'unknown'}`);
    components.push(`${new Date().getTimezoneOffset()}`);

    // Canvas silent rendering hash
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('StrangerMingle,PAF#1', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('StrangerMingle,PAF#1', 4, 17);
        components.push(canvas.toDataURL());
      }
    } catch {
      components.push('no_canvas');
    }

    // Simple robust hash function (djb2 + sdbm)
    const raw = components.join('###');
    let hash1 = 5381;
    let hash2 = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash1 = (hash1 * 33) ^ char;
      hash2 = char + (hash2 << 6) + (hash2 << 16) - hash2;
    }

    const hexHash = `${Math.abs(hash1).toString(16)}${Math.abs(hash2).toString(16)}`;
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const fingerprint = `dfp_${hexHash}_${randomSuffix}`;

    // Store persistently for 1 year
    localStorage.setItem('sm_dfp', fingerprint);
    document.cookie = `sm_dfp=${fingerprint}; path=/; max-age=31536000; SameSite=Lax`;

    return fingerprint;
  } catch (e) {
    const fallback = `dfp_fallback_${Math.random().toString(36).substring(2, 14)}`;
    try {
      localStorage.setItem('sm_dfp', fallback);
    } catch {}
    return fallback;
  }
}
