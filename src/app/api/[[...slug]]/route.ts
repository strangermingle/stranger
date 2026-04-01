import { NextRequest, NextResponse } from 'next/server';

/**
 * Catch-all Proxy Route
 * --------------------
 * This route forwards all requests starting with /api/* from the frontend (localhost:3000)
 * to the backend (localhost:3001 or production backend URL).
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = slug ? slug.join('/') : '';
  const url = new URL('/api/' + path, BACKEND_URL);
  url.search = req.nextUrl.search;

  console.log(`[Proxy] ${req.method} ${req.url} -> ${url.toString()}`);

  try {
    const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined;

    // Filter headers to avoid conflicts
    const headers = new Headers();
    req.headers.forEach((value, key) => {
      // Skip host and other sensitive/incorrect headers for the backend
      if (['host', 'connection', 'content-length'].includes(key.toLowerCase())) return;
      headers.set(key, value);
    });

    const res = await fetch(url.toString(), {
      method: req.method,
      headers,
      body,
      cache: 'no-store',
    });

    const data = await res.text();
    
    // Create response with same status and forwarded headers
    const proxiedResponse = new NextResponse(data, {
      status: res.status,
      statusText: res.statusText,
    });

    // Forward important headers back to the client
    res.headers.forEach((value, key) => {
      if (['content-type', 'set-cookie'].includes(key.toLowerCase())) {
        proxiedResponse.headers.set(key, value);
      }
    });

    return proxiedResponse;

  } catch (err: any) {
    console.error(`[Proxy Error] ${url.toString()}`, err.message);
    return NextResponse.json({ 
      success: false, 
      error: 'Backend Connection Failed',
      details: err.message
    }, { status: 502 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const OPTIONS = handleProxy;
export const HEAD = handleProxy;
