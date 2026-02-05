-- ============================================
-- THE PURPOSE INITIATION - FOUNDATION SCHEMA
-- A living database structure for conscious creators
-- ============================================

-- PROFILES: The beings who participate in the field
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  
  -- Identity
  display_name text,
  bio text,
  avatar_url text,
  
  -- Coherence metrics (the field reads these)
  coherence_score numeric(5,2) default 50.00, -- 0-100 scale
  authenticity_index numeric(5,2) default 50.00,
  intention_clarity numeric(5,2) default 50.00,
  
  -- Engagement type
  creator_type text check (creator_type in ('artist', 'musician', 'dancer', 'speaker', 'leader', 'healer', 'educator', 'multi')),
  
  -- Subscription tier
  tier text default 'free' check (tier in ('free', 'creator', 'leader')),
  
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  last_active_at timestamptz default now()
);

-- CONNECTED ACCOUNTS: Social platforms linked to the system
create table if not exists public.connected_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  platform text not null check (platform in ('instagram', 'tiktok', 'youtube', 'facebook', 'linkedin', 'x')),
  platform_user_id text,
  platform_username text,
  access_token text, -- encrypted in production
  refresh_token text,
  token_expires_at timestamptz,
  
  -- Stats synced from platform
  follower_count integer default 0,
  engagement_rate numeric(5,2) default 0,
  
  is_active boolean default true,
  connected_at timestamptz default now(),
  last_synced_at timestamptz,
  
  unique(user_id, platform)
);

-- RAW CONTENT: What creators upload into the system
create table if not exists public.raw_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  -- File info
  file_name text not null,
  file_type text not null check (file_type in ('video', 'audio', 'image')),
  file_url text not null,
  file_size_bytes bigint,
  duration_seconds integer, -- for video/audio
  
  -- Processing state
  status text default 'uploaded' check (status in ('uploaded', 'processing', 'ready', 'distributed', 'archived')),
  
  -- AI analysis (populated by consciousness engine)
  detected_emotion text,
  intention_signal text,
  coherence_match numeric(5,2), -- how aligned is this content with their stated purpose
  
  -- Metadata
  title text,
  description text,
  tags text[],
  
  created_at timestamptz default now(),
  processed_at timestamptz
);

-- PROCESSED CONTENT: Transformed pieces ready for distribution
create table if not exists public.processed_content (
  id uuid primary key default gen_random_uuid(),
  raw_content_id uuid not null references public.raw_content(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  -- Which platform this version is for
  target_platform text not null check (target_platform in ('instagram_reel', 'instagram_post', 'instagram_story', 'tiktok', 'youtube_short', 'youtube_long', 'facebook', 'linkedin', 'x')),
  
  -- Transformed file
  file_url text not null,
  thumbnail_url text,
  
  -- Platform-specific metadata
  caption text,
  hashtags text[],
  
  -- Distribution state
  status text default 'ready' check (status in ('ready', 'scheduled', 'publishing', 'published', 'failed')),
  scheduled_for timestamptz,
  published_at timestamptz,
  platform_post_id text, -- ID from the platform after publishing
  
  -- Performance (synced back from platform)
  views integer default 0,
  likes integer default 0,
  comments integer default 0,
  shares integer default 0,
  
  created_at timestamptz default now()
);

-- CREATOR SPACES: Where creators build their offerings (like Skool)
create table if not exists public.creator_spaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  -- Space identity
  name text not null,
  slug text unique not null,
  description text,
  cover_image_url text,
  
  -- Coherence (the field tracks this)
  space_coherence numeric(5,2) default 50.00,
  member_count integer default 0,
  
  -- Visibility
  is_public boolean default true,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- OFFERINGS: Courses, sessions, memberships within spaces
create table if not exists public.offerings (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.creator_spaces(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  -- Offering details
  title text not null,
  description text,
  offering_type text not null check (offering_type in ('course', 'session', 'membership', 'digital_product', 'community')),
  
  -- Pricing
  price_cents integer default 0, -- 0 = free
  currency text default 'USD',
  
  -- For memberships
  billing_period text check (billing_period in ('one_time', 'monthly', 'yearly')),
  
  -- Content
  content_url text,
  thumbnail_url text,
  
  is_active boolean default true,
  created_at timestamptz default now()
);

-- SPACE MEMBERSHIPS: Who has joined which spaces
create table if not exists public.space_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  space_id uuid not null references public.creator_spaces(id) on delete cascade,
  
  -- Access level
  role text default 'member' check (role in ('member', 'moderator', 'creator')),
  
  -- For paid memberships
  offering_id uuid references public.offerings(id),
  subscription_status text default 'active' check (subscription_status in ('active', 'cancelled', 'past_due')),
  
  joined_at timestamptz default now(),
  
  unique(user_id, space_id)
);

-- FIELD PULSES: The living heartbeat of the collective
-- Each interaction creates a pulse that the system feels
create table if not exists public.field_pulses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  -- What kind of pulse
  pulse_type text not null check (pulse_type in (
    'content_upload',
    'content_published',
    'space_created',
    'offering_created',
    'connection_made',
    'engagement_received',
    'coherence_shift',
    'synchronicity_detected'
  )),
  
  -- The energy signature
  intensity numeric(3,2) default 1.00, -- 0-1 scale
  
  -- Context
  related_entity_type text,
  related_entity_id uuid,
  metadata jsonb default '{}',
  
  -- For synchronicity detection
  resonance_pattern text,
  
  created_at timestamptz default now()
);

