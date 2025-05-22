/*
  # Create logos table and related schemas

  1. New Tables
    - `logos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `client_name` (text)
      - `category_name` (text)
      - `status` (text)
      - `style` (text)
      - `image_url` (text)
      - `designer` (text)
      - `studio` (text)
      - `licences` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `logo_colors`
      - `id` (uuid, primary key)
      - `logo_id` (uuid, references logos)
      - `name` (text)
      - `hex_code` (text)
    - `logo_fonts`
      - `id` (uuid, primary key)
      - `logo_id` (uuid, references logos)
      - `name` (text)
    - `logo_external_links`
      - `id` (uuid, primary key)
      - `logo_id` (uuid, references logos)
      - `name` (text)
      - `url` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read their own logos
      - Create new logos
      - Update their own logos
*/

-- Create logos table
CREATE TABLE IF NOT EXISTS logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  client_name text,
  category_name text,
  status text NOT NULL,
  style text,
  image_url text,
  designer text,
  studio text,
  licences text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create logo_colors table
CREATE TABLE IF NOT EXISTS logo_colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_id uuid REFERENCES logos ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  hex_code text NOT NULL
);

-- Create logo_fonts table
CREATE TABLE IF NOT EXISTS logo_fonts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_id uuid REFERENCES logos ON DELETE CASCADE NOT NULL,
  name text NOT NULL
);

-- Create logo_external_links table
CREATE TABLE IF NOT EXISTS logo_external_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_id uuid REFERENCES logos ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL
);

-- Enable RLS
ALTER TABLE logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE logo_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE logo_fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE logo_external_links ENABLE ROW LEVEL SECURITY;

-- Policies for logos table
CREATE POLICY "Users can read own logos"
  ON logos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create logos"
  ON logos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own logos"
  ON logos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for logo_colors table
CREATE POLICY "Users can read own logo colors"
  ON logo_colors
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_colors.logo_id AND logos.user_id = auth.uid()
  ));

CREATE POLICY "Users can create logo colors"
  ON logo_colors
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_colors.logo_id AND logos.user_id = auth.uid()
  ));

-- Policies for logo_fonts table
CREATE POLICY "Users can read own logo fonts"
  ON logo_fonts
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_fonts.logo_id AND logos.user_id = auth.uid()
  ));

CREATE POLICY "Users can create logo fonts"
  ON logo_fonts
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_fonts.logo_id AND logos.user_id = auth.uid()
  ));

-- Policies for logo_external_links table
CREATE POLICY "Users can read own logo external links"
  ON logo_external_links
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_external_links.logo_id AND logos.user_id = auth.uid()
  ));

CREATE POLICY "Users can create logo external links"
  ON logo_external_links
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM logos WHERE logos.id = logo_external_links.logo_id AND logos.user_id = auth.uid()
  ));