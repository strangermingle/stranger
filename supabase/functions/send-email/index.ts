import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  try {
    const { notification_id, user_id, type, subject, body, action_url } = await req.json()

    // 1. Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // 2. Fetch user's actual email (double check)
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("email, username")
      .eq("id", user_id)
      .single()

    if (userError || !user?.email) {
      throw new Error(`User email not found for ID: ${user_id}`)
    }

    // 3. Send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "StrangerMingle <notifications@strangermingle.com>",
        to: [user.email],
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #4F46E5; margin: 0;">StrangerMingle</h1>
            </div>
            
            <div style="background-color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="font-size: 16px; line-height: 24px;">Hi ${user.username || 'there'},</p>
              <p style="font-size: 16px; line-height: 24px;">${body}</p>
              
              ${action_url ? `
                <div style="margin-top: 32px; text-align: center;">
                  <a href="${action_url}" style="background-color: #4F46E5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                    View Details
                  </a>
                </div>
              ` : ''}
            </div>
            
            <div style="margin-top: 24px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>You received this because you enabled email notifications in your settings.</p>
              <p>&copy; 2026 StrangerMingle. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    })

    const resData = await res.json()

    if (!res.ok) {
      throw new Error(JSON.stringify(resData))
    }

    // 4. Update notification record to mark as sent (sent_at)
    await supabaseClient
      .from("notifications")
      .update({ sent_at: new Date().toISOString() })
      .eq("id", notification_id)

    return new Response(JSON.stringify({ success: true, resData }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
