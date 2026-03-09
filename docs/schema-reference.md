# StrangerMingle Schema Reference

This file documents all 43 tables in the database schema, generated from `strangermingle_schema.sql`.

## platform_config
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- key: VARCHAR(100) | UNIQUE NOT NULL | e.g. 'platform_fee_pct', 'max_tickets_per_booking'
- value: TEXT | NOT NULL | 
- description: TEXT | | 
- updated_by: UUID | FK → users.id | added after users table
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## users
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- username: VARCHAR(50) | UNIQUE NOT NULL | public/anonymous display name
- anonymous_alias: VARCHAR(80) | UNIQUE NOT NULL | generated alias for anonymous chat e.g. "BlueFox#4821"
- email: VARCHAR(255) | UNIQUE NOT NULL | 
- phone: VARCHAR(20) | | 
- phone_verified: BOOLEAN | DEFAULT FALSE | 
- password_hash: VARCHAR(255) | | NULL for OAuth users
- avatar_url: VARCHAR(500) | | 
- bio: TEXT | | 
- gender: VARCHAR(30) | | 
- date_of_birth: DATE | | 
- role: VARCHAR(20) | DEFAULT 'member' CHECK (role IN ('member', 'host', 'admin', 'moderator')) | 
- is_verified: BOOLEAN | DEFAULT FALSE | 
- is_active: BOOLEAN | DEFAULT TRUE | 
- is_suspended: BOOLEAN | DEFAULT FALSE | 
- suspension_reason: TEXT | | 
- suspended_until: TIMESTAMP | | 
- email_verified_at: TIMESTAMP | | 
- last_login_at: TIMESTAMP | | 
- login_count: INT | DEFAULT 0 | 
- preferred_language: VARCHAR(10) | DEFAULT 'en' | 
- preferred_currency: VARCHAR(10) | DEFAULT 'INR' | 
- timezone: VARCHAR(100) | DEFAULT 'Asia/Kolkata' | 
- notification_prefs: JSONB | DEFAULT '{}' | granular notification toggles
- privacy_settings: JSONB | DEFAULT '{}' | who can see profile, etc.
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## user_oauth_accounts
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- provider: VARCHAR(50) | NOT NULL | 'google', 'facebook', 'apple'
- provider_uid: VARCHAR(255) | NOT NULL | 
- access_token: TEXT | | 
- refresh_token: TEXT | | 
- token_expires_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## user_sessions
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- token_hash: VARCHAR(255) | UNIQUE NOT NULL | 
- device_info: JSONB | | browser, OS, IP
- ip_address: INET | | 
- is_active: BOOLEAN | DEFAULT TRUE | 
- expires_at: TIMESTAMP | NOT NULL | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## user_tokens
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- token_type: VARCHAR(30) | NOT NULL CHECK (token_type IN ('email_verify', 'password_reset', 'phone_otp', 'magic_link')) | 
- token_hash: VARCHAR(255) | NOT NULL | 
- expires_at: TIMESTAMP | NOT NULL | 
- used_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## host_profiles
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- host_type: VARCHAR(20) | NOT NULL CHECK (host_type IN ('individual', 'organisation')) | 
- display_name: VARCHAR(255) | NOT NULL | public host name
- organisation_name: VARCHAR(255) | | 
- tagline: VARCHAR(300) | | 
- description: TEXT | | 
- website_url: VARCHAR(500) | | 
- instagram_handle: VARCHAR(100) | | 
- facebook_url: VARCHAR(500) | | 
- twitter_handle: VARCHAR(100) | | 
- youtube_url: VARCHAR(500) | | 
- logo_url: VARCHAR(500) | | 
- banner_url: VARCHAR(500) | | 
- city: VARCHAR(100) | | 
- state: VARCHAR(100) | | 
- country: VARCHAR(100) | | 
- is_approved: BOOLEAN | DEFAULT FALSE | 
- approved_by: UUID | REFERENCES users(id) | 
- approved_at: TIMESTAMP | | 
- kyc_status: VARCHAR(20) | DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'submitted', 'verified', 'rejected')) | 
- kyc_documents: JSONB | | stored doc references
- razorpay_account_id: VARCHAR(255) | | 
- razorpay_contact_id: VARCHAR(255) | | 
- bank_account_verified: BOOLEAN | DEFAULT FALSE | 
- total_events_hosted: INT | DEFAULT 0 | 
- total_tickets_sold: INT | DEFAULT 0 | 
- total_revenue: DECIMAL(14,2) | DEFAULT 0.00 | 
- follower_count: INT | DEFAULT 0 | 
- rating_avg: DECIMAL(3,2) | DEFAULT 0.00 | 
- rating_count: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## host_follows
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- follower_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- host_id: UUID | NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## categories
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- name: VARCHAR(100) | UNIQUE NOT NULL | 
- slug: VARCHAR(100) | UNIQUE NOT NULL | 
- description: TEXT | | 
- icon_url: VARCHAR(500) | | 
- color_hex: VARCHAR(7) | | e.g. "#FF5733" for UI theming
- parent_id: UUID | REFERENCES categories(id) | supports sub-categories
- is_active: BOOLEAN | DEFAULT TRUE | 
- sort_order: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## tags
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- name: VARCHAR(80) | UNIQUE NOT NULL | 
- slug: VARCHAR(80) | UNIQUE NOT NULL | 
- use_count: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## locations
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- venue_name: VARCHAR(255) | | 
- address_line1: VARCHAR(255) | | 
- address_line2: VARCHAR(255) | | 
- city: VARCHAR(100) | NOT NULL | 
- state: VARCHAR(100) | | 
- country: VARCHAR(100) | NOT NULL | 
- country_code: CHAR(2) | | ISO 3166-1 alpha-2
- postal_code: VARCHAR(20) | | 
- latitude: DECIMAL(10,8) | | 
- longitude: DECIMAL(11,8) | | 
- google_maps_url: VARCHAR(500) | | 
- place_id: VARCHAR(255) | | Google Places API ID
- created_at: TIMESTAMP | DEFAULT NOW() | 

