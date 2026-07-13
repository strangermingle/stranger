'use server';

import { cookies } from 'next/headers';

// This file acts as a bridge to call backend library functions over HTTP securely
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET as string;

if (!process.env.INTERNAL_API_SECRET) {
  throw new Error('INTERNAL_API_SECRET environment variable is missing.');
}

export async function callRpc(module: string, method: string, args: any[] = [], options: { useCookies?: boolean; cache?: RequestCache } = { useCookies: true }) {
  try {
    // Collect all cookies from the incoming request (useful for SSR auth forwarding)
    let cookieStore = null;
    if (options.useCookies) {
      cookieStore = await cookies().catch(() => null);
    }
    
    const idToken = cookieStore?.get('auth-token')?.value || '';
    const cookieString = cookieStore?.toString() || '';

    const res = await fetch(`${BACKEND_URL}/api/internal-rpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-api-secret': INTERNAL_API_SECRET,
        ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {}),
        ...(cookieString ? { 'Cookie': cookieString } : {}),
      },
      body: JSON.stringify({ functionName: method, args }),
      cache: options.cache || (options.useCookies ? 'no-store' : 'force-cache'), // Allow caching for non-cookie requests
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`RPC Request failed: ${res.status} - ${errorText}`);
    }

    const { result, error } = await res.json();
    if (error) throw new Error(error);
    return result;
  } catch (err: any) {
    console.error(`[RPC Error: ${module}.${method}]`, err.message);
    throw err;
  }
}
