<template>
  <div class="bg-gray-300/50 absolute z-10 right-0 top-10 px-4 py-2 m-8 rounded">
    <h1 class="text-center pb-2">Filter by category</h1>
    <div class="grid grid-flow-col gap-4">
      <a
        v-for="category in categories"
        :key="category"
        @click="filterItems(category)"
        class="flex flex-row justify-center cursor border-black border-2 p-1 rounded &focus {outline-0} &active {outline-0} outline-0"
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
        :key="index"
        :lng-lat="article.coordinates"
        :color="article.color"
      >
        <template v-slot:popup class="px-4 py-2 rounded truncate">
          <h1 class="bold text-lg pb-2">{{ article.title }}</h1>
          <p class="pb-2">{{ article.description }}</p>
          <a :href="article.link" target="_blank">{{ article.link }}</a>
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

const categories = ['Lesbian', 'Gay', 'LGBTQ+', 'Laws', 'All'];

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
      'Lesbian': '#36AE7C',
      'Gay': '#F9D923',
      'LGBTQ+': '#EB5353',
      'Laws': '#8E499D',
      'All': '#3B3A39',
    };
    return colorMap[tag] || null;
  };
</script>

