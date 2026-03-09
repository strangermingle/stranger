-- ============================================================
--  STRANGERMINGLE.COM — COMPLETE DATABASE SCHEMA
--  Version: 2.0 (Full)
--  Platform: PostgreSQL 15+
--  Generated: 2025
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- SECTION 1: PLATFORM CONFIGURATION
-- ============================================================

CREATE TABLE platform_config (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key             VARCHAR(100) UNIQUE NOT NULL,  -- e.g. 'platform_fee_pct', 'max_tickets_per_booking'
    value           TEXT NOT NULL,
    description     TEXT,
    updated_by      UUID,                          -- FK → users.id (added after users table)
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Seed defaults
INSERT INTO platform_config (key, value, description) VALUES
  ('platform_fee_pct',        '10',   'Platform commission percentage on ticket sales'),
  ('max_tickets_per_booking', '5',    'Maximum tickets a single user can book per transaction'),
  ('gst_rate_pct',            '18',   'GST rate applied on platform fee (India)'),
  ('currency_default',        'INR',  'Default currency for transactions'),
  ('host_approval_required',  'true', 'Whether new hosts require admin approval'),
  ('review_after_hours',      '24',   'Hours after event end before reviews are allowed'),
  ('waitlist_enabled',        'true', 'Enable global waitlist feature');


-- ============================================================
-- SECTION 2: USERS & IDENTITY
-- ============================================================

CREATE TABLE users (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username             VARCHAR(50) UNIQUE NOT NULL,      -- public/anonymous display name
    anonymous_alias      VARCHAR(80) UNIQUE NOT NULL,      -- generated alias for anonymous chat e.g. "BlueFox#4821"
    email                VARCHAR(255) UNIQUE NOT NULL,
    phone                VARCHAR(20),
    phone_verified       BOOLEAN DEFAULT FALSE,
    password_hash        VARCHAR(255),                     -- NULL for OAuth users
    avatar_url           VARCHAR(500),
    bio                  TEXT,
    gender               VARCHAR(30),
    date_of_birth        DATE,
    role                 VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'host', 'admin', 'moderator')),
    is_verified          BOOLEAN DEFAULT FALSE,
    is_active            BOOLEAN DEFAULT TRUE,
    is_suspended         BOOLEAN DEFAULT FALSE,
    suspension_reason    TEXT,
    suspended_until      TIMESTAMP,
    email_verified_at    TIMESTAMP,
    last_login_at        TIMESTAMP,
    login_count          INT DEFAULT 0,
    preferred_language   VARCHAR(10) DEFAULT 'en',
    preferred_currency   VARCHAR(10) DEFAULT 'INR',
    timezone             VARCHAR(100) DEFAULT 'Asia/Kolkata',
    notification_prefs   JSONB DEFAULT '{}',               -- granular notification toggles
    privacy_settings     JSONB DEFAULT '{}',               -- who can see profile, etc.
    created_at           TIMESTAMP DEFAULT NOW(),
    updated_at           TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);


-- OAuth / Social Login
CREATE TABLE user_oauth_accounts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider        VARCHAR(50) NOT NULL,                  -- 'google', 'facebook', 'apple'
    provider_uid    VARCHAR(255) NOT NULL,
    access_token    TEXT,
    refresh_token   TEXT,
    token_expires_at TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider, provider_uid)
);


-- Session / Auth tokens
CREATE TABLE user_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) UNIQUE NOT NULL,
    device_info     JSONB,                                 -- browser, OS, IP
    ip_address      INET,
    is_active       BOOLEAN DEFAULT TRUE,
    expires_at      TIMESTAMP NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);