## events
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- host_id: UUID | NOT NULL REFERENCES users(id) | 
- category_id: UUID | NOT NULL REFERENCES categories(id) | 
- location_id: UUID | REFERENCES locations(id) | 
- title: VARCHAR(255) | NOT NULL | 
- slug: VARCHAR(320) | UNIQUE NOT NULL | 
- description: TEXT | | 
- short_description: VARCHAR(500) | | 
- cover_image_url: VARCHAR(500) | | 
- event_type: VARCHAR(20) | DEFAULT 'in_person' CHECK (event_type IN ('in_person', 'online', 'hybrid')) | 
- online_platform: VARCHAR(100) | | 'zoom', 'gmeet', 'teams', 'custom'
- online_event_url: VARCHAR(500) | | link revealed after booking
- online_url_reveal: VARCHAR(20) | DEFAULT 'after_booking' CHECK (online_url_reveal IN ('public', 'after_booking', 'day_of')) | 
- status: VARCHAR(20) | DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed', 'suspended', 'under_review')) | 
- cancellation_reason: TEXT | | 
- cancelled_at: TIMESTAMP | | 
- cancelled_by: UUID | REFERENCES users(id) | 
- start_datetime: TIMESTAMP | NOT NULL | 
- end_datetime: TIMESTAMP | NOT NULL | 
- timezone: VARCHAR(100) | NOT NULL DEFAULT 'Asia/Kolkata' | 
- doors_open_at: TIMESTAMP | | optional early entry time
- is_recurring: BOOLEAN | DEFAULT FALSE | 
- recurrence_rule: VARCHAR(500) | | iCal RRULE e.g. "FREQ=WEEKLY;BYDAY=SA"
- recurrence_end_date: DATE | | 
- parent_event_id: UUID | REFERENCES events(id) | for recurring instances
- ticketing_mode: VARCHAR(20) | NOT NULL DEFAULT 'platform' CHECK (ticketing_mode IN ('platform', 'external', 'free', 'rsvp', 'none')) | 
- external_ticket_url: VARCHAR(500) | | 
- max_capacity: INT | | 
- is_age_restricted: BOOLEAN | DEFAULT FALSE | 
- min_age: INT | | 
- refund_policy: VARCHAR(30) | DEFAULT 'no_refund' CHECK (refund_policy IN ('no_refund', 'flexible', 'moderate', 'strict', 'custom')) | 
- refund_policy_text: TEXT | | human-readable custom policy
- refund_cutoff_hours: INT | DEFAULT 0 | hours before event start
- is_featured: BOOLEAN | DEFAULT FALSE | 
- is_sponsored: BOOLEAN | DEFAULT FALSE | 
- sponsor_expires_at: TIMESTAMP | | 
- meta_title: VARCHAR(255) | | 
- meta_description: VARCHAR(500) | | 
- views_count: INT | DEFAULT 0 | 
- saves_count: INT | DEFAULT 0 | 
- likes_count: INT | DEFAULT 0 | 
- interests_count: INT | DEFAULT 0 | 
- booking_count: INT | DEFAULT 0 | 
- reviewed_by: UUID | REFERENCES users(id) | 
- reviewed_at: TIMESTAMP | | 
- admin_notes: TEXT | | 
- published_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## event_images
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- image_url: VARCHAR(500) | NOT NULL | 
- alt_text: VARCHAR(255) | | 
- is_cover: BOOLEAN | DEFAULT FALSE | 
- sort_order: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_tags
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- tag_id: UUID | NOT NULL REFERENCES tags(id) ON DELETE CASCADE | 

