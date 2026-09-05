/*
# Create booking_requests table (single-tenant, no auth)

1. New Tables
- `booking_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer's full name
  - `phone` (text, not null) — customer's phone number
  - `preferred_date` (date, not null) — preferred appointment date
  - `preferred_time` (text, not null) — preferred time window (morning/afternoon/evening)
  - `address` (text, not null) — service address or city
  - `num_vehicles` (integer, not null, default 1) — number of vehicles to detail
  - `vehicles` (jsonb, not null) — array of { package: string, vehicleSize: string } per vehicle
  - `notes` (text) — optional customer notes
  - `status` (text, not null, default 'pending') — booking status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `booking_requests`.
- Allow anon + authenticated INSERT only (customers submit booking requests publicly).
- No SELECT/UPDATE/DELETE for anon — only the business owner should see bookings, which they do via the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  address text NOT NULL,
  num_vehicles integer NOT NULL DEFAULT 1,
  vehicles jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_booking_requests" ON booking_requests;
CREATE POLICY "anon_insert_booking_requests"
ON booking_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);
