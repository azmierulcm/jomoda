-- Add multi-photo support for items (used by booking-type vendors for room galleries)
ALTER TABLE items ADD COLUMN IF NOT EXISTS image_urls text[] DEFAULT '{}';
