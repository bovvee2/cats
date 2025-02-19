<template>
    <div class="absolute z-50  w-full h-full">
        <div class="modal px-7 py-5 rounded-xl shadow-sm">
       <div class="flex items-center justify-between">
        <span class="text-lg text-primary-text font-semibold">{{ handleModalTitle() }}</span>
      <div class="bg-box-danger px-1 py-1 rounded-full" @click='emit("close")'>
        <Icon icon="material-symbols:close" width="15px" class="block text-danger cursor-pointer" />
      </div>
       </div>
       <form @submit.prevent="emit('save', {image, name, description, mode, cat})">
            <div class="relative">
                <div class="w-full mt-10">
        <label class="block text-purple-700 font-semibold mb-2">Image</label>
        <div class="relative flex items-center border b-stroke rounded-lg p-3 bg-white cursor-pointer">
            <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="setImage($event)" />
                      <span class="text-gray-400">URL and Upload</span>
            <span class="ml-auto text-purple-700">
                <Icon icon="tabler:camera-filled" width="15px" class="block text-primary cursor-pointer"/>
            </span>
            <div v-if="image" class="absolute right-0 top-0 mx-auto translate-x-[120%] translate-y-[-25%]">
              <Icon icon="material-symbols:close" width="15px" class="block text-danger cursor-pointer ml-auto" @click="removeImage"/>
              <img class="object-contain rounded-full block bg-primary w-28 h-28" id="myImage" :src="handleCatImage(cat?.image)" alt="" >
            </div>
          </div>

        <div class="mt-4">
            <label class="block text-purple-700 font-semibold mb-2" for="name">Name</label>
            <input v-model="name" type="text" id="name" class="w-full border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder" placeholder="Enter the cat's name" accept="image/*">
          <span class="block text-sm underline cursor-pointer mt-1 text-primary" @click="generateRandomCatName">Random name</span>
        </div>
        <div class="mt-4">
            <label class="block text-purple-700 font-semibold mb-2" for="description">Description</label>
            <textarea v-model="description" name="description" id="description" class="w-full h-36 resize-none border b-stroke rounded-lg p-3 bg-white placeholder:text-placeholder" placeholder="Enter the cat's description"></textarea>
        </div>
        <div class="flex justify-end mt-5">
            <button class="bg-box-danger text-danger px-10 py-3 rounded-md font-light hover:brightness-110 transition-all mr-3" @click="emit('close')">Cancel</button>
            <button class="bg-primary text-white px-10 py-3 rounded-md font-light transition-all" type="submit">
              <span v-if="!loading">{{ mode === 'edit' ? 'Edit' : 'Save' }} </span>
              <Icon v-else icon="ph:cat-fill" width="30px" class="animate-spin block mx-auto " />
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
import { ref, onMounted, watch } from 'vue'
import { catNames } from '~/assets/js/catNames'

const emit = defineEmits(['close', 'cancel', 'save'])
const props = defineProps(['mode', 'loading', 'cat'])

const image = ref('')
const name = ref('')
const description = ref('')

const generateRandomCatName = () => {
  const randomIndex = Math.floor(Math.random() * catNames.length)
  name.value = catNames[randomIndex]
}


onMounted(() => {
  if (props.mode === 'edit') {
    image.value = props.cat?.image
    name.value = props.cat?.name
    description.value = props.cat?.description
  } else {
    image.value = ''
    name.value = ''
    description.value = ''
  }
})

watch(() => image.value, (newVal) => {
  handleCatImage(newVal)
})

const setImage = (event) => {
  image.value = event
}

const removeImage = () => {
  const imgElement = document.getElementById('myImage')
  imgElement.src = ''
  image.value = ''
}

const handleCatImage = (image) => {
  console.log('typeof', typeof image)
  if (typeof image === 'string') {
    return image
  } else {
    console.log('else!')
    handleShowImage(image)
  }
}

const handleShowImage = (event) => {
  const image = event?.target?.files[0]

  if (!image) {
    console.error('No file selected')
    return
  }


  if (image instanceof Blob) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Image = reader.result
      console.log(base64Image)

      const imgElement = document.getElementById('myImage')
      imgElement.src = base64Image
    }

    reader.readAsDataURL(image)
  }
}


const handleModalTitle = () => {
  if (props.mode === 'new') {
    return 'New cat'
  } else {
    return 'Edit cat'
  }
}

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