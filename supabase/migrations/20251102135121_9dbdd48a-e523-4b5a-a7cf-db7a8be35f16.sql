-- Fix RLS policies to restrict access to sensitive PII data

-- 1. Restrict donations table access to pastors and admins only
DROP POLICY IF EXISTS "Users can view donations from their church" ON donations;

CREATE POLICY "Only pastors and admins can view donations"
ON donations FOR SELECT
TO authenticated
USING (
  church_id = get_user_church_id(auth.uid()) 
  AND (has_role(auth.uid(), 'pastor') OR has_role(auth.uid(), 'admin'))
);

-- Allow donors to view their own donations if they're authenticated
CREATE POLICY "Donors can view their own donations"
ON donations FOR SELECT
TO authenticated
USING (donor_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 2. Restrict members table access to pastors and admins only
DROP POLICY IF EXISTS "Users can view members from their church" ON members;

CREATE POLICY "Only pastors and admins can view members"
ON members FOR SELECT
TO authenticated
USING (
  church_id = get_user_church_id(auth.uid())
  AND (has_role(auth.uid(), 'pastor') OR has_role(auth.uid(), 'admin'))
);

-- 3. Require authentication for churches table
DROP POLICY IF EXISTS "Allow public select" ON churches;

CREATE POLICY "Authenticated users can view churches"
ON churches FOR SELECT
TO authenticated
USING (true);