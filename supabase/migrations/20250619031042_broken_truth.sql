/*
  # Create profiles table with RLS policies

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `hunter_name` (text)
      - `age` (integer)
      - `phone_number` (text)
      - `gender` (text with check constraint)
      - `character` (jsonb for storing character data)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to manage their own profiles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hunter_name text NOT NULL,
  age integer NOT NULL CHECK (age >= 13 AND age <= 120),
  phone_number text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  character jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can insert own profile" 
ON profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own profile" 
ON profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Create unique index on user_id
CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);