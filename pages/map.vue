<template>
  <div class="bg-gray-300/50 absolute z-10 left-0 top-0 px-4 py-4 m-8 rounded">
    <h1 class="text-center bold text-xl">QUEERLY POSITIVE</h1>
    <div class="text-center bold italic text-gray-700">Spreading queer positivity, </div>
    <div class="text-center pb-2 bold italic text-gray-700">one story at a time</div>
    <hr class="h-px bg-gray-700 border-0">
    <h1 class="text-center pb-2">Filter by category</h1>
    <div class="grid grid-flow-row gap-4">
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
        <template v-slot:popup class="px-4 rounded-md truncate overflow-hidden">
          <div class="overflow-x-auto">
            <h1 class="bold text-lg pb-2">{{ article.title }}</h1>
            <p class="italic text-gray-700 pb-2 ">{{ article.year }}</p>
            <p class="pb-2">{{ article.description }}</p>
            <a class="text-gray-500 italic" :href="article.link" target="_blank">{{ article.link }}</a>
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

const categories = ['LGBTQ+', 'Gay','Lesbian', 'Transgender', 'Laws', 'All'];

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
      'LGBTQ+': '#EB5353',
      'Gay': '#F9D923',
      'Lesbian': '#36AE7C',
      'Transgender': '#187498',
      'Laws': '#8E499D',
      'All': '#3B3A39',
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

