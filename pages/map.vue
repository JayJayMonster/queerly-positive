<template>
  <div  
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="bg-gray-300/50 absolute z-10 left-0 top-0 px-4 py-4 m-8 rounded transition-all duration-300 ease-in-out">
    <h1 class="text-center font-bold text-3xl text-black font-headers">Queerly Positive</h1>
    <div class="text-center text-lg font-light italic text-gray-700 font-headers">Spreading queer positivity, </div>
    <div class="text-center text-lg pb-2 font-light italic text-gray-700 font-headers">one story at a time</div>
    <hr class="h-px bg-gray-700 border-0">
    <div>
      <h1 
      class="text-center py-2 text-md font-semibold cursor-pointer font-headers">Filter by category</h1>
      <div 
      v-if="hover"
      class="grid grid-flow-row gap-4"
      >
      <NuxtLink
          v-for="category in categories"
          :key="category"
          @click="toggleActiveClass(category)"
          :style="{ backgroundColor: filterTag.includes(category) ? getMarkerColor(category) : 'transparent' }"
          :class="{'selected': filterTag.includes(category)}"
          class="flex items-center cursor-pointer border-black border-2 p-1 rounded"
        >
          <UiMarker :fill="getMarkerColor(category)" />
          {{ category }}
        </NuxtLink>
      </div>
    </div>
  </div>
  <MapboxMap 
    access-token="pk.eyJ1Ijoiamptb25zdGVyIiwiYSI6ImNsZnYwd3I3dzAyc28zZXBrdHZ3d281b2cifQ.rrueXCO64olGrxsW7Y30Xg"
    style="height: 900px"
    map-style="mapbox://styles/jjmonster/clg3jrdz1007h01oalb7fuvlm"
    :center="[4.4194, 50.7749]"
    :zoom="4">
    <template v-slot:default="{ markers }">
      <MapboxMarker
        v-for="(article, index) in filteredArticles"
        :key="`${article._id}.${index}`"
        :lng-lat="article.coordinates"
        :color="article.color"
      >
        <template v-slot:popup class="px-4 rounded-md">
          <div class="overflow-x-hidden">
              <h1 class="text-xl font-semibold pb-2 text-gray-900 font-body">{{ article.title }}</h1>
              <p class="text-sm italic text-gray-700 font-light pb-1 font-body">{{ article.year }}</p>
              <p class="text-sm text-gray-800 pb-2 font-body">{{ article.description }}</p>
              <a class="text-sm text-gray-700 italic break-all font-light hover:underline font-body" :href="article.link" target="_blank">{{ article.link }}</a>
            </div>
        </template>
      </MapboxMarker>
    </template>
  </MapboxMap>
</template>

<script setup>
  import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const { getArticleApi } = useArticlesApi();
  const {items : articles } = await getArticleApi();

  const filterTag = ref([]);
  const hover = ref(false);

const categories = ['LGBTQ', 'Gay','Lesbian', 'Trans', 'Resistance', 'Laws', 'Media', 'Sports', 'Pride'];
  
// Function to filter articles based on selected tags
const filteredArticles = computed(() => {
    if (!filterTag.value.length) return articles; // Return all articles if no filters selected
    return articles.filter((article) => filterTag.value.includes(article.tag)).map((article) => ({
      ...article,
      color: getMarkerColor(article.tag),
    }));
  });

 // Function to toggle active filter class and update filter tag
 const toggleActiveClass = (tag) => {
    console.log(`Toggling ${tag}`);
    const index = filterTag.value.indexOf(tag);
    if (index === -1) {
      filterTag.value.push(tag); // If tag not in the array, add it
    } else {
      filterTag.value.splice(index, 1); // If tag already in the array, remove it
    }
  };

  // Function to get marker color based on tag
  const getMarkerColor = (tag) => {
    const colorMap = {
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
    return colorMap[tag] || null;
  };
</script>

<style>
.mapboxgl-popup-close-button {
  padding-right: 8px; /* Adjust the padding value as needed */
}

.mapboxgl-marker:hover {
   /* Adjust the opacity of the fill color */
   fill-opacity: 0.5; /* Change the opacity value as desired */
  /* Add transition for smooth animation */
  transition: fill-opacity 0.3s ease;
}

a:hover {
  fill-opacity: 0.5;
}

.selected {
  font-weight: bold;
  color: black;
  font-size: 1.1rem; /* Increase font size */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Add box-shadow */
}
</style>

