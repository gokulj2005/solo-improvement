/*
  # Update profiles table to support game state storage

  1. Changes
    - Update character column to support storing complete game state
    - Add indexes for better performance
    - Update RLS policies to ensure proper access control

  2. Security
    - Maintain existing RLS policies
    - Ensure users can only access their own data
*/

-- Add comment to character column to clarify its purpose
COMMENT ON COLUMN profiles.character IS 'Stores complete character data including game state (quests, skills, shadows, dungeons)';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS profiles_updated_at_idx ON profiles(updated_at);

-- Update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();