<template>
  <div class="container p-20 mx-auto">
    <div class="flex items-center gap-5">
      <Icon icon="ph:cat-fill" width="50px" class="block text-primary" />
      <span class="font-semibold text-primary text-base text-nowrap">
        Cat Adoption Platform</span
      >
    </div>
    <hr class="mt-5 mb-10" />

    <div>
      <div class="">
        <h1 class="text-xl font-semibold text-primary">Cats for adoption</h1>
        <p class="mt-10 text-text-secondary">
          Explore our list of lovable cats looking for their forever homes.
        </p>
      </div>
      <div class="" v-if="loading">
        <Icon
          icon="solar:cat-bold"
          width="80px"
          class="block text-primary animate-spin mx-auto"
        />
      </div>
      <h2 class="text-xl bold text-center my-5 " v-if="!cats">There are no cats available at the moment.</h2>
      <div class="mt-5 flex gap-5">
        <div
          class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >

          <CatCard
            v-for="cat in cats"
            :key="cat.id"
            :cat="cat"
            class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
            @click="((selectedCat = cat), (showAdoptionModal = true))"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-10" v-if="!loading">
      <button
        @click="(page--, getCatsList())"
        :disabled="page === 1"
        class="px-4 py-2 bg-primary mr-3 text-white rounded-lg disabled:bg-gray-300"
      >
        <Icon
          icon="ooui:previous-ltr"
          width="20px"
          class="block text-white cursor-pointer"
        />
      </button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button
        @click="(page++, getCatsList())"
        :disabled="page === totalPages"
        class="px-4 py-2 ml-3 bg-primary text-white rounded-lg disabled:bg-gray-300"
      >
        <Icon
          icon="ooui:next-ltr"
          width="20px"
          class="block text-white cursor-pointer"
        />
      </button>
    </div>
  </div>
  <transition>
    <ModalAdoption
      v-if="showAdoptionModal"
      @close="showAdoptionModal = false"
      @save="saveAdoptionRequest"
    />
  </transition>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
import { toast } from 'vue3-toastify'
import CatCard from '~/components/CatCard.vue'
import ModalAdoption from '~/components/ModalAdoption.vue'

const loading = ref(false)
const cats = ref([])
const selectedCat = ref(null)
const page = ref(1)
const limit = ref(5)
const totalPages = ref(0)
const showAdoptionModal = ref(false)

onMounted(() => {
  getCatsList()
})

const saveAdoptionRequest = async (form) => {


  const payload = {
    ...form,
    catId: selectedCat.value.id,
  }

  payload.telephone = payload.telephone.replace(/\D/g, '')


  console.log('Payload:', payload)
  try {
    const { data, error } = await useFetch('/api/adoption-forms', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) {
      throw error.value
    }

    console.log('Adoption request saved successfully:', data.value)
    toast.success('Adoption request saved successfully!', {
      autoClose: 3000,
      position: 'top-right',
    })

    showAdoptionModal.value = false
    selectedCat.value = null
  } catch (error) {
    toast.error(`Error saving adoption request: ${error}`, {
      autoClose: 3000,
      position: 'top-right',
    })

    if (error.data && error.data.message) {
      alert(`Error: ${error.data.message}`)
    } else {
      alert('Failed to save adoption request. Please try again.')
    }
  }
}

const getCatsList = async () => {
  loading.value = true
  try {
    const { data } = await useFetch(
      `/api/cats?page=${page.value}&limit=${limit.value}`,
      {
        method: 'GET',
      },
    )
    cats.value = JSON.parse(data.value).data
    totalPages.value = JSON.parse(data.value).pagination.totalPages
  } catch (error) {
    toast.error(`Error fetching cats: ${error}`, {
      autoClose: 3000,
      position: 'top-right',
    })
  } finally {
    loading.value = false
  }
}
</script>
