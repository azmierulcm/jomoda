-- Add is_featured flag to vendors (idempotent)
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Index so the bazaar page can sort featured shops to the top efficiently
CREATE INDEX IF NOT EXISTS vendors_is_featured_idx ON vendors(is_featured);

-- To feature a vendor, run:
-- UPDATE vendors SET is_featured = true WHERE slug = 'your-slug';
