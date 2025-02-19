<template>
  <div class="absolute z-50 w-full h-full modal">

    <div
      class="px-10 py-5 shadow-md bg-white rounded-lg w-[300px] mx-auto mt-20 flex flex-col items-center justify-center"
    >

      <div
        class="w-fit bg-box-danger px-3 py-3 rounded-lg cursor-pointer mx-auto"
        @click="showModal = true"
      >
        <Icon
          icon="mdi:trash"
          width="20px"
          class="block text-danger cursor-pointer"
        />
      </div>

      <p class="text-lg text-center text-primary-text font-semibold mb-5 mt-5">
        Are you sure?
      </p>
      <p class="text-center mb-5">
        Are you sure you wante to delete this cat profile? This action cannot be
        undone.
      </p>

      <div class="flex">
        <button
          class="bg-light-gray text-whit bg- px-7 py-3 rounded-md font-light hover:brightness-110 transition-all mr-3"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-danger text-white bg-light-grey px-7 py-3 rounded-md font-light hover:brightness-110 transition-all mr-3"
          @click="emit('delete')"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['close', 'delete'])
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 30%;
  height: auto;
}
</style>
