-- ==============================================================================
-- NEXO HR / RRHH ALTOS - ESQUEMA DE BASE DE DATOS PARA SUPABASE
-- Proyecto: tlultkpoxfoaxycbyudn
-- ==============================================================================

-- 1. TABLAS BASE
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  pin text NOT NULL,
  email text,
  dni text,
  cuil text,
  phone text,
  address text,
  birth_date date,
  role text DEFAULT 'empleado',
  bank_accounts jsonb DEFAULT '[]'::jsonb,
  permissions jsonb DEFAULT '{"canManageStaff": false, "canApproveRequests": false, "canManageDocs": false, "canViewSchedules": true, "canViewAssistant": true, "canViewTelegram": false, "canViewSettings": false, "canRegisterAttendance": true}'::jsonb,
  status text DEFAULT 'ausente',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_index integer NOT NULL, -- 0-6 (Lunes-Domingo)
  start_time text DEFAULT '09:00',
  end_time text DEFAULT '18:00',
  start_time_2 text,
  end_time_2 text,
  is_off boolean DEFAULT false,
  UNIQUE(user_id, day_index)
);

CREATE TABLE IF NOT EXISTS public.documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text,
  category text DEFAULT 'otros',
  visibility text DEFAULT 'public',
  target_user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  requires_signature boolean DEFAULT false,
  signature_data text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.document_signatures (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id uuid REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  signature_data text NOT NULL,
  signed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(document_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.shifts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  check_in timestamp with time zone NOT NULL,
  check_out timestamp with time zone,
  status text DEFAULT 'en curso',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DO $$ 
BEGIN 
    ALTER TABLE public.shifts DROP CONSTRAINT IF EXISTS shifts_status_check;
END $$;

CREATE TABLE IF NOT EXISTS public.requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  reason text,
  peer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'pendiente',
  peer_accepted boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL
);

-- Valores iniciales para configuración
INSERT INTO public.app_settings (key, value) 
VALUES ('office_location', '{"lat": -34.6037, "lng": -58.3816, "radius": 100}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.app_settings (key, value) 
VALUES ('telegram_config', '{"botToken": "", "chatId": "", "enabled": false}')
ON CONFLICT (key) DO NOTHING;

-- 2. DESHABILITAR ROW LEVEL SECURITY (RLS) PARA OPERACIÓN CON PIN DE LA APLICACIÓN
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_signatures DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules DISABLE ROW LEVEL SECURITY;
