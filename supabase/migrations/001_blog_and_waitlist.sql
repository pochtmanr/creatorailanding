-- =====================================================
-- CREATORAI BLOG + WAITLIST — Migration
-- Adapted from Doppler VPN's proven blog schema
-- =====================================================

BEGIN;

-- =====================================================
-- 1. BLOG TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  image_url TEXT,
  author_name VARCHAR(100) DEFAULT 'CreatorAI Team',
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  template_type VARCHAR(50) DEFAULT 'quick-take',
  source_combo TEXT,
  topic_category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE TABLE IF NOT EXISTS blog_post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_alt TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  og_title VARCHAR(70),
  og_description VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_post_locale UNIQUE (post_id, locale)
);

CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_tag_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  locale VARCHAR(5) NOT NULL,
  name VARCHAR(100) NOT NULL,
  CONSTRAINT unique_tag_locale UNIQUE (tag_id, locale)
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS blog_internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  target_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  link_order INT DEFAULT 0,
  CONSTRAINT no_self_link CHECK (source_post_id != target_post_id),
  CONSTRAINT unique_link UNIQUE (source_post_id, target_post_id)
);

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS translation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  model TEXT,
  tokens_used INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- =====================================================
-- 2. WAITLIST TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  locale VARCHAR(5) DEFAULT 'en',
  source VARCHAR(50) DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_waitlist_email UNIQUE (email)
);

-- =====================================================
-- 3. INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_translations_post_locale ON blog_post_translations(post_id, locale);
CREATE INDEX IF NOT EXISTS idx_translations_locale ON blog_post_translations(locale);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON blog_tags(slug);
CREATE INDEX IF NOT EXISTS idx_tag_translations_tag_locale ON blog_tag_translations(tag_id, locale);
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON blog_post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON blog_post_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_internal_links_source ON blog_internal_links(source_post_id);
CREATE INDEX IF NOT EXISTS idx_translation_jobs_post ON translation_jobs(post_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- =====================================================
-- 4. TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_translations_updated_at ON blog_post_translations;
CREATE TRIGGER update_translations_updated_at
  BEFORE UPDATE ON blog_post_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- 5. SECURITY FUNCTIONS
-- =====================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid() AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- =====================================================
-- 6. ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tag_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Public read policies
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
CREATE POLICY "Public can read published posts" ON blog_posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can read translations" ON blog_post_translations;
CREATE POLICY "Public can read translations" ON blog_post_translations FOR SELECT USING (
  EXISTS (SELECT 1 FROM blog_posts WHERE blog_posts.id = blog_post_translations.post_id AND blog_posts.status = 'published')
);

DROP POLICY IF EXISTS "Public can read tags" ON blog_tags;
CREATE POLICY "Public can read tags" ON blog_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read tag translations" ON blog_tag_translations;
CREATE POLICY "Public can read tag translations" ON blog_tag_translations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read post tags" ON blog_post_tags;
CREATE POLICY "Public can read post tags" ON blog_post_tags FOR SELECT USING (
  EXISTS (SELECT 1 FROM blog_posts WHERE blog_posts.id = blog_post_tags.post_id AND blog_posts.status = 'published')
);

DROP POLICY IF EXISTS "Public can read internal links" ON blog_internal_links;
CREATE POLICY "Public can read internal links" ON blog_internal_links FOR SELECT USING (
  EXISTS (SELECT 1 FROM blog_posts WHERE blog_posts.id = blog_internal_links.source_post_id AND blog_posts.status = 'published')
);

-- Waitlist: anyone can insert, only admins can read
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read waitlist" ON waitlist;
CREATE POLICY "Admins can read waitlist" ON waitlist FOR SELECT USING (is_admin());

-- Admin write policies
DROP POLICY IF EXISTS "Admins can read admin list" ON admins;
CREATE POLICY "Admins can read admin list" ON admins FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Super admins can manage admins" ON admins;
CREATE POLICY "Super admins can manage admins" ON admins FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Admins can manage posts" ON blog_posts;
CREATE POLICY "Admins can manage posts" ON blog_posts FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage translations" ON blog_post_translations;
CREATE POLICY "Admins can manage translations" ON blog_post_translations FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage tags" ON blog_tags;
CREATE POLICY "Admins can manage tags" ON blog_tags FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage tag translations" ON blog_tag_translations;
CREATE POLICY "Admins can manage tag translations" ON blog_tag_translations FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage post tags" ON blog_post_tags;
CREATE POLICY "Admins can manage post tags" ON blog_post_tags FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage internal links" ON blog_internal_links;
CREATE POLICY "Admins can manage internal links" ON blog_internal_links FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage translation jobs" ON translation_jobs;
CREATE POLICY "Admins can manage translation jobs" ON translation_jobs FOR ALL USING (is_admin());

-- =====================================================
-- 7. STORAGE BUCKET
-- =====================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog-images', 'blog-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
CREATE POLICY "Admins can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND is_admin());

DROP POLICY IF EXISTS "Admins can update blog images" ON storage.objects;
CREATE POLICY "Admins can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images' AND is_admin());

DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
CREATE POLICY "Admins can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images' AND is_admin());

-- =====================================================
-- 8. SEED ADMIN
-- =====================================================

INSERT INTO admins (email, role) VALUES ('pochtmanrca@gmail.com', 'admin') ON CONFLICT (email) DO NOTHING;

COMMIT;
