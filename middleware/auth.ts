export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const { $supabase } = useNuxtApp()

  if (!$supabase) return navigateTo('/admin/login')

  $supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      return navigateTo('/admin/login')
    }

    const expiresAt = Number(localStorage.getItem('expires_at'))
    if (!expiresAt || Date.now() >= expiresAt * 1000) {
      localStorage.removeItem('token')
      localStorage.removeItem('expires_at')
      return navigateTo('/admin/login')
    }
  })
})
