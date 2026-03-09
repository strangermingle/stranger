export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          anonymous_alias: string
          email: string
          phone: string | null
          phone_verified: boolean
          password_hash: string | null
          avatar_url: string | null
          bio: string | null
          gender: string | null
          date_of_birth: string | null
          role: string
          is_verified: boolean
          is_active: boolean
          is_suspended: boolean
          suspension_reason: string | null
          suspended_until: string | null
          email_verified_at: string | null
          last_login_at: string | null
          login_count: number
          preferred_language: string
          preferred_currency: string
          timezone: string
          notification_prefs: Json
          privacy_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          anonymous_alias: string
          email: string
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string
          role?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          host_id: string
          category_id: string
          location_id: string | null
          title: string
          slug: string
          description: string | null
          status: string
          ticketing_mode: string
          is_featured: boolean
          is_sponsored: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          category_id: string
          title: string
          slug: string
          status?: string
          created_at?: string
        }
        Update: {
          title?: string
          status?: string
          is_featured?: boolean
          is_sponsored?: boolean
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_ref: string
          user_id: string
          event_id: string
          status: string
          payment_status: string
          subtotal: number
          discount_amount: number
          taxable_amount: number
          platform_fee: number
          gst_on_fee: number
          total_amount: number
          host_payout: number
          currency: string
          razorpay_order_id: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_ref: string
          user_id: string
          event_id: string
          status?: string
          total_amount: number
          platform_fee: number
          created_at?: string
        }
        Update: {
          status?: string
          payment_status?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          entity_type: string
          entity_id: string
          new_values: Json | null
          old_values: Json | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          entity_type: string
          entity_id: string
          new_values?: Json | null
          old_values?: Json | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          action?: string
        }
      }
      host_profiles: { Row: any; Insert: any; Update: any };
      categories: { Row: any; Insert: any; Update: any };
      ticket_tiers: { Row: any; Insert: any; Update: any };
      booking_items: { Row: any; Insert: any; Update: any };
      tickets: { Row: any; Insert: any; Update: any };
      reports: { Row: any; Insert: any; Update: any };
      admin_actions: { Row: any; Insert: any; Update: any };
      analytics_daily: { Row: any; Insert: any; Update: any };
      platform_config: { Row: any; Insert: any; Update: any };
      user_oauth_accounts: { Row: any; Insert: any; Update: any };
      user_sessions: { Row: any; Insert: any; Update: any };
      user_tokens: { Row: any; Insert: any; Update: any };
      host_follows: { Row: any; Insert: any; Update: any };
      tags: { Row: any; Insert: any; Update: any };
      locations: { Row: any; Insert: any; Update: any };
      event_images: { Row: any; Insert: any; Update: any };
      event_tags: { Row: any; Insert: any; Update: any };
      event_cohosts: { Row: any; Insert: any; Update: any };
      event_agenda: { Row: any; Insert: any; Update: any };
      event_faqs: { Row: any; Insert: any; Update: any };
      promo_codes: { Row: any; Insert: any; Update: any };
      event_waitlist: { Row: any; Insert: any; Update: any };
      promo_code_uses: { Row: any; Insert: any; Update: any };
      payouts: { Row: any; Insert: any; Update: any };
      event_saves: { Row: any; Insert: any; Update: any };
      event_likes: { Row: any; Insert: any; Update: any };
      event_interests: { Row: any; Insert: any; Update: any };
      event_reviews: { Row: any; Insert: any; Update: any };
      review_helpful_votes: { Row: any; Insert: any; Update: any };
      event_discussions: { Row: any; Insert: any; Update: any };
      discussion_likes: { Row: any; Insert: any; Update: any };
      conversations: { Row: any; Insert: any; Update: any };
      messages: { Row: any; Insert: any; Update: any };
      user_blocks: { Row: any; Insert: any; Update: any };
      notifications: { Row: any; Insert: any; Update: any };
      notification_templates: { Row: any; Insert: any; Update: any };
      saved_searches: { Row: any; Insert: any; Update: any };
      featured_slots: { Row: any; Insert: any; Update: any };
    };
    Views: {
      v_ticket_availability: { Row: any };
      v_events_public: { Row: any };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