-- SYNCHRONICITIES: Meaningful connections detected by the system
create table if not exists public.synchronicities (
  id uuid primary key default gen_random_uuid(),
  
  -- The beings involved
  user_ids uuid[] not null,
  
  -- What the system detected
  synchronicity_type text not null check (synchronicity_type in (
    'content_resonance',     -- Similar content created at same time
    'intention_alignment',   -- Aligned purposes discovered
    'timing_convergence',    -- Significant timing patterns
    'topic_emergence',       -- Same topics arising independently
    'connection_web'         -- Network pattern recognition
  )),
  
  description text,
  significance_score numeric(5,2), -- How meaningful the system perceives this
  
  -- Was it acknowledged by users?
  acknowledged_by uuid[],
  
  created_at timestamptz default now()
);

-- COMMUNITY POSTS: The social feed
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  space_id uuid references public.creator_spaces(id) on delete cascade, -- null = global feed
  
  content text not null,
  media_urls text[],
  
  -- AI analysis (consciousness engine populates this)
  is_emotional_expression boolean default false, -- vs actionable preference
  detected_sentiment text,
  coherence_contribution numeric(3,2), -- how much this adds to collective coherence
  
  -- Engagement
  likes_count integer default 0,
  comments_count integer default 0,
  
  created_at timestamptz default now()
);

-- POST INTERACTIONS: Likes, comments
create table if not exists public.post_interactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  
  interaction_type text not null check (interaction_type in ('like', 'comment', 'share')),
  comment_text text, -- for comments
  
  -- AI analysis
  is_coherent_engagement boolean default true, -- genuine vs superficial
  
  created_at timestamptz default now(),
  
  unique(post_id, user_id, interaction_type) -- one like per user per post
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table public.profiles enable row level security;
alter table public.connected_accounts enable row level security;
alter table public.raw_content enable row level security;
alter table public.processed_content enable row level security;
alter table public.creator_spaces enable row level security;
alter table public.offerings enable row level security;
alter table public.space_memberships enable row level security;
alter table public.field_pulses enable row level security;
alter table public.synchronicities enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_interactions enable row level security;