## event_cohosts
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- host_user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- role: VARCHAR(100) | | e.g. "Organiser", "Sponsor", "Performer"
- is_confirmed: BOOLEAN | DEFAULT FALSE | 
- invited_at: TIMESTAMP | DEFAULT NOW() | 
- confirmed_at: TIMESTAMP | | 

## event_agenda
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- title: VARCHAR(255) | NOT NULL | 
- description: TEXT | | 
- speaker: VARCHAR(255) | | 
- starts_at: TIMESTAMP | | 
- ends_at: TIMESTAMP | | 
- sort_order: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_faqs
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- question: TEXT | NOT NULL | 
- answer: TEXT | NOT NULL | 
- sort_order: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## ticket_tiers
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- name: VARCHAR(100) | NOT NULL | 'General', 'VIP', 'Early Bird'
- description: TEXT | | 
- tier_type: VARCHAR(20) | DEFAULT 'paid' CHECK (tier_type IN ('free', 'paid', 'donation')) | 
- price: DECIMAL(10,2) | NOT NULL DEFAULT 0.00 | 
- currency: VARCHAR(10) | DEFAULT 'INR' | 
- total_quantity: INT | NOT NULL | 
- sold_count: INT | DEFAULT 0 | 
- reserved_count: INT | DEFAULT 0 | held in pending orders
- max_per_booking: INT | DEFAULT 5 | 
- min_per_booking: INT | DEFAULT 1 | 
- sale_start_at: TIMESTAMP | | 
- sale_end_at: TIMESTAMP | | 
- perks: JSONB | | ["Free drink", "VIP lounge access"]
- is_active: BOOLEAN | DEFAULT TRUE | 
- is_visible: BOOLEAN | DEFAULT TRUE | 
- sort_order: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## promo_codes
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- host_id: UUID | NOT NULL REFERENCES users(id) | 
- event_id: UUID | REFERENCES events(id) | NULL = applies to all host events
- code: VARCHAR(50) | NOT NULL | 
- description: VARCHAR(255) | | 
- discount_type: VARCHAR(20) | NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')) | 
- discount_value: DECIMAL(10,2) | NOT NULL | 
- currency: VARCHAR(10) | DEFAULT 'INR' | 
- min_order_amount: DECIMAL(10,2) | DEFAULT 0.00 | 
- max_uses: INT | | NULL = unlimited
- uses_per_user: INT | DEFAULT 1 | 
- used_count: INT | DEFAULT 0 | 
- valid_from: TIMESTAMP | | 
- valid_until: TIMESTAMP | | 
- is_active: BOOLEAN | DEFAULT TRUE | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## bookings
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- booking_ref: VARCHAR(25) | UNIQUE NOT NULL | e.g. SM-20250301-A4X9
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- event_id: UUID | NOT NULL REFERENCES events(id) | 
- promo_code_id: UUID | REFERENCES promo_codes(id) | 
- status: VARCHAR(20) | DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded', 'partially_refunded', 'failed', 'expired')) | 
- payment_status: VARCHAR(20) | DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'partially_refunded', 'failed')) | 
- subtotal: DECIMAL(10,2) | NOT NULL | before discount + fees
- discount_amount: DECIMAL(10,2) | DEFAULT 0.00 | 
- taxable_amount: DECIMAL(10,2) | NOT NULL | subtotal - discount
- platform_fee: DECIMAL(10,2) | NOT NULL | 10% of taxable_amount
- gst_on_fee: DECIMAL(10,2) | DEFAULT 0.00 | 18% GST on platform fee
- total_amount: DECIMAL(10,2) | NOT NULL | final charged to user
- host_payout: DECIMAL(10,2) | NOT NULL | 90% of taxable_amount
- currency: VARCHAR(10) | DEFAULT 'INR' | 
- razorpay_order_id: VARCHAR(255) | | 
- razorpay_payment_id: VARCHAR(255) | | 
- razorpay_signature: VARCHAR(500) | | 
- razorpay_method: VARCHAR(50) | | 'upi', 'card', 'netbanking'
- paid_at: TIMESTAMP | | 
- attendee_name: VARCHAR(255) | NOT NULL | 
- attendee_email: VARCHAR(255) | NOT NULL | 
- attendee_phone: VARCHAR(20) | | 
- cancelled_at: TIMESTAMP | | 
- cancelled_by: UUID | REFERENCES users(id) | 
- cancellation_reason: TEXT | | 
- refund_amount: DECIMAL(10,2) | | 
- refunded_at: TIMESTAMP | | 
- expires_at: TIMESTAMP | | 
- invoice_number: VARCHAR(50) | | 
- invoice_url: VARCHAR(500) | | 
- notes: TEXT | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## booking_items
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- booking_id: UUID | NOT NULL REFERENCES bookings(id) ON DELETE CASCADE | 
- ticket_tier_id: UUID | NOT NULL REFERENCES ticket_tiers(id) | 
- quantity: INT | NOT NULL CHECK (quantity > 0) | 
- unit_price: DECIMAL(10,2) | NOT NULL | 
- subtotal: DECIMAL(10,2) | NOT NULL | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## tickets
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- booking_item_id: UUID | NOT NULL REFERENCES booking_items(id) | 
- booking_id: UUID | NOT NULL REFERENCES bookings(id) | 
- event_id: UUID | NOT NULL REFERENCES events(id) | 
- ticket_number: VARCHAR(60) | UNIQUE NOT NULL | e.g. SM-TKT-2025-000001
- qr_code_data: TEXT | | signed JWT or token for check-in
- holder_name: VARCHAR(255) | | 
- holder_email: VARCHAR(255) | | 
- is_checked_in: BOOLEAN | DEFAULT FALSE | 
- checked_in_at: TIMESTAMP | | 
- checked_in_by: UUID | REFERENCES users(id) | staff who scanned
- is_void: BOOLEAN | DEFAULT FALSE | 
- voided_reason: TEXT | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_waitlist
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- ticket_tier_id: UUID | REFERENCES ticket_tiers(id) | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- position: INT | NOT NULL | 
- status: VARCHAR(20) | DEFAULT 'waiting' CHECK (status IN ('waiting', 'offered', 'booked', 'expired', 'cancelled')) | 
- notified_at: TIMESTAMP | | 
- offer_expires_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## promo_code_uses
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- promo_code_id: UUID | NOT NULL REFERENCES promo_codes(id) | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- booking_id: UUID | NOT NULL REFERENCES bookings(id) | 
- discount_given: DECIMAL(10,2) | NOT NULL | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## payouts
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- host_id: UUID | NOT NULL REFERENCES users(id) | 
- event_id: UUID | REFERENCES events(id) | 
- payout_type: VARCHAR(30) | DEFAULT 'event_settlement' CHECK (payout_type IN ('event_settlement', 'manual', 'refund_reversal')) | 
- gross_amount: DECIMAL(10,2) | NOT NULL | total ticket revenue
- platform_fee: DECIMAL(10,2) | NOT NULL | 
- gst_on_fee: DECIMAL(10,2) | DEFAULT 0.00 | 
- net_amount: DECIMAL(10,2) | NOT NULL | amount transferred to host
- currency: VARCHAR(10) | DEFAULT 'INR' | 
- status: VARCHAR(20) | DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'on_hold')) | 
- failure_reason: TEXT | | 
- razorpay_payout_id: VARCHAR(255) | | 
- razorpay_fund_account_id: VARCHAR(255) | | 
- utr_number: VARCHAR(100) | | bank UTR reference
- initiated_at: TIMESTAMP | | 
- paid_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## event_saves
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_likes
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_interests
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- interest_type: VARCHAR(20) | DEFAULT 'interested' CHECK (interest_type IN ('interested', 'going', 'not_going')) | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_reviews
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- booking_id: UUID | REFERENCES bookings(id) | verified attendee gate
- rating: SMALLINT | NOT NULL CHECK (rating BETWEEN 1 AND 5) | 
- title: VARCHAR(255) | | 
- review_text: TEXT | | 
- rating_venue: SMALLINT | CHECK (rating_venue BETWEEN 1 AND 5) | 
- rating_host: SMALLINT | CHECK (rating_host BETWEEN 1 AND 5) | 
- rating_value: SMALLINT | CHECK (rating_value BETWEEN 1 AND 5) | 
- is_approved: BOOLEAN | DEFAULT TRUE | 
- is_flagged: BOOLEAN | DEFAULT FALSE | 
- flagged_reason: TEXT | | 
- reviewed_by: UUID | REFERENCES users(id) | 
- host_response: TEXT | | 
- host_responded_at: TIMESTAMP | | 
- helpful_count: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## review_helpful_votes
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- review_id: UUID | NOT NULL REFERENCES event_reviews(id) ON DELETE CASCADE | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- is_helpful: BOOLEAN | NOT NULL | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## event_discussions
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) ON DELETE CASCADE | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- parent_id: UUID | REFERENCES event_discussions(id) | threaded replies
- message: TEXT | NOT NULL | 
- is_anonymous: BOOLEAN | DEFAULT FALSE | hides real username, shows anonymous_alias
- is_pinned: BOOLEAN | DEFAULT FALSE | host can pin important Q&A
- is_host_reply: BOOLEAN | DEFAULT FALSE | 
- like_count: INT | DEFAULT 0 | 
- is_deleted: BOOLEAN | DEFAULT FALSE | 
- deleted_reason: TEXT | | 
- deleted_by: UUID | REFERENCES users(id) | 
- edited_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## discussion_likes
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- discussion_id: UUID | NOT NULL REFERENCES event_discussions(id) ON DELETE CASCADE | 
- user_id: UUID | NOT NULL REFERENCES users(id) | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## conversations
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- participant_1_id: UUID | NOT NULL REFERENCES users(id) | 
- participant_2_id: UUID | NOT NULL REFERENCES users(id) | 
- context_event_id: UUID | REFERENCES events(id) | 
- last_message_at: TIMESTAMP | | 
- last_message_preview: VARCHAR(200) | | 
- is_muted_by_p1: BOOLEAN | DEFAULT FALSE | 
- is_muted_by_p2: BOOLEAN | DEFAULT FALSE | 
- is_blocked_by_p1: BOOLEAN | DEFAULT FALSE | 
- is_blocked_by_p2: BOOLEAN | DEFAULT FALSE | 
- p1_deleted_at: TIMESTAMP | | 
- p2_deleted_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## messages
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- conversation_id: UUID | NOT NULL REFERENCES conversations(id) ON DELETE CASCADE | 
- sender_id: UUID | NOT NULL REFERENCES users(id) | 
- message_type: VARCHAR(20) | DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')) | 
- content: TEXT | | 
- media_url: VARCHAR(500) | | 
- is_read: BOOLEAN | DEFAULT FALSE | 
- read_at: TIMESTAMP | | 
- is_deleted_by_sender: BOOLEAN | DEFAULT FALSE | 
- is_deleted_by_receiver: BOOLEAN | DEFAULT FALSE | 
- reply_to_message_id: UUID | REFERENCES messages(id) | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## user_blocks
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- blocker_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- blocked_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- reason: TEXT | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## notifications
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- type: VARCHAR(80) | NOT NULL | e.g. 'booking_confirmed', 'event_cancelled', 'new_message', 'event_reminder'
- title: VARCHAR(255) | NOT NULL | 
- body: TEXT | | 
- image_url: VARCHAR(500) | | 
- action_url: VARCHAR(500) | | deep link
- related_id: UUID | | polymorphic ID
- related_type: VARCHAR(50) | | 'event', 'booking', 'message', 'review'
- channel: VARCHAR(20) | DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'sms', 'push')) | 
- is_read: BOOLEAN | DEFAULT FALSE | 
- read_at: TIMESTAMP | | 
- sent_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## notification_templates
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- type: VARCHAR(80) | UNIQUE NOT NULL | 
- channel: VARCHAR(20) | NOT NULL | 
- subject: VARCHAR(255) | | email subject
- body_template: TEXT | NOT NULL | Handlebars/Jinja template with {{variables}}
- is_active: BOOLEAN | DEFAULT TRUE | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## saved_searches
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- user_id: UUID | NOT NULL REFERENCES users(id) ON DELETE CASCADE | 
- label: VARCHAR(100) | | 
- city: VARCHAR(100) | | 
- category_id: UUID | REFERENCES categories(id) | 
- keyword: VARCHAR(255) | | 
- date_from: DATE | | 
- date_to: DATE | | 
- max_price: DECIMAL(10,2) | | 
- alert_enabled: BOOLEAN | DEFAULT FALSE | notify on new matching events
- created_at: TIMESTAMP | DEFAULT NOW() | 

