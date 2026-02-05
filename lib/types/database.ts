// ============================================
// THE PURPOSE INITIATION - DATABASE TYPES
// TypeScript interfaces mirroring the living schema
// ============================================

export type CreatorType = 'artist' | 'musician' | 'dancer' | 'speaker' | 'leader' | 'healer' | 'educator' | 'multi'
export type Tier = 'free' | 'creator' | 'leader'
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'linkedin' | 'x'
export type ContentFileType = 'video' | 'audio' | 'image'
export type ContentStatus = 'uploaded' | 'processing' | 'ready' | 'distributed' | 'archived'
export type TargetPlatform = 'instagram_reel' | 'instagram_post' | 'instagram_story' | 'tiktok' | 'youtube_short' | 'youtube_long' | 'facebook' | 'linkedin' | 'x'
export type ProcessedContentStatus = 'ready' | 'scheduled' | 'publishing' | 'published' | 'failed'
export type OfferingType = 'course' | 'session' | 'membership' | 'digital_product' | 'community'
export type BillingPeriod = 'one_time' | 'monthly' | 'yearly'
export type SpaceRole = 'member' | 'moderator' | 'creator'
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due'
export type PulseType = 'content_upload' | 'content_published' | 'space_created' | 'offering_created' | 'connection_made' | 'engagement_received' | 'coherence_shift' | 'synchronicity_detected'
export type SynchronicityType = 'content_resonance' | 'intention_alignment' | 'timing_convergence' | 'topic_emergence' | 'connection_web'
export type InteractionType = 'like' | 'comment' | 'share'

export interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  coherence_score: number
  authenticity_index: number
  intention_clarity: number
  creator_type: CreatorType | null
  tier: Tier
  created_at: string
  updated_at: string
  last_active_at: string
}

export interface ConnectedAccount {
  id: string
  user_id: string
  platform: Platform
  platform_user_id: string | null
  platform_username: string | null
  access_token: string | null
  refresh_token: string | null
  token_expires_at: string | null
  follower_count: number
  engagement_rate: number
  is_active: boolean
  connected_at: string
  last_synced_at: string | null
}

export interface RawContent {
  id: string
  user_id: string
  file_name: string
  file_type: ContentFileType
  file_url: string
  file_size_bytes: number | null
  duration_seconds: number | null
  status: ContentStatus
  detected_emotion: string | null
  intention_signal: string | null
  coherence_match: number | null
  title: string | null
  description: string | null
  tags: string[] | null
  created_at: string
  processed_at: string | null
}

export interface ProcessedContent {
  id: string
  raw_content_id: string
  user_id: string
  target_platform: TargetPlatform
  file_url: string
  thumbnail_url: string | null
  caption: string | null
  hashtags: string[] | null
  status: ProcessedContentStatus
  scheduled_for: string | null
  published_at: string | null
  platform_post_id: string | null
  views: number
  likes: number
  comments: number
  shares: number
  created_at: string
}

export interface CreatorSpace {
  id: string
  user_id: string
  name: string
  slug: string
  description: string | null
  cover_image_url: string | null
  space_coherence: number
  member_count: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Offering {
  id: string
  space_id: string
  user_id: string
  title: string
  description: string | null
  offering_type: OfferingType
  price_cents: number
  currency: string
  billing_period: BillingPeriod | null
  content_url: string | null
  thumbnail_url: string | null
  is_active: boolean
  created_at: string
}

export interface SpaceMembership {
  id: string
  user_id: string
  space_id: string
  role: SpaceRole
  offering_id: string | null
  subscription_status: SubscriptionStatus
  joined_at: string
}

export interface FieldPulse {
  id: string
  user_id: string
  pulse_type: PulseType
  intensity: number
  related_entity_type: string | null
  related_entity_id: string | null
  metadata: Record<string, unknown>
  resonance_pattern: string | null
  created_at: string
}

export interface Synchronicity {
  id: string
  user_ids: string[]
  synchronicity_type: SynchronicityType
  description: string | null
  significance_score: number | null
  acknowledged_by: string[] | null
  created_at: string
}

export interface CommunityPost {
  id: string
  user_id: string
  space_id: string | null
  content: string
  media_urls: string[] | null
  is_emotional_expression: boolean
  detected_sentiment: string | null
  coherence_contribution: number | null
  likes_count: number
  comments_count: number
  created_at: string
}

export interface PostInteraction {
  id: string
  post_id: string
  user_id: string
  interaction_type: InteractionType
  comment_text: string | null
  is_coherent_engagement: boolean
  created_at: string
}

// Expanded types with relations
export interface ProfileWithConnections extends Profile {
  connected_accounts?: ConnectedAccount[]
  creator_spaces?: CreatorSpace[]
}

export interface CreatorSpaceWithOfferings extends CreatorSpace {
  offerings?: Offering[]
  creator?: Profile
}

export interface CommunityPostWithAuthor extends CommunityPost {
  author?: Profile
  interactions?: PostInteraction[]
}

// Field state for real-time coherence
export interface CollectiveFieldState {
  collective_coherence: number
  active_beings: number
  recent_pulses: FieldPulse[]
  recent_synchronicities: Synchronicity[]
  field_mood: 'expanding' | 'contracting' | 'stable' | 'transitioning'
}