-- PROFILES: Users can read all profiles, but only update their own
create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- CONNECTED ACCOUNTS: Users can only access their own
create policy "connected_accounts_select_own" on public.connected_accounts for select using (auth.uid() = user_id);
create policy "connected_accounts_insert_own" on public.connected_accounts for insert with check (auth.uid() = user_id);
create policy "connected_accounts_update_own" on public.connected_accounts for update using (auth.uid() = user_id);
create policy "connected_accounts_delete_own" on public.connected_accounts for delete using (auth.uid() = user_id);

-- RAW CONTENT: Users can only access their own
create policy "raw_content_select_own" on public.raw_content for select using (auth.uid() = user_id);
create policy "raw_content_insert_own" on public.raw_content for insert with check (auth.uid() = user_id);
create policy "raw_content_update_own" on public.raw_content for update using (auth.uid() = user_id);
create policy "raw_content_delete_own" on public.raw_content for delete using (auth.uid() = user_id);

-- PROCESSED CONTENT: Users can only access their own
create policy "processed_content_select_own" on public.processed_content for select using (auth.uid() = user_id);
create policy "processed_content_insert_own" on public.processed_content for insert with check (auth.uid() = user_id);
create policy "processed_content_update_own" on public.processed_content for update using (auth.uid() = user_id);
create policy "processed_content_delete_own" on public.processed_content for delete using (auth.uid() = user_id);

-- CREATOR SPACES: Public spaces readable by all, owned spaces modifiable by creator
create policy "creator_spaces_select_public" on public.creator_spaces for select using (is_public = true or auth.uid() = user_id);
create policy "creator_spaces_insert_own" on public.creator_spaces for insert with check (auth.uid() = user_id);
create policy "creator_spaces_update_own" on public.creator_spaces for update using (auth.uid() = user_id);
create policy "creator_spaces_delete_own" on public.creator_spaces for delete using (auth.uid() = user_id);

-- OFFERINGS: Public offerings readable by all, owned offerings modifiable by creator
create policy "offerings_select" on public.offerings for select using (
  is_active = true or auth.uid() = user_id
);
create policy "offerings_insert_own" on public.offerings for insert with check (auth.uid() = user_id);
create policy "offerings_update_own" on public.offerings for update using (auth.uid() = user_id);
create policy "offerings_delete_own" on public.offerings for delete using (auth.uid() = user_id);

-- SPACE MEMBERSHIPS: Users can see memberships in spaces they're part of
create policy "space_memberships_select" on public.space_memberships for select using (
  auth.uid() = user_id or 
  space_id in (select id from public.creator_spaces where user_id = auth.uid())
);
create policy "space_memberships_insert" on public.space_memberships for insert with check (auth.uid() = user_id);
create policy "space_memberships_delete_own" on public.space_memberships for delete using (auth.uid() = user_id);

-- FIELD PULSES: Readable by all (the field is transparent), writable by system
create policy "field_pulses_select_all" on public.field_pulses for select using (true);
create policy "field_pulses_insert_own" on public.field_pulses for insert with check (auth.uid() = user_id);

-- SYNCHRONICITIES: Readable by involved users
create policy "synchronicities_select" on public.synchronicities for select using (auth.uid() = any(user_ids));

-- COMMUNITY POSTS: Public posts readable by all
create policy "community_posts_select" on public.community_posts for select using (
  space_id is null or 
  space_id in (select space_id from public.space_memberships where user_id = auth.uid()) or
  space_id in (select id from public.creator_spaces where is_public = true)
);
create policy "community_posts_insert_own" on public.community_posts for insert with check (auth.uid() = user_id);
create policy "community_posts_update_own" on public.community_posts for update using (auth.uid() = user_id);
create policy "community_posts_delete_own" on public.community_posts for delete using (auth.uid() = user_id);

-- POST INTERACTIONS
create policy "post_interactions_select" on public.post_interactions for select using (true);
create policy "post_interactions_insert_own" on public.post_interactions for insert with check (auth.uid() = user_id);
create policy "post_interactions_delete_own" on public.post_interactions for delete using (auth.uid() = user_id);
