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
                <NuxtLink 
                    @click="updateFormData(formData)"
                    class="flex flex-row items-center cursor-pointer px-14 content-evenly	 ">Send new article
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
const emit = defineEmits(['submit']);

const formData =ref({
    title: '',
    description:'',
    year: '',
    tag: '',
    link: '',
});

const updateFormData = async formData => {
  const { postArticleApi } = useArticlesApi();
  const { data } = await postArticleApi('articles', {
    method: 'POST',
    body: {
      title: formData.value.title,
      description: formData.value.description,
      year: formData.value.year,
      tag: formData.value.tag,
      link: formData.value.link,
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