-- ─── Orders table ───────────────────────────────────────────────
-- Run this in the Supabase SQL Editor.
-- Safe to run multiple times (idempotent).

-- 1. Create the table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS orders (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id        uuid        NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  short_order_id   text        NOT NULL,
  customer_name    text        NOT NULL,
  customer_phone   text,
  cart_items       jsonb       NOT NULL DEFAULT '[]'::jsonb,
  items            jsonb       NOT NULL DEFAULT '[]'::jsonb,   -- legacy compat
  total_price      numeric(10,2) NOT NULL,
  delivery_type    text        NOT NULL DEFAULT 'pickup'
                               CHECK (delivery_type IN ('pickup', 'delivery')),
  delivery_address text,
  notes            text,
  status           text        NOT NULL DEFAULT 'pending_whatsapp',
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- 2. Add new columns to an existing table (no-op if already present)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS short_order_id   text,
  ADD COLUMN IF NOT EXISTS cart_items       jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS delivery_type    text  DEFAULT 'pickup'
                                            CHECK (delivery_type IN ('pickup', 'delivery')),
  ADD COLUMN IF NOT EXISTS delivery_address text;

-- 3. Back-fill short_order_id for any legacy rows that have none
UPDATE orders
   SET short_order_id = 'ORD-' || upper(substring(replace(id::text, '-', ''), 1, 4))
 WHERE short_order_id IS NULL;

-- 4. Enforce NOT NULL after back-fill
ALTER TABLE orders ALTER COLUMN short_order_id SET NOT NULL;

-- 5. Index for fast short_order_id lookups
CREATE INDEX IF NOT EXISTS orders_short_order_id_idx ON orders(short_order_id);
CREATE INDEX IF NOT EXISTS orders_vendor_id_idx      ON orders(vendor_id);

-- ─── Row Level Security ──────────────────────────────────────────

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone (unauthenticated customers) to INSERT new orders
DROP POLICY IF EXISTS "Public can insert orders" ON orders;
CREATE POLICY "Public can insert orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Only the owning vendor (authenticated) can SELECT their orders
DROP POLICY IF EXISTS "Vendors can read own orders" ON orders;
CREATE POLICY "Vendors can read own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- Only the owning vendor can UPDATE (e.g. change status)
DROP POLICY IF EXISTS "Vendors can update own orders" ON orders;
CREATE POLICY "Vendors can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );
