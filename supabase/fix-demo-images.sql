-- ============================================================
-- Fix Demo Vendor Images
-- Run this in Supabase SQL Editor to replace broken images.
-- ============================================================

-- ── VENDOR GALLERY IMAGES ───────────────────────────────────

UPDATE vendors SET gallery_urls = ARRAY[
  'https://images.unsplash.com/photo-1579871494447-9811cf80d776?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85&fit=crop'
] WHERE slug = 'demo-restaurant';

UPDATE vendors SET gallery_urls = ARRAY[
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85&fit=crop'
] WHERE slug = 'demo-retail';

UPDATE vendors SET gallery_urls = ARRAY[
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop'
] WHERE slug = 'demo-booking';

-- ── ITEM IMAGES — Restaurant ─────────────────────────────────

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=600&fit=crop&q=85'
WHERE name = 'A5 Wagyu Short Rib';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=600&fit=crop&q=85'
WHERE name = 'Kurobuta Pork Collar';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop&q=85'
WHERE name = 'Yuzu Honey Lemonade';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop&q=85'
WHERE name = 'Hojicha Oat Latte';

-- ── ITEM IMAGES — Retail ─────────────────────────────────────

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop&q=85'
WHERE name = 'Hinoki Forest Soy Candle';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&h=600&fit=crop&q=85'
WHERE name = 'Sakura Mist Reed Diffuser';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop&q=85'
WHERE name = 'Handthrown Matcha Bowl';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1622428051717-dcd8f2a2d7e1?w=600&h=600&fit=crop&q=85'
WHERE name = 'Wabi-Sabi Bud Vase Set (3)';

-- ── ITEM IMAGES — Booking ────────────────────────────────────

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1600596542815-0c188dc40925?w=600&h=600&fit=crop&q=85'
WHERE name = 'The Loft Studio';

UPDATE items SET image_url =
  'https://images.unsplash.com/photo-1631049035182-249067d7ef29?w=600&h=600&fit=crop&q=85'
WHERE name = 'The Alpine Suite';