## featured_slots
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- event_id: UUID | NOT NULL REFERENCES events(id) | 
- slot_type: VARCHAR(30) | NOT NULL CHECK (slot_type IN ('homepage_hero', 'homepage_grid', 'category_top', 'city_top', 'sponsored')) | 
- city: VARCHAR(100) | | 
- category_id: UUID | REFERENCES categories(id) | 
- priority: INT | DEFAULT 0 | 
- starts_at: TIMESTAMP | NOT NULL | 
- ends_at: TIMESTAMP | NOT NULL | 
- is_paid: BOOLEAN | DEFAULT FALSE | 
- amount_paid: DECIMAL(10,2) | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## reports
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- reporter_id: UUID | NOT NULL REFERENCES users(id) | 
- reported_type: VARCHAR(30) | NOT NULL CHECK (reported_type IN ('event', 'user', 'review', 'discussion', 'message')) | 
- reported_id: UUID | NOT NULL | 
- reason: VARCHAR(100) | NOT NULL | e.g. 'spam', 'fake_event', 'harassment', 'inappropriate'
- details: TEXT | | 
- evidence_urls: JSONB | | screenshot/media links
- status: VARCHAR(20) | DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')) | 
- resolution_note: TEXT | | 
- reviewed_by: UUID | REFERENCES users(id) | 
- reviewed_at: TIMESTAMP | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
- updated_at: TIMESTAMP | DEFAULT NOW() | 

