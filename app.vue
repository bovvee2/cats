<template>
<div
 :class="{'container grid grid-cols-4 items-end gap-x-10 app-container h-full': showSidebar, 'responsive-container': showResponsiveNavbar}"
 >

  <sidebar v-if="showSidebar" id="sidebar" class="h-full col-span-1" />


  <div class="col-span-3 h-full" :class="{'responsive-container': showSidebar}">
    <NuxtPage />
  </div>

</div>
</template>

<script setup>
import sidebar from './components/sidebar.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import 'vue3-toastify/dist/index.css'


const route = useRoute()
const showResponsiveNavbar = ref(true)
const showSidebar = computed(() => {

  return route.path.includes('/login') || route.name === 'index' ? false : true
})


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
    transform: translateX(0)!important;
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

  .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
