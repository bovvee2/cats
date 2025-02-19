import { SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { $supabase } = useNuxtApp() as unknown as { $supabase: SupabaseClient }

  if (!$supabase) {
    return navigateTo('/admin/login')
  }

  const { data: { session } } = await $supabase.auth.getSession()

  if (!session) {
    console.log('Sessão não encontrada, redirecionando para login...')
    return navigateTo('/admin/login')
  }

  const expiresAt = Number(localStorage.getItem('expires_at'))
  if (!expiresAt || Date.now() >= expiresAt * 1000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expires_at')
    return navigateTo('/admin/login')
  }
})
