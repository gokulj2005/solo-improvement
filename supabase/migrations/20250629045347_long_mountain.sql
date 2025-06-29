/*
  # Add social and community features tables

  1. New Tables
    - `friends` - Friend relationships between users
    - `guilds` - Guild/community groups
    - `guild_members` - Guild membership
    - `leaderboards` - Leaderboard entries
    - `social_quests` - Social and community quests
    - `community_challenges` - Global community challenges
    - `social_activities` - Activity feed entries

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Friends table
CREATE TABLE IF NOT EXISTS friends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  friend_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  UNIQUE(user_id, friend_id)
);

-- Guilds table
CREATE TABLE IF NOT EXISTS guilds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  avatar text,
  banner text,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  member_count integer DEFAULT 1,
  max_members integer DEFAULT 50,
  level integer DEFAULT 1,
  experience integer DEFAULT 0,
  is_public boolean DEFAULT true,
  requirements jsonb DEFAULT '{}',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Guild members table
CREATE TABLE IF NOT EXISTS guild_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id uuid REFERENCES guilds(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'moderator', 'member')) DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  contribution integer DEFAULT 0,
  last_active timestamptz DEFAULT now(),
  UNIQUE(guild_id, user_id)
);

-- Leaderboards table
CREATE TABLE IF NOT EXISTS leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('level', 'experience', 'quests', 'streak', 'guild')),
  period text NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'allTime')),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  value integer NOT NULL,
  rank integer NOT NULL,
  previous_rank integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(type, period, user_id)
);

-- Social quests table
CREATE TABLE IF NOT EXISTS social_quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('friend', 'guild', 'community')),
  requirements jsonb NOT NULL DEFAULT '{}',
  rewards jsonb NOT NULL DEFAULT '{}',
  max_progress integer NOT NULL DEFAULT 1,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Community challenges table
CREATE TABLE IF NOT EXISTS community_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  goal integer NOT NULL,
  current_progress integer DEFAULT 0,
  participant_count integer DEFAULT 0,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  rewards jsonb NOT NULL DEFAULT '{}',
  milestones jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Social activities table
CREATE TABLE IF NOT EXISTS social_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  data jsonb DEFAULT '{}',
  visibility text NOT NULL CHECK (visibility IN ('public', 'friends', 'guild', 'private')) DEFAULT 'friends',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_activities ENABLE ROW LEVEL SECURITY;

-- Friends policies
CREATE POLICY "Users can view their own friends" ON friends
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR friend_id = auth.uid());

CREATE POLICY "Users can create friend requests" ON friends
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their friend requests" ON friends
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR friend_id = auth.uid());

-- Guilds policies
CREATE POLICY "Anyone can view public guilds" ON guilds
  FOR SELECT TO authenticated
  USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Users can create guilds" ON guilds
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Guild owners can update their guilds" ON guilds
  FOR UPDATE TO authenticated
  USING (owner_id = auth.uid());

-- Guild members policies
CREATE POLICY "Guild members can view guild membership" ON guild_members
  FOR SELECT TO authenticated
  USING (
    guild_id IN (
      SELECT guild_id FROM guild_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join guilds" ON guild_members
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Leaderboards policies
CREATE POLICY "Anyone can view leaderboards" ON leaderboards
  FOR SELECT TO authenticated
  USING (true);

-- Social quests policies
CREATE POLICY "Anyone can view active social quests" ON social_quests
  FOR SELECT TO authenticated
  USING (is_active = true);

-- Community challenges policies
CREATE POLICY "Anyone can view active community challenges" ON community_challenges
  FOR SELECT TO authenticated
  USING (is_active = true);

-- Social activities policies
CREATE POLICY "Users can view relevant activities" ON social_activities
  FOR SELECT TO authenticated
  USING (
    visibility = 'public' OR
    (visibility = 'friends' AND user_id IN (
      SELECT CASE 
        WHEN user_id = auth.uid() THEN friend_id 
        ELSE user_id 
      END
      FROM friends 
      WHERE (user_id = auth.uid() OR friend_id = auth.uid()) 
      AND status = 'accepted'
    )) OR
    user_id = auth.uid()
  );

CREATE POLICY "Users can create their own activities" ON social_activities
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS friends_user_id_idx ON friends(user_id);
CREATE INDEX IF NOT EXISTS friends_friend_id_idx ON friends(friend_id);
CREATE INDEX IF NOT EXISTS friends_status_idx ON friends(status);

CREATE INDEX IF NOT EXISTS guilds_is_public_idx ON guilds(is_public);
CREATE INDEX IF NOT EXISTS guilds_owner_id_idx ON guilds(owner_id);

CREATE INDEX IF NOT EXISTS guild_members_guild_id_idx ON guild_members(guild_id);
CREATE INDEX IF NOT EXISTS guild_members_user_id_idx ON guild_members(user_id);

CREATE INDEX IF NOT EXISTS leaderboards_type_period_idx ON leaderboards(type, period);
CREATE INDEX IF NOT EXISTS leaderboards_rank_idx ON leaderboards(rank);

CREATE INDEX IF NOT EXISTS social_activities_user_id_idx ON social_activities(user_id);
CREATE INDEX IF NOT EXISTS social_activities_visibility_idx ON social_activities(visibility);
CREATE INDEX IF NOT EXISTS social_activities_created_at_idx ON social_activities(created_at);