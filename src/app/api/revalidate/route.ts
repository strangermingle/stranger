import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    // Check for secret to confirm this is a valid request (re-using cloudinary key as a simple shared secret for now)
    if (secret !== process.env.REVALIDATION_SECRET && secret !== process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    if (tag) {
      revalidateTag(tag, "default");
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json({ message: 'No path or tag provided' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