-- Email verification + password reset tokens
CREATE TABLE user_tokens (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_type      VARCHAR(30) NOT NULL CHECK (token_type IN ('email_verify', 'password_reset', 'phone_otp', 'magic_link')),
    token_hash      VARCHAR(255) NOT NULL,
    expires_at      TIMESTAMP NOT NULL,
    used_at         TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_tokens_hash ON user_tokens(token_hash);


-- ============================================================
-- SECTION 3: HOST PROFILES
-- ============================================================

CREATE TABLE host_profiles (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    host_type               VARCHAR(20) NOT NULL CHECK (host_type IN ('individual', 'organisation')),
    display_name            VARCHAR(255) NOT NULL,         -- public host name
    organisation_name       VARCHAR(255),
    tagline                 VARCHAR(300),
    description             TEXT,
    website_url             VARCHAR(500),
    instagram_handle        VARCHAR(100),
    facebook_url            VARCHAR(500),
    twitter_handle          VARCHAR(100),
    youtube_url             VARCHAR(500),
    logo_url                VARCHAR(500),
    banner_url              VARCHAR(500),
    -- Location
    city                    VARCHAR(100),
    state                   VARCHAR(100),
    country                 VARCHAR(100),
    -- Approval & Verification
    is_approved             BOOLEAN DEFAULT FALSE,
    approved_by             UUID REFERENCES users(id),
    approved_at             TIMESTAMP,
    kyc_status              VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'submitted', 'verified', 'rejected')),
    kyc_documents           JSONB,                         -- stored doc references
    -- Razorpay payout
    razorpay_account_id     VARCHAR(255),
    razorpay_contact_id     VARCHAR(255),
    bank_account_verified   BOOLEAN DEFAULT FALSE,
    -- Stats (denormalised for performance)
    total_events_hosted     INT DEFAULT 0,
    total_tickets_sold      INT DEFAULT 0,
    total_revenue           DECIMAL(14,2) DEFAULT 0.00,
    follower_count          INT DEFAULT 0,
    rating_avg              DECIMAL(3,2) DEFAULT 0.00,
    rating_count            INT DEFAULT 0,
    created_at              TIMESTAMP DEFAULT NOW(),
    updated_at              TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_host_profiles_user ON host_profiles(user_id);
CREATE INDEX idx_host_profiles_city ON host_profiles(city);


-- Host followers (users following a host)
CREATE TABLE host_follows (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    host_id     UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(follower_id, host_id)
);

CREATE INDEX idx_host_follows_host ON host_follows(host_id);
CREATE INDEX idx_host_follows_follower ON host_follows(follower_id);


-- Co-hosts on events (linked after events table — see constraint below)
-- Defined after events table.


-- ============================================================
-- SECTION 4: CATEGORIES & TAGS
-- ============================================================

CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) UNIQUE NOT NULL,
    slug        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url    VARCHAR(500),
    color_hex   VARCHAR(7),                                -- e.g. "#FF5733" for UI theming
    parent_id   UUID REFERENCES categories(id),           -- supports sub-categories
    is_active   BOOLEAN DEFAULT TRUE,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Seed common categories
INSERT INTO categories (name, slug, color_hex, sort_order) VALUES
  ('Music & Concerts',   'music-concerts',   '#E74C3C', 1),
  ('Parties & Nightlife','parties-nightlife', '#9B59B6', 2),
  ('Workshops & Classes','workshops-classes', '#2ECC71', 3),
  ('Meetups & Networking','meetups-networking','#3498DB', 4),
  ('Food & Drinks',      'food-drinks',       '#F39C12', 5),
  ('Art & Culture',      'art-culture',       '#1ABC9C', 6),
  ('Sports & Fitness',   'sports-fitness',    '#E67E22', 7),
  ('Tech & Innovation',  'tech-innovation',   '#34495E', 8),
  ('Family & Kids',      'family-kids',       '#F1C40F', 9),
  ('Comedy & Theatre',   'comedy-theatre',    '#E91E63', 10),
  ('Travel & Adventure', 'travel-adventure',  '#00BCD4', 11),
  ('Health & Wellness',  'health-wellness',   '#4CAF50', 12),
  ('Online Events',      'online-events',     '#607D8B', 13),
  ('Other',              'other',             '#95A5A6', 99);


CREATE TABLE tags (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(80) UNIQUE NOT NULL,
    slug        VARCHAR(80) UNIQUE NOT NULL,
    use_count   INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);


-- ============================================================
-- SECTION 5: LOCATIONS
-- ============================================================

