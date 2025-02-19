<template>
    <div class="page-container w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-5">
        <div class="bg-box px-3 py-3 rounded-lg">
          <Icon icon="tdesign:cat-filled" width="30px" class="block text-primary" />
        </div>
        <span class="text-secondary font-bold text-lg">Cat adoptions requests</span>
      </div>
      </div>
    </div>
    <div class="" v-if="loading">
      <Icon
        icon="solar:cat-bold"
        width="80px"
        class="block text-primary animate-spin mx-auto"
      />
    </div>
    <table class="min-w-full mt-10" v-if="!loading">
    <thead class="border-b-[1px] border-b-stroke">
      <tr>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Full name
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          E-mail
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Telephone
        </th>
        <th class="px-6 py-3 text-left text-base text-primary font-bold tracking-wider">
          Message
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="request in adoptionsRequests" :key="request.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ request.fullname }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ request.email }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ request.telephone }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ request.description }}
        </td>

      </tr>
    </tbody>
  </table>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
// eslint-disable-next-line no-undef
definePageMeta({
  title: 'Adoptions Requests',
  description: 'Cat list page',
  icon: 'tdesign:cat-filled',
})

const adoptionsRequests = ref([])
const loading = ref(true)

onMounted(() => {
  getAdoptionsRequestsList()
})

const getAdoptionsRequestsList = async () => {
  try {
    const response = await fetch('/api/adoption-forms')
    const data = await response.json()
    adoptionsRequests.value = data.body
    loading.value = false
  } catch (error) {
    toast.error('Failed to fetch adoptions requests')
    console.error(error)
  }
}

</script>