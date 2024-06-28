export interface SPDealer {
  timestamp: string
  context_uri: string
  context_url: string
  context_restrictions: ContextRestrictions
  play_origin: PlayOrigin
  index: Index
  track: Track
  playback_id: string
  playback_speed: number
  position_as_of_timestamp: string
  duration: string
  is_playing: boolean
  is_paused: boolean
  is_system_initiated: boolean
  options: Options
  restrictions: Restrictions
  suppressions: Suppressions
  context_metadata: ContextMetadata
  page_metadata: PageMetadata
  session_id: string
  queue_revision: string
  playback_quality: PlaybackQuality
  signals: string[]
}

export interface ContextRestrictions {}

export interface PlayOrigin {
  feature_identifier: string
  feature_version: string
  view_uri: string
  referrer_identifier: string
}

export interface Index {
  page: number
  track: number
}

export interface Track {
  uri: string
  uid: string
  metadata: Metadata
  provider: string
}

export interface Metadata {
  'shuffle.average_position': string
  'context_uri': string
  'album_uri': string
  'actions.skipping_prev_past_track': string
  'image_small_url': string
  'interaction_id': string
  'title': string
  'artist_uri': string
  'image_url': string
  'collection.is_banned': string
  'entity_uri': string
  'collection.artist.is_banned': string
  'iteration': string
  'page_instance_id': string
  'album_title': string
  'actions.skipping_next_past_track': string
  'image_xlarge_url': string
  'decision_id': string
  'track_player': string
  'image_large_url': string
}

export interface Options {
  shuffling_context: boolean
  repeating_context: boolean
  repeating_track: boolean
}

export interface Restrictions {
  disallow_resuming_reasons: string[]
  disallow_setting_playback_speed_reasons: string[]
}

export interface Suppressions {}

export interface ContextMetadata {}

export interface PageMetadata {}

export interface PlaybackQuality {
  bitrate_level: string
  strategy: string
  target_bitrate_level: string
  target_bitrate_available: boolean
}
