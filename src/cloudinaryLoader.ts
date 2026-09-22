export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  
  if (process.env.NODE_ENV !== 'production' && src.startsWith('/')) {
    return src;
  }

  let url = src;
  
  if (url.startsWith('/')) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
      || (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` : 'https://strangermingle.com');
    url = `${baseUrl}${src}`;
  }

  return `https://res.cloudinary.com/strangermingle/image/fetch/${params.join(',')}/${encodeURIComponent(url)}`;
}