CREATE TABLE locations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_name      VARCHAR(255),
    address_line1   VARCHAR(255),
    address_line2   VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100),
    country         VARCHAR(100) NOT NULL,
    country_code    CHAR(2),                               -- ISO 3166-1 alpha-2
    postal_code     VARCHAR(20),
    latitude        DECIMAL(10,8),
    longitude       DECIMAL(11,8),
    google_maps_url VARCHAR(500),
    place_id        VARCHAR(255),                          -- Google Places API ID
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_country ON locations(country);
CREATE INDEX idx_locations_geo ON locations(latitude, longitude);


-- ============================================================
-- SECTION 6: EVENTS
-- ============================================================

CREATE TABLE events (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id             UUID NOT NULL REFERENCES users(id),
    category_id         UUID NOT NULL REFERENCES categories(id),
    location_id         UUID REFERENCES locations(id),

    title               VARCHAR(255) NOT NULL,
    slug                VARCHAR(320) UNIQUE NOT NULL,
    description         TEXT,
    short_description   VARCHAR(500),
    cover_image_url     VARCHAR(500),

    -- Type & Format
    event_type          VARCHAR(20) DEFAULT 'in_person' CHECK (event_type IN ('in_person', 'online', 'hybrid')),
    online_platform     VARCHAR(100),                      -- 'zoom', 'gmeet', 'teams', 'custom'
    online_event_url    VARCHAR(500),                      -- link revealed after booking
    online_url_reveal   VARCHAR(20) DEFAULT 'after_booking' CHECK (online_url_reveal IN ('public', 'after_booking', 'day_of')),

    -- Status
    status              VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed', 'suspended', 'under_review')),
    cancellation_reason TEXT,
    cancelled_at        TIMESTAMP,
    cancelled_by        UUID REFERENCES users(id),

    -- Schedule
    start_datetime      TIMESTAMP NOT NULL,
    end_datetime        TIMESTAMP NOT NULL,
    timezone            VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    doors_open_at       TIMESTAMP,                         -- optional early entry time

    -- Recurring
    is_recurring        BOOLEAN DEFAULT FALSE,
    recurrence_rule     VARCHAR(500),                      -- iCal RRULE e.g. "FREQ=WEEKLY;BYDAY=SA"
    recurrence_end_date DATE,
    parent_event_id     UUID REFERENCES events(id),        -- for recurring instances

    -- Ticketing
    ticketing_mode      VARCHAR(20) NOT NULL DEFAULT 'platform' CHECK (ticketing_mode IN ('platform', 'external', 'free', 'rsvp', 'none')),
    external_ticket_url VARCHAR(500),
    max_capacity        INT,
    is_age_restricted   BOOLEAN DEFAULT FALSE,
    min_age             INT,

    -- Refund Policy
    refund_policy       VARCHAR(30) DEFAULT 'no_refund' CHECK (refund_policy IN ('no_refund', 'flexible', 'moderate', 'strict', 'custom')),
    refund_policy_text  TEXT,                              -- human-readable custom policy
    refund_cutoff_hours INT DEFAULT 0,                     -- hours before event start

    -- Discovery & SEO
    is_featured         BOOLEAN DEFAULT FALSE,
    is_sponsored        BOOLEAN DEFAULT FALSE,
    sponsor_expires_at  TIMESTAMP,
    meta_title          VARCHAR(255),
    meta_description    VARCHAR(500),

    -- Counters (denormalised)
    views_count         INT DEFAULT 0,
    saves_count         INT DEFAULT 0,
    likes_count         INT DEFAULT 0,
    interests_count     INT DEFAULT 0,
    booking_count       INT DEFAULT 0,

    -- Admin
    reviewed_by         UUID REFERENCES users(id),
    reviewed_at         TIMESTAMP,
    admin_notes         TEXT,

    published_at        TIMESTAMP,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_host ON events(host_id);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start ON events(start_datetime);
CREATE INDEX idx_events_location ON events(location_id);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_featured ON events(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_events_search ON events USING gin(to_tsvector('english', title || ' ' || COALESCE(description,'')));


-- Event Images (gallery)
CREATE TABLE event_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    image_url   VARCHAR(500) NOT NULL,
    alt_text    VARCHAR(255),
    is_cover    BOOLEAN DEFAULT FALSE,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);


-- Event Tags (many-to-many)
CREATE TABLE event_tags (
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, tag_id)
);


