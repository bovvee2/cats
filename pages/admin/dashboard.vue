<template>
  <div class="page-container w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-5">
        <div class="bg-box px-3 py-3 rounded-lg">
          <Icon icon="solar:cat-bold" width="30px" class="block text-primary" />
        </div>
        <span class="text-secondary font-bold text-lg">Cat list</span>
      </div>
      <button
        class="bg-primary text-white px-5 py-3 rounded-md font-light hover:brightness-110 transition-all"
        @click="((showModal = true), (modalMode = 'new'))"
      >
        New cat
      </button>
    </div>
    <div class="mt-10">
      <div
        class="bg-white border-stroke border-[1px] rounded-lg overflow-auto responsive-table"
      >
      <div class="relative overflow-x-auto shadow-sm rounded-lg">
  <table class="min-w-full" v-if="!loading">
    <thead class="border-b-[1px] border-b-stroke">
      <tr>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Image
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Name
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Description
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider sticky right-0 bg-white border-l border-gray-200">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="cat in cats" :key="cat.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <img
            :src="handleCatImage(cat.image)"
            alt=""
            class="w-12 h-12 fit object-contain rounded-full"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ cat.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ cat.description }}
        </td>
        <td class="sticky right-0 bg-white border-l border-gray-200">
          <div class="flex justify-end gap-3 px-5">
            <div
              class="bg-box px-3 py-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              @click="
                ((showModal = true),
                (modalMode = 'edit'),
                (selectedCat = cat))
              "
            >
              <Icon
                icon="clarity:edit-solid"
                width="20px"
                class="block text-primary cursor-pointer"
              />
            </div>

            <div
              class="bg-box-danger px-3 py-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
            >
              <Icon
                icon="mdi:trash"
                width="20px"
                class="block text-danger cursor-pointer"
                @click="((showModalDelete = true), (selectedCat = cat))"
              />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
      </div>

      <div class="flex justify-center items-center mt-4" v-if="!loading">
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

    <div class="" v-if="loading">
      <Icon
        icon="solar:cat-bold"
        width="80px"
        class="block text-primary animate-spin mx-auto"
      />
    </div>

    <transition>
      <Modal
        v-if="showModal"
        @close="showModal = false"
        :mode="modalMode"
        @save="handleSubmitForm"
        :loading="loading"
        :cat="modalMode === 'edit' ? selectedCat : null"
      />
    </transition>
    <transition>
      <ModalDelete
        v-if="showModalDelete"
        @close="showModalDelete = false"
        @delete="deleteCat"
      />
    </transition>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
import { z } from 'zod'
import { toast } from 'vue3-toastify'
import Modal from '~/components/Modal.vue'
import ModalDelete from '~/components/ModalDelete.vue'

// eslint-disable-next-line no-undef
definePageMeta({
  title: 'Cat list',
  description: 'Cat list page',
  icon: 'solar:cat-bold',
})


const showModal = ref(false)
const modalMode = ref('')
const loading = ref(false)
const cats = ref([])
const selectedCat = ref(null)
const page = ref(1)
const limit = ref(5)
const totalPages = ref(0)
const showModalDelete = ref(false)

onMounted(() => {
  getCatsList()
})

const handleCatImage = (image) => {
  return image
}

const handleFileUpload = (event) => {
  return new Promise((resolve, reject) => {
    const selectedFile = event?.target?.files?.[0] || event

    if (!selectedFile || !(selectedFile instanceof Blob)) {
      return reject('Nenhum arquivo selecionado ou arquivo inválido')
    }

    const reader = new FileReader()

    reader.readAsDataURL(selectedFile)
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}

const catSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required and must be at least 1 character long',
  }),
  description: z.string().optional(),
  image: z.any(),
})

const handleSubmitForm = async (payload) => {
  console.log('payload:', payload)

  if (payload.mode !== 'edit') {
    createCat(payload)
  } else {
    console.log('edit cat payload:', payload)
    editCat(payload)
  }
}

const editCat = async (payload) => {
  loading.value = true
  try {
    const validatedPayload = catSchema.parse(payload)
    const editedCat = {
      name: validatedPayload.name,
      description: validatedPayload.description,
      image:
        typeof validatedPayload.image === 'string'
          ? validatedPayload.image
          : await handleFileUpload(validatedPayload.image),
    }

    await useFetch(`/api/cats/${payload.cat.id}`, {
      method: 'PUT',
      body: JSON.stringify(editedCat),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    toast.success('Cat edited successfully!', {
      autoClose: 3000,
      position: 'top-right',
    })
    showModal.value = false
    getCatsList()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação:', error.errors)
    } else {
      console.error('Erro inesperado:', error)
    }
  } finally {
    loading.value = false
  }
}

const deleteCat = async () => {
  loading.value = true
  try {
    console.log('selectedCat:', selectedCat.value)
    await useFetch(`/api/cats/${selectedCat.value.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    toast.success('Cat edited successfully!', {
      autoClose: 3000,
      position: 'top-right',
    })
    showModalDelete.value = false
    getCatsList()
    toast.success('Cat created successfully!', {
      autoClose: 3000,
      position: 'top-right',
    })
  } catch (error) {
    toast.error(`Error deleting cat: ${error}`, {
      autoClose: 3000,
      position: 'top-right',
    })
  } finally {
    loading.value = false
  }
}

const createCat = async (payload) => {
  loading.value = true
  try {
    const validatedPayload = catSchema.parse(payload)
    const newCat = {
      name: validatedPayload.name,
      description: validatedPayload.description,
      image: await handleFileUpload(validatedPayload.image),
    }
    await useFetch('/api/cats', {
      method: 'POST',
      body: JSON.stringify(newCat),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    toast.success('Cat created successfully!', {
      autoClose: 3000,
      position: 'top-right',
    })
    showModal.value = false
    getCatsList()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação:', error.errors)
    } else {
      console.error('Erro inesperado:', error)
    }
  } finally {
    loading.value = false
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

<style lang="scss" scoped>
table {
  thead {
    th {
      &:last-child {
        text-align: right;
      }
    }
  }
}


.responsive-table {
  @media (max-width: 767px) {
    overflow-x: auto;
  }
}
</style>
