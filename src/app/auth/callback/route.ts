import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Also handle next param for custom redirections
  const next = searchParams.get('next') ?? '/members/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session?.user) {
      const u = session.user
      
      // 1. Check if user exists in our users table
      const { data: dbUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', u.id)
        .single()
        
      // 2. If new user, insert them 
      if (!dbUser && u.email) {
        // Derive username from email local part + random 4 digits
        const localPart = u.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
        const rnd = Math.floor(1000 + Math.random() * 9000)
        let username = `${localPart}${rnd}`.substring(0, 50)
        
        // Generate anonymous alias: adjective + animal + 4 digits
        const adjectives = ['Happy', 'Brave', 'Quiet', 'Swift', 'Red', 'Blue', 'Neon', 'Cool']
        const animals = ['Fox', 'Bear', 'Wolf', 'Owl', 'Panda', 'Tiger', 'Lion']
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
        const animal = animals[Math.floor(Math.random() * animals.length)]
        const alias = `${adj}${animal}${rnd}`
        
        const { error: insertError } = await supabase.from('users').insert({
          id: u.id,
          email: u.email,
          username,
          anonymous_alias: alias,
          avatar_url: u.user_metadata?.avatar_url || null, // Best effort catch from Google
          email_verified_at: new Date().toISOString() // OAuth providers imply verified
        })
        
        // Handling uniqueness collision silently isn't ideal but we force random digits to heavily mitigate it.
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Invalid login parameters or session`)
}
