<template>
  <div class="absolute z-50 w-full h-full">
    <div class="modal px-7 py-5 rounded-xl shadow-lg">
      <div class="flex items-center justify-between">
        <span class="text-lg text-primary-text font-semibold"
          >Adoption form</span
        >

        <div
          class="bg-box-danger px-1 py-1 rounded-full"
          @click="emit('close')"
        >
          <Icon
            icon="material-symbols:close"
            width="15px"
            class="block text-danger cursor-pointer"
          />
        </div>
      </div>
      <hr class="my-5" />
      <form
        @submit.prevent="emit('save', form)"
      >
        <div class="relative">
          <div class="w-full mt-10">
            <div class="mt-4">
              <label class="block text-purple-700 font-semibold mb-2" for="name"
                >Full name</label
              >
              <input
                v-model="form.fullname"
                type="text"
                id="name"
                class="w-full border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder"
                placeholder="Enter your full name"
                required

              />
            </div>
            <div class="mt-4">
              <label class="block text-purple-700 font-semibold mb-2" for="name"
                >Email</label
              >
              <input
                v-model="form.email"
                type="mail"
                id="email"
                class="w-full border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder"
                placeholder="Enter your email"
                accept="image/*"
                required
              />
            </div>
            <div class="mt-4">
              <label class="block text-purple-700 font-semibold mb-2" for="name"
                >Telephone</label
              >
              <input
                v-model="form.telephone"
                type="text"
                id="phone"
                class="w-full border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder"
                placeholder="Enter your phone"
                accept="image/*"
                required
                v-maska="'(###) ###-####'"
              />
            </div>
            <div class="mt-4">
              <label
                class="block text-purple-700 font-semibold mb-2"
                for="description"
                required
                >Why would you want to adopt this cat?
                </label>
              <textarea
                v-model="form.description"
                name="description"
                id="description"
                class="w-full h-36 resize-none border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder"
                placeholder="Write here"
                required
              ></textarea>
            </div>
            <div class="flex justify-end mt-5">
              <button
                class="bg-box-danger text-danger px-10 py-3 rounded-md font-light hover:brightness-110 transition-all mr-3"
                @click="emit('close')"
              >
                Cancel
              </button>
              <button
                class="bg-primary text-white px-10 py-3 rounded-md font-light transition-all"
                type="submit"
              >
                <span v-if="!loading"
                  >{{ mode === "edit" ? "Edit" : "Save" }}
                </span>
                <Icon
                  v-else
                  icon="ph:cat-fill"
                  width="30px"
                  class="animate-spin block mx-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
const emit = defineEmits(['close', 'cancel', 'save'])


const form = ref({
  fullname: '',
  email: '',
  telephone: '',
  description: '',
})


</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  background-color: #fff;
  width: 30%;
  height: auto;
}
</style>