-- Co-hosts (multiple hosts per event)
CREATE TABLE event_cohosts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    host_user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role            VARCHAR(100),                          -- e.g. "Organiser", "Sponsor", "Performer"
    is_confirmed    BOOLEAN DEFAULT FALSE,
    invited_at      TIMESTAMP DEFAULT NOW(),
    confirmed_at    TIMESTAMP,
    UNIQUE(event_id, host_user_id)
);


-- Event Schedule / Agenda (optional detailed agenda)
CREATE TABLE event_agenda (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    speaker     VARCHAR(255),
    starts_at   TIMESTAMP,
    ends_at     TIMESTAMP,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);


-- Event FAQs
CREATE TABLE event_faqs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    question    TEXT NOT NULL,
    answer      TEXT NOT NULL,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);


-- ============================================================
-- SECTION 7: TICKETING
-- ============================================================

CREATE TABLE ticket_tiers (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id            UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name                VARCHAR(100) NOT NULL,             -- 'General', 'VIP', 'Early Bird'
    description         TEXT,
    tier_type           VARCHAR(20) DEFAULT 'paid' CHECK (tier_type IN ('free', 'paid', 'donation')),
    price               DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    currency            VARCHAR(10) DEFAULT 'INR',
    total_quantity      INT NOT NULL,
    sold_count          INT DEFAULT 0,
    reserved_count      INT DEFAULT 0,                    -- held in pending orders
    max_per_booking     INT DEFAULT 5,
    min_per_booking     INT DEFAULT 1,
    sale_start_at       TIMESTAMP,
    sale_end_at         TIMESTAMP,
    -- Benefits/perks list
    perks               JSONB,                            -- ["Free drink", "VIP lounge access"]
    is_active           BOOLEAN DEFAULT TRUE,
    is_visible          BOOLEAN DEFAULT TRUE,
    sort_order          INT DEFAULT 0,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ticket_tiers_event ON ticket_tiers(event_id);


-- Promo / Discount Codes
CREATE TABLE promo_codes (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id             UUID NOT NULL REFERENCES users(id),
    event_id            UUID REFERENCES events(id),       -- NULL = applies to all host events
    code                VARCHAR(50) NOT NULL,
    description         VARCHAR(255),
    discount_type       VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value      DECIMAL(10,2) NOT NULL,
    currency            VARCHAR(10) DEFAULT 'INR',
    min_order_amount    DECIMAL(10,2) DEFAULT 0.00,
    max_uses            INT,                              -- NULL = unlimited
    uses_per_user       INT DEFAULT 1,
    used_count          INT DEFAULT 0,
    valid_from          TIMESTAMP,
    valid_until         TIMESTAMP,
    is_active           BOOLEAN DEFAULT TRUE,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(event_id, code)
);


-- ============================================================
-- SECTION 8: BOOKINGS & PAYMENTS
-- ============================================================

CREATE TABLE bookings (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_ref             VARCHAR(25) UNIQUE NOT NULL,   -- e.g. SM-20250301-A4X9
    user_id                 UUID NOT NULL REFERENCES users(id),
    event_id                UUID NOT NULL REFERENCES events(id),
    promo_code_id           UUID REFERENCES promo_codes(id),

    -- Status
    status                  VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded', 'partially_refunded', 'failed', 'expired')),
    payment_status          VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'partially_refunded', 'failed')),

    -- Amounts
    subtotal                DECIMAL(10,2) NOT NULL,        -- before discount + fees
    discount_amount         DECIMAL(10,2) DEFAULT 0.00,
    taxable_amount          DECIMAL(10,2) NOT NULL,        -- subtotal - discount
    platform_fee            DECIMAL(10,2) NOT NULL,        -- 10% of taxable_amount
    gst_on_fee              DECIMAL(10,2) DEFAULT 0.00,    -- 18% GST on platform fee
    total_amount            DECIMAL(10,2) NOT NULL,        -- final charged to user
    host_payout             DECIMAL(10,2) NOT NULL,        -- 90% of taxable_amount
    currency                VARCHAR(10) DEFAULT 'INR',

    -- Razorpay
    razorpay_order_id       VARCHAR(255),
    razorpay_payment_id     VARCHAR(255),
    razorpay_signature      VARCHAR(500),
    razorpay_method         VARCHAR(50),                   -- 'upi', 'card', 'netbanking'
    paid_at                 TIMESTAMP,

    -- Attendee snapshot (at time of booking)
    attendee_name           VARCHAR(255) NOT NULL,
    attendee_email          VARCHAR(255) NOT NULL,
    attendee_phone          VARCHAR(20),

    -- Cancellation
    cancelled_at            TIMESTAMP,
    cancelled_by            UUID REFERENCES users(id),
    cancellation_reason     TEXT,
    refund_amount           DECIMAL(10,2),
    refunded_at             TIMESTAMP,

    -- Expiry (for pending orders)
    expires_at              TIMESTAMP,

    -- Invoice
    invoice_number          VARCHAR(50),
    invoice_url             VARCHAR(500),

    notes                   TEXT,
    created_at              TIMESTAMP DEFAULT NOW(),
    updated_at              TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_ref ON bookings(booking_ref);
