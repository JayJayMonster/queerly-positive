<template>
        <div v-if="showForm">
            <button @click="toggleForm" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
      <Circle class="w-6 h-6"/>
    </button>
            <form @submit.prevent="submitForm">
                <div class="mb-2">
          <input required v-model="formData.link" placeholder="Url" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
        </div>
        <div class="mb-2">
          <input required v-model="formData.title" placeholder="Title" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
        </div>
        <div class="mb-2">
          <input required v-model="formData.description" placeholder="Description" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
        </div>
        <div class="mb-2">
          <input required v-model="formData.year" placeholder="Publication date" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
        </div>
        <div class="flex mb-2">
          <div class="mr-2">
            <input required v-model="formData.latitude" placeholder="Latitude" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
          </div>
          <div class="ml-2">
            <input required v-model="formData.longitude" placeholder="Longitude" class="w-full border-b border-gray-500 bg-transparent placeholder-gray-700"/>
          </div>
        </div>
                <div class="mb-2">
                    <fieldset>
                        <legend>Tag:</legend>
                        <div class="grid grid-cols-3 gap-1">
                            <div v-for="tag in tags" :key="tag" class="flex items-center">
                                <input required type="radio" :id="tag" :value="tag" v-model="formData.tag" class="mr-1">
                                <label :for="tag">{{ tag }}</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <NuxtLink @click="toggleForm;updateFormData(formData)" class="flex flex-row items-center cursor-pointer px-12 content-evenly">
                    Send new article
                    <div class="svg-component">
                        <Right class="w-5 h-5"/>
                    </div>
                </NuxtLink>
            </form>
        </div>
        <div v-else>
      <NuxtLink @click="toggleForm" class="flex flex-row items-center cursor-pointer px-12 content-evenly">
        Add new article
        <div class="svg-component">
          <Plus class="w-5 h-5"/>
        </div>
      </NuxtLink>
    </div>
  </template>
  
  
<script setup>
import { defineEmits } from 'vue'; // Import defineEmits from Vue 3
import Plus from '@/assets/svg/plus.svg'
import Circle from '@/assets/svg/x-circle.svg'
import Right from '@/assets/svg/arrow-right.svg'

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

let showForm = ref(false);

const toggleForm = () => {
    showForm.value = !showForm.value; // Update the value of showForm
};

const formData =ref({
    coordinates: [],
    title: '',
    description:'',
    year: '',
    tag: '',
    link: '',
});

const updateFormData = async formData => {
  const { postArticleApi } = useArticlesApi();
  const { data } = await postArticleApi({
        coordinates: [formData.longitude, formData.latitude],
        title: formData.title,
        description: formData.description,
        year: formData.year,
        color: getTagColor(formData.tag), // Add color property based on selected tag
        tag: formData.tag,
        link: formData.link,
  });
  emit('submit', data);
  console.log(data);
  // Reset form data after successful submission
  resetFormData();
};

const resetFormData = () => {
    formData.value = {
        coordinates: [],
        title: '',
        description: '',
        year: '',
        tag: '',
        link: '',
    };
};

</script>
  
<style scoped>
  /* Add custom styles here */
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
</style>