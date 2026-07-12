
-- 1. Storage: replace overly broad public read with a policy that only exposes files linked to a resource record
DROP POLICY IF EXISTS "Public read resources bucket" ON storage.objects;
CREATE POLICY "Read files linked to a resource"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM public.resources r WHERE r.file_path = storage.objects.name)
  );

-- 2. Rewrite policies that depend on public.has_role() to use an inline check on user_roles,
--    so we can lock down has_role().

-- resources table
DROP POLICY IF EXISTS "Admins insert resources" ON public.resources;
DROP POLICY IF EXISTS "Admins update resources" ON public.resources;
DROP POLICY IF EXISTS "Admins delete resources" ON public.resources;

CREATE POLICY "Admins insert resources" ON public.resources
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins update resources" ON public.resources
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins delete resources" ON public.resources
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- storage admin policies
DROP POLICY IF EXISTS "Admins upload to resources bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admins update resources bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete from resources bucket" ON storage.objects;

CREATE POLICY "Admins upload to resources bucket" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

CREATE POLICY "Admins update resources bucket" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

CREATE POLICY "Admins delete from resources bucket" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

-- 3. Lock down has_role: not callable from the API roles anymore.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