CREATE INDEX idx_bookings_razorpay ON bookings(razorpay_order_id);


-- Line items within a booking
CREATE TABLE booking_items (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id          UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    ticket_tier_id      UUID NOT NULL REFERENCES ticket_tiers(id),
    quantity            INT NOT NULL CHECK (quantity > 0),
    unit_price          DECIMAL(10,2) NOT NULL,
    subtotal            DECIMAL(10,2) NOT NULL,
    created_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_booking_items_booking ON booking_items(booking_id);


-- Individual tickets (one row per attendee)
CREATE TABLE tickets (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_item_id     UUID NOT NULL REFERENCES booking_items(id),
    booking_id          UUID NOT NULL REFERENCES bookings(id),
    event_id            UUID NOT NULL REFERENCES events(id),
    ticket_number       VARCHAR(60) UNIQUE NOT NULL,       -- e.g. SM-TKT-2025-000001
    qr_code_data        TEXT,                              -- signed JWT or token for check-in
    holder_name         VARCHAR(255),
    holder_email        VARCHAR(255),
    is_checked_in       BOOLEAN DEFAULT FALSE,
    checked_in_at       TIMESTAMP,
    checked_in_by       UUID REFERENCES users(id),        -- staff who scanned
    is_void             BOOLEAN DEFAULT FALSE,
    voided_reason       TEXT,
    created_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tickets_booking ON tickets(booking_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_number ON tickets(ticket_number);


-- Waitlist
CREATE TABLE event_waitlist (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id            UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    ticket_tier_id      UUID REFERENCES ticket_tiers(id),
    user_id             UUID NOT NULL REFERENCES users(id),
    position            INT NOT NULL,
    status              VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'offered', 'booked', 'expired', 'cancelled')),
    notified_at         TIMESTAMP,
    offer_expires_at    TIMESTAMP,
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

CREATE INDEX idx_waitlist_event ON event_waitlist(event_id);


-- Promo code usage tracking
CREATE TABLE promo_code_uses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_code_id   UUID NOT NULL REFERENCES promo_codes(id),
    user_id         UUID NOT NULL REFERENCES users(id),
    booking_id      UUID NOT NULL REFERENCES bookings(id),
    discount_given  DECIMAL(10,2) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);


-- ============================================================
-- SECTION 9: PAYOUTS
-- ============================================================

CREATE TABLE payouts (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id                 UUID NOT NULL REFERENCES users(id),
    event_id                UUID REFERENCES events(id),
    payout_type             VARCHAR(30) DEFAULT 'event_settlement' CHECK (payout_type IN ('event_settlement', 'manual', 'refund_reversal')),

    gross_amount            DECIMAL(10,2) NOT NULL,        -- total ticket revenue
    platform_fee            DECIMAL(10,2) NOT NULL,
    gst_on_fee              DECIMAL(10,2) DEFAULT 0.00,
    net_amount              DECIMAL(10,2) NOT NULL,        -- amount transferred to host

    currency                VARCHAR(10) DEFAULT 'INR',
    status                  VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'on_hold')),
    failure_reason          TEXT,

    razorpay_payout_id      VARCHAR(255),
    razorpay_fund_account_id VARCHAR(255),
    utr_number              VARCHAR(100),                  -- bank UTR reference

    initiated_at            TIMESTAMP,
    paid_at                 TIMESTAMP,
    created_at              TIMESTAMP DEFAULT NOW(),
    updated_at              TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payouts_host ON payouts(host_id);
