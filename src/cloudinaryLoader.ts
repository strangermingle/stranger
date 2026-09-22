export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // 1. Static local images (e.g. /logo-2.svg, /images/hero.jpg)
  // Served directly by Vercel Edge CDN for free without serverless compute
  if (src.startsWith('/')) {
    return src;
  }

  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  // 2. Images already hosted on Cloudinary (e.g., event posters)
  // Inject transformation directly into /image/upload/ path instead of nesting fetch
  if (src.includes('res.cloudinary.com')) {
    if (src.includes('/image/upload/')) {
      return src.replace('/image/upload/', `/image/upload/${params.join(',')}/`);
    }
    return src;
  }

  // 3. Other external URLs (e.g., Unsplash, Supabase, Blogger)
  // Route through Cloudinary fetch with unencoded URL
  return `https://res.cloudinary.com/strangermingle/image/fetch/${params.join(',')}/${src}`;
}

