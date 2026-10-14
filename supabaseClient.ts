import { createClient } from '@supabase/supabase-js';

const rawUrl = ((import.meta as any).env?.VITE_SUPABASE_URL || '').trim();
// Normalizar URL: quitar '/rest/v1' o '/rest/v1/' y barras finales si fueron agregadas
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.warn("Faltan las credenciales de Supabase en las variables de entorno (VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY).");
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null as any;
