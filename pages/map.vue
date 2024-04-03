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
        <a
          v-for="category in categories"
          :key="category"
          @click="filterItems(category)"
          class="flex items-center cursor-pointer border-black border-2 p-1 rounded"
        >
          <UiMarker :fill="getMarkerColor(category)" />
          {{ category }}
        </a>
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

  const filterTag = ref('All');
  const hover = ref(false);

const categories = ['LGBTQ', 'Gay','Lesbian', 'Trans', 'Laws', 'Media', 'Sports', 'Pride', 'All'];

const filterItems = (tag) => {
  console.log(`Filtering items by ${tag}`);
  filterTag.value = tag;
};

const filteredArticles = computed(() => {
    const tag = filterTag.value;
    if (tag === 'All') {
      return articles.map((article) => ({
        ...article,
        color: getMarkerColor(article.tag),
      }));
    } else {
      return articles.filter((article) => article.tag.includes(tag)).map((article) => ({
        ...article,
        color: getMarkerColor(article.tag),
      }));
    }
  });

  const getMarkerColor = (tag) => {
    const colorMap = {
      'LGBTQ': '#E81416',
      'Gay': '#FFA500',
      'Lesbian': '#FAEB36',
      'Trans': '#BAD725',
      'Laws': '#61A07E',
      'Media': '#487DE7',
      'Sports': '#4A5AC2',
      'Pride': '#4B369D',
      'All': '#70369D',
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
</style>