CREATE INDEX idx_payouts_event ON payouts(event_id);
CREATE INDEX idx_payouts_status ON payouts(status);


-- ============================================================
-- SECTION 10: SOCIAL — SAVES, LIKES, INTERESTS
-- ============================================================

CREATE TABLE event_saves (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

CREATE TABLE event_likes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

CREATE TABLE event_interests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    interest_type   VARCHAR(20) DEFAULT 'interested' CHECK (interest_type IN ('interested', 'going', 'not_going')),
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

CREATE INDEX idx_event_saves_event ON event_saves(event_id);
CREATE INDEX idx_event_likes_event ON event_likes(event_id);
CREATE INDEX idx_event_interests_event ON event_interests(event_id);


-- ============================================================
-- SECTION 11: REVIEWS
-- ============================================================

CREATE TABLE event_reviews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    booking_id      UUID REFERENCES bookings(id),          -- verified attendee gate
    rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title           VARCHAR(255),
    review_text     TEXT,
    -- Sub-ratings
    rating_venue    SMALLINT CHECK (rating_venue BETWEEN 1 AND 5),
    rating_host     SMALLINT CHECK (rating_host BETWEEN 1 AND 5),
    rating_value    SMALLINT CHECK (rating_value BETWEEN 1 AND 5),
    -- Moderation
    is_approved     BOOLEAN DEFAULT TRUE,
    is_flagged      BOOLEAN DEFAULT FALSE,
    flagged_reason  TEXT,
    reviewed_by     UUID REFERENCES users(id),
    -- Host response
    host_response   TEXT,
    host_responded_at TIMESTAMP,
    helpful_count   INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

CREATE INDEX idx_reviews_event ON event_reviews(event_id);


-- Review helpfulness votes
CREATE TABLE review_helpful_votes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id   UUID NOT NULL REFERENCES event_reviews(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id),
    is_helpful  BOOLEAN NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(review_id, user_id)
);


-- ============================================================
-- SECTION 12: DISCUSSIONS (Event Comments / Q&A)
-- ============================================================

CREATE TABLE event_discussions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    parent_id       UUID REFERENCES event_discussions(id), -- threaded replies
    message         TEXT NOT NULL,
    is_anonymous    BOOLEAN DEFAULT FALSE,                 -- hides real username, shows anonymous_alias
    is_pinned       BOOLEAN DEFAULT FALSE,                 -- host can pin important Q&A
    is_host_reply   BOOLEAN DEFAULT FALSE,
    like_count      INT DEFAULT 0,
    is_deleted      BOOLEAN DEFAULT FALSE,
    deleted_reason  TEXT,
    deleted_by      UUID REFERENCES users(id),
    edited_at       TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_discussions_event ON event_discussions(event_id);
CREATE INDEX idx_discussions_parent ON event_discussions(parent_id);


CREATE TABLE discussion_likes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id   UUID NOT NULL REFERENCES event_discussions(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(discussion_id, user_id)
);


-- ============================================================
-- SECTION 13: MESSAGING (Anonymous Private Chat)
-- ============================================================

CREATE TABLE conversations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_1_id    UUID NOT NULL REFERENCES users(id),
    participant_2_id    UUID NOT NULL REFERENCES users(id),
    -- Context: optionally linked to a shared event
    context_event_id    UUID REFERENCES events(id),
    last_message_at     TIMESTAMP,
    last_message_preview VARCHAR(200),
    is_muted_by_p1      BOOLEAN DEFAULT FALSE,
    is_muted_by_p2      BOOLEAN DEFAULT FALSE,
    is_blocked_by_p1    BOOLEAN DEFAULT FALSE,
    is_blocked_by_p2    BOOLEAN DEFAULT FALSE,
    p1_deleted_at       TIMESTAMP,
    p2_deleted_at       TIMESTAMP,
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(participant_1_id, participant_2_id)
);

