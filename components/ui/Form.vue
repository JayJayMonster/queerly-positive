<template>
    <div class="container mx-auto">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <input v-model="formData.link" placeholder="Url" class="w-full p-2 border rounded"/>
        </div>
        <div class="mb-4">
          <input v-model="formData.title" placeholder="Title" class="w-full p-2 border rounded"/>
        </div>
        <div class="mb-4">
          <input v-model="formData.description" placeholder="Description" class="w-full p-2 border rounded"/>
        </div>
        <div class="mb-4">
          <input v-model="formData.year" placeholder="Publication date" class="w-full p-2 border rounded"/>
        </div>
        <div class="flex mb-4">
          <div class="mr-2">
            <input v-model="formData.latitude" placeholder="Latitude" class="w-full p-2 border rounded"/>
          </div>
          <div class="ml-2">
            <input v-model="formData.longitude" placeholder="Longitude" class="w-full p-2 border rounded"/>
          </div>
        </div>
        <div class="mb-4">
          <fieldset>
            <legend>Tag:</legend>
            <div class="grid grid-cols-3 gap-3">
              <div v-for="tag in tags" :key="tag" class="flex items-center">
                <input type="radio" :id="tag" :value="tag" v-model="formData.tag" class="mr-1">
                <label :for="tag">{{ tag }}</label>
              </div>
            </div>
          </fieldset>
        </div>
        <NuxtLink @click="updateFormData(formData)" class="flex flex-row items-center cursor-pointer px-14 content-evenly">
          Send new article
          <div class="svg-component">
            <Plus />
          </div>
        </NuxtLink>
      </form>
    </div>
  </template>
  
  
<script setup>
import { defineEmits } from 'vue'; // Import defineEmits from Vue 3
import Plus from '@/assets/svg/plus.svg'

const tags = ['LGBTQ', 'Gay','Lesbian', 'Trans', 'Resistance', 'Laws', 'Media', 'Sports', 'Pride'];
const tagColors = {
  'LGBTQ': '#E81416',
  'Gay': '#FFA500',
  'Lesbian': '#FAEB36',
  'Trans': '#BAD725',
  'Resistance': "#61A07E",
  'Laws': '#487DE7',
  'Media': '#4A5AC2',
  'Sports': '#4B369D',
  'Pride': '#70369D',
};
const emit = defineEmits(['submit']);

const getTagColor = (tag) => {
  return tagColors[tag] || null;
};

const formData =ref({
    title: '',
    description:'',
    year: '',
    tag: '',
    link: '',
    coordinates: [],
});

const updateFormData = async formData => {
  const { postArticleApi } = useArticlesApi();
  const { data } = await postArticleApi('articles', {
    method: 'POST',
    body: {
      title: formData.title,
      description: formData.description,
      year: formData.year,
      tag: formData.tag,
      link: formData.link,
      coordinates: [formData.longitude, formData.latitude],
      color: getTagColor(formData.value.tag), // Add color property based on selected tag
    },
  });
  emit('submit', data);
  console.log(data);
};
</script>
  
<style scoped>
  /* Add custom styles here */
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
</style>