## audit_logs
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- actor_id: UUID | REFERENCES users(id) | who performed the action (NULL = system)
- actor_role: VARCHAR(30) | | 
- action: VARCHAR(100) | NOT NULL | e.g. 'booking.created', 'event.cancelled', 'user.suspended'
- entity_type: VARCHAR(50) | NOT NULL | 'booking', 'event', 'user', etc.
- entity_id: UUID | NOT NULL | 
- old_values: JSONB | | snapshot before change
- new_values: JSONB | | snapshot after change
- metadata: JSONB | | extra context (IP, user agent, etc.)
- ip_address: INET | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## admin_actions
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- admin_id: UUID | NOT NULL REFERENCES users(id) | 
- action_type: VARCHAR(80) | NOT NULL | 
- description: TEXT | | 
- target_type: VARCHAR(50) | | 
- target_id: UUID | | 
- metadata: JSONB | | 
- ip_address: INET | | 
- created_at: TIMESTAMP | DEFAULT NOW() | 

## analytics_daily
- id: UUID | PRIMARY KEY DEFAULT gen_random_uuid() | 
- snapshot_date: DATE | NOT NULL | 
- metric_type: VARCHAR(50) | NOT NULL | 'platform', 'event', 'city', 'category'
- dimension_id: UUID | | event_id / city name / category_id
- dimension_label: VARCHAR(255) | | 
- new_users: INT | DEFAULT 0 | 
- new_events: INT | DEFAULT 0 | 
- total_bookings: INT | DEFAULT 0 | 
- total_revenue: DECIMAL(14,2) | DEFAULT 0.00 | 
- total_platform_fee: DECIMAL(14,2) | DEFAULT 0.00 | 
- page_views: INT | DEFAULT 0 | 
- created_at: TIMESTAMP | DEFAULT NOW() | 
