<template>
 <div class="cat-card border-stroke border rounded-2xl p-5 w-[300px]">
    <img :src="cat.image" alt="" class="w-full rounded-2xl mx-auto h-[230px] object-cover">
    <span class="block mt-5 text-lg font-bold">{{ cat.name }}</span>
    <span class="block mt-2 text-light-gray-2 font-medium h-[100px] m-h-[100px] overflow-y-auto">{{ cat.description }}</span>
    <button class="py-4 w-full bg-primary text-white mt-5 rounded-lg hover:brightness-105 transition-all">Adopt</button>
 </div>
</template>

<script setup>

defineProps({
  cat: Object,
})

</script>