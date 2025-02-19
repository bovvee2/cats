<template>
    <div class="grid py-5  lg:py-0">
      <div class="container px-5 py-5 grid lg:grid-cols-[45%,auto] gap-4 h-full lg:h-screen min-w-full">
        <div class="bg-wrapper flex items-start justify-center rounded-xl relative overflow-hidden">
            <div class="bg"></div>
            <img src="../../assets/images/Cat.png" alt="Cat" class="cat-img">
          <div class="py-5">
            <h1 class="lg:mt-20 2xl:mt-10 text-white text-md lg:text-2xl text-center leading-tight font-bold">Welcome to the Cat <br/> Adoption Panel</h1>
          </div>
        </div>
        <div class="w-auto flex items-center justify-center w-full">
          <form @submit.prevent="handleLogin()" class="form-wrapper w-full lg:max-w-[60%]">
            <h2 class="text-primary font-medium flex items-center gap-2 mb-8">
               <Icon icon="ph:cat-fill" width="50px" />
                Cat adoption platform
            </h2>
            <hr class="border-stroke lg:my-5 w-full" />
            <span class="text-xl font-bold mt-5 lg:mt-10 block tracking-tighter">Login</span>

            <label for="username" class="block mt-5 font-bold text-primary">Username</label>
            <input :class="{'border-danger': errors.username}" v-model="username" required type="text" class="mt-3 px-5 py-4 rounded-lg placeholder:text-placeholder w-full border-danger border-stroke border-[1px]" name="username" id="username" placeholder="Enter the username" />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">
              {{ errors.username._errors[0] }}
             </p>

            <label for="password" class="block mt-5 font-bold text-primary">Password</label>
            <div class="relative">
              <Icon icon="akar-icons:eye" class="absolute text-primary top-[5px] bottom-0 right-[20px] h-full cursor-pointer" @click="toggleShowPassword" />
              <input v-model="password" required :type="showPassword" class="mt-3 px-5 py-4 rounded-lg placeholder:text-placeholder w-full border-danger border-stroke border-[1px]" name="password" id="password" placeholder="Enter the password" :class="{ 'border-danger': errors.password }" />
              <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password._errors[0] }}
             </p>

            </div>

            <button class="mt-7 w-full py-4 bg-primary text-white rounded-lg font-bold hover:brightness-90 transition-all">
              <span v-if="!loading">Login</span>
              <Icon v-else icon="ph:cat-fill" width="30px" class="animate-spin block mx-auto " />
            </button>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>

import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'
import { toast } from 'vue3-toastify'


const username = ref('')
const password = ref('')
const router = useRouter()
const loading = ref(false)
const errors = ref({})


const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
})

const formValidation = () => {
  const result = loginSchema.safeParse({
    username: username.value,
    password: password.value,
  })

  if (!result.success) {
    errors.value = result.error.format()
    return false
  }

  errors.value = {}
  return true
}


const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
const showPassword = ref('password')

const toggleShowPassword = () => {
  showPassword.value = showPassword.value === 'password' ? 'text' : 'password'
}

const handleLogin = async () => {
  if (!formValidation()) {
    return
  }
  loading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.value,
      password: password.value,
    })

    if (error) {
      setTimeout(() => {
        toast.error('Invalid username or password')
      }, 1000)
      return
    }

    if (data.session) {
      const { access_token, expires_at } = data.session
      localStorage.setItem('token', access_token)
      localStorage.setItem('expires_at', expires_at)
      setupAutoLogout(expires_at)
      router.push('/admin/dashboard')
    }
  } catch (err) {
    alert('Erro inesperado ao tentar logar')
    console.error(err)
  } finally {
    loading.value = false
  }
}

const setupAutoLogout = (expiresAt) => {
  const expiresInMs = (expiresAt * 1000) - Date.now()
  setTimeout(() => {
    logoutUser()
  }, expiresInMs)
}

const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expires_at')
  router.push('/login')
}

</script>

<style lang="scss" scoped>
    .bg-wrapper {
        background-color: theme('colors.primary');
        @media (max-width: 1024px) {
           height: 40vh;
        }

    }
    .bg {
        background-image: url('../../assets/images/Background.png');
        background-size: cover;
        filter: brightness(1.5);
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .cat-img {
        position: absolute;
        bottom: 0;
        transform: translateY(20%);
        @media (max-width: 1024px) {
            display: block;
            width: 150px;
        }

    }

    h1 {
        @media (max-width: 1024px) {
            font-size: theme('fontSize.xl');
        }
        @media (max-width: 992px) {
            font-size: theme('fontSize.2xl');
        }

        @media (max-width: 475px) {
            font-size: theme('fontSize.lg');
        }
    }
</style>