CREATE INDEX idx_conversations_p1 ON conversations(participant_1_id);
CREATE INDEX idx_conversations_p2 ON conversations(participant_2_id);


CREATE TABLE messages (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id             UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id                   UUID NOT NULL REFERENCES users(id),
    message_type                VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
    content                     TEXT,
    media_url                   VARCHAR(500),
    -- Always anonymous: display name resolved from users.anonymous_alias
    is_read                     BOOLEAN DEFAULT FALSE,
    read_at                     TIMESTAMP,
    is_deleted_by_sender        BOOLEAN DEFAULT FALSE,
    is_deleted_by_receiver      BOOLEAN DEFAULT FALSE,
    reply_to_message_id         UUID REFERENCES messages(id),
    created_at                  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at);


-- Block / Mute users
CREATE TABLE user_blocks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason          TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(blocker_id, blocked_id)
);


-- ============================================================
-- SECTION 14: NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(80) NOT NULL,                  -- e.g. 'booking_confirmed', 'event_cancelled', 'new_message', 'event_reminder'
    title           VARCHAR(255) NOT NULL,
    body            TEXT,
    image_url       VARCHAR(500),
    action_url      VARCHAR(500),                          -- deep link
    related_id      UUID,                                  -- polymorphic ID
    related_type    VARCHAR(50),                           -- 'event', 'booking', 'message', 'review'
    channel         VARCHAR(20) DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'sms', 'push')),
    is_read         BOOLEAN DEFAULT FALSE,
    read_at         TIMESTAMP,
    sent_at         TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;


-- Notification templates
CREATE TABLE notification_templates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type            VARCHAR(80) UNIQUE NOT NULL,
    channel         VARCHAR(20) NOT NULL,
    subject         VARCHAR(255),                          -- email subject
    body_template   TEXT NOT NULL,                         -- Handlebars/Jinja template with {{variables}}
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);


-- ============================================================
-- SECTION 15: SEARCH & DISCOVERY
-- ============================================================

-- Saved user searches / alerts
CREATE TABLE saved_searches (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label           VARCHAR(100),
    city            VARCHAR(100),
    category_id     UUID REFERENCES categories(id),
    keyword         VARCHAR(255),
    date_from       DATE,
    date_to         DATE,
    max_price       DECIMAL(10,2),
    alert_enabled   BOOLEAN DEFAULT FALSE,                 -- notify on new matching events
    created_at      TIMESTAMP DEFAULT NOW()
);


-- Homepage/featured slots (sponsored events, curated picks)
CREATE TABLE featured_slots (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID NOT NULL REFERENCES events(id),
    slot_type       VARCHAR(30) NOT NULL CHECK (slot_type IN ('homepage_hero', 'homepage_grid', 'category_top', 'city_top', 'sponsored')),
    city            VARCHAR(100),
    category_id     UUID REFERENCES categories(id),
    priority        INT DEFAULT 0,
    starts_at       TIMESTAMP NOT NULL,
    ends_at         TIMESTAMP NOT NULL,
    is_paid         BOOLEAN DEFAULT FALSE,
    amount_paid     DECIMAL(10,2),
    created_at      TIMESTAMP DEFAULT NOW()
);


-- ============================================================
-- SECTION 16: REPORTS & MODERATION
-- ============================================================

CREATE TABLE reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id     UUID NOT NULL REFERENCES users(id),
    reported_type   VARCHAR(30) NOT NULL CHECK (reported_type IN ('event', 'user', 'review', 'discussion', 'message')),
    reported_id     UUID NOT NULL,
    reason          VARCHAR(100) NOT NULL,                 -- e.g. 'spam', 'fake_event', 'harassment', 'inappropriate'
    details         TEXT,
    evidence_urls   JSONB,                                 -- screenshot/media links
    status          VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
    resolution_note TEXT,
    reviewed_by     UUID REFERENCES users(id),
    reviewed_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_type ON reports(reported_type, reported_id);


-- ============================================================
-- SECTION 17: AUDIT LOG
-- ============================================================

CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id        UUID REFERENCES users(id),             -- who performed the action (NULL = system)
    actor_role      VARCHAR(30),
    action          VARCHAR(100) NOT NULL,                 -- e.g. 'booking.created', 'event.cancelled', 'user.suspended'
    entity_type     VARCHAR(50) NOT NULL,                  -- 'booking', 'event', 'user', etc.
    entity_id       UUID NOT NULL,
    old_values      JSONB,                                 -- snapshot before change
    new_values      JSONB,                                 -- snapshot after change
    metadata        JSONB,                                 -- extra context (IP, user agent, etc.)
    ip_address      INET,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);


-- ============================================================
-- SECTION 18: THIRD WEBSITE PLACEHOLDER
-- (admin.strangermingle.com — Admin Dashboard)
-- ============================================================

-- Admin action log (higher-level than audit_logs)
CREATE TABLE admin_actions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id        UUID NOT NULL REFERENCES users(id),
    action_type     VARCHAR(80) NOT NULL,
    description     TEXT,
    target_type     VARCHAR(50),
    target_id       UUID,
    metadata        JSONB,
    ip_address      INET,
    created_at      TIMESTAMP DEFAULT NOW()
);


-- Platform analytics snapshots (daily rollups)
CREATE TABLE analytics_daily (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_date       DATE NOT NULL,
    metric_type         VARCHAR(50) NOT NULL,              -- 'platform', 'event', 'city', 'category'
    dimension_id        UUID,                              -- event_id / city name / category_id
    dimension_label     VARCHAR(255),
    new_users           INT DEFAULT 0,
    new_events          INT DEFAULT 0,
    total_bookings      INT DEFAULT 0,
    total_revenue       DECIMAL(14,2) DEFAULT 0.00,
    total_platform_fee  DECIMAL(14,2) DEFAULT 0.00,
    page_views          INT DEFAULT 0,
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(snapshot_date, metric_type, dimension_id)
);


-- ============================================================
-- SECTION 19: LATE FK CONSTRAINTS
-- ============================================================

ALTER TABLE platform_config
    ADD CONSTRAINT fk_platform_config_updated_by
    FOREIGN KEY (updated_by) REFERENCES users(id);


-- ============================================================
-- SECTION 20: VIEWS (USEFUL QUERIES)
-- ============================================================

-- Available tickets remaining per tier
CREATE VIEW v_ticket_availability AS
SELECT
    tt.id AS tier_id,
    tt.event_id,
    tt.name AS tier_name,
    tt.total_quantity,
    tt.sold_count,
    tt.reserved_count,
    (tt.total_quantity - tt.sold_count - tt.reserved_count) AS available,
    CASE WHEN (tt.total_quantity - tt.sold_count - tt.reserved_count) <= 0 THEN TRUE ELSE FALSE END AS is_sold_out
FROM ticket_tiers tt
WHERE tt.is_active = TRUE;


-- Public event listing view (joins most needed fields)
CREATE VIEW v_events_public AS
SELECT
    e.id,
    e.slug,
    e.title,
    e.short_description,
    e.cover_image_url,
    e.event_type,
    e.ticketing_mode,
    e.start_datetime,
    e.end_datetime,
    e.timezone,
    e.status,
    e.is_featured,
    e.views_count,
    e.likes_count,
    e.interests_count,
    e.booking_count,
    c.name AS category_name,
    c.slug AS category_slug,
    c.color_hex AS category_color,
    l.city,
    l.state,
    l.country,
    l.venue_name,
    u.username AS host_username,
    hp.display_name AS host_display_name,
    hp.logo_url AS host_logo,
    COALESCE(MIN(tt.price), 0) AS min_price,
    COALESCE(MAX(tt.price), 0) AS max_price
FROM events e
JOIN categories c ON c.id = e.category_id
LEFT JOIN locations l ON l.id = e.location_id
JOIN users u ON u.id = e.host_id
LEFT JOIN host_profiles hp ON hp.user_id = e.host_id
LEFT JOIN ticket_tiers tt ON tt.event_id = e.id AND tt.is_active = TRUE
WHERE e.status = 'published'
GROUP BY e.id, c.id, l.id, u.id, hp.id;


-- ============================================================
-- END OF SCHEMA
-- Total tables: 43
-- ============================================================
