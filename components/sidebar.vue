<template>
  <div class="sidebar w-full border-stroke border-r-[1px] h-full relative" id="sidebar">
    <div class="px-10 py-4 border-stroke border-b-[1px] ">
      <div class="flex items-center gap-5">
        <Icon icon="ph:cat-fill" width="50px" class="block text-primary" />
        <span class="font-semibold text-primary text-base text-nowrap"
          >Cat Adoption Platform</span
        >
      </div>
    </div>
    <div class="px-10 py-5">
      <span class="uppercase text-placeholder text-xs font-semibold"
        >Main menu</span
      >

      <ul class="mt-5">
        <li
          v-for="(route, index) in routes"
          :key="index"
          class="cursor-pointer"
        >
          <router-link :to="route.path" class="flex items-center gap-5 py-2">
            <Icon
              :icon="route.meta.icon"
              width="22px"
              class="block text-primary"
            />
            <span class="text-primary text-base font-medium">{{
              route.meta.title
            }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="absolute bottom-10 left-0 right-0 text-center">
        <button class="font-medium cursor-pointer text-danger" @click="logout">Sign out</button>
    </div>
  </div>

  <div class="navbar-toggler rounded-lg shadow-lg" v-if="showSidebar">
    <button @click="showResponsiveNavbar = !showResponsiveNavbar">
      <Icon v-if="showResponsiveNavbar" icon="bx:bx-menu" width="50px" class="text-white bg-primary rounded-lg" @click="toggleSidebar" />
      <Icon v-else icon="material-symbols:close" width="50px" class="text-white bg-primary rounded-lg" @click="toggleSidebar" />
    </button>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'


const router = useRouter()
const routes = ref([])

onMounted(() => {
  getRoutes()
})


const route = useRoute()
const showResponsiveNavbar = ref(true)
const showSidebar = computed(() => {

  return route.path.includes('/login') || route.name === 'index' ? false : true
})


const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar')
  sidebar.classList.toggle('show-sidebar')
}


const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expires_at')

  router.push('/admin/login')

}

const getRoutes = () => {
  console.log(router.getRoutes())
  routes.value = router.getRoutes()?.filter((route) => route.name !== 'login')


  routes.value.sort((a, b) => {
    if (a.meta.title === 'Cat list') return -1
    if (b.meta.title === 'Cat list') return 1
    return 0
  })
}
</script>

<style lang="scss">
 .sidebar {
        transition: all 0.3s;
        @media (max-width: 1199.98px) {
            position: fixed;
            transform: translateX(-150%);
            width: 80vw;
        }
    }

    .app-container {
        @media (max-width: 1199.98px) {
            margin: auto;
        }
    }

    .navbar-toggler {
        display: none;
        @media (max-width: 1199.98px) {
            display: block;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999;
        }
    }
  .show-sidebar {
    transform: translateX(-10%)!important;
    background-color: #fff;
  }

  .responsive-container {
    @media (max-width: 767px) {
     display: flex;
     min-width: 100%;
     margin: auto;
     justify-content: center;
     padding: 0.5rem;
    }
  }
</style>
