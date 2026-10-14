import { createClient } from '@supabase/supabase-js';

const rawUrl = (((import.meta as any).env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://tlultkpoxfoaxycbyudn.supabase.co') as string).trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdWx0a3BveGZvYXh5Y2J5dWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTMzMzIsImV4cCI6MjA4ODI4OTMzMn0.ajif_MsnR9fcB63FKx9DJ1VqXmn0KAL-kQcbBTjow3A') as string).trim();

if (!supabaseUrl || !supabaseKey) {
  console.warn("Faltan las credenciales de Supabase en las variables de entorno.");
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null as any;
