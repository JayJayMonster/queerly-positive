<template>
  <MapboxMap 
    access-token="pk.eyJ1Ijoiamptb25zdGVyIiwiYSI6ImNsZnYwd3I3dzAyc28zZXBrdHZ3d281b2cifQ.rrueXCO64olGrxsW7Y30Xg"
    style="height: 900px"
    map-style="mapbox://styles/jjmonster/clg3jrdz1007h01oalb7fuvlm"
    :center="[4.4194, 50.7749]"
    :zoom="4">
      <MapboxMarker v-for="(article, index) of articles" :key="index" 
      :lng-lat="article.coordinates" :color= "article.color"
      >
        <template v-slot:popup>
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <p>{{ article.link }}</p>
        </template>
      </MapboxMarker>
  </MapboxMap>
</template>

<script setup>
  import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const { getArticleApi } = useArticlesApi();
  const {items : articles } = await getArticleApi();
  // console.log(articles);
//   const articlesStore = useArticlesStore();

// articlesStore.items = articles;
// console.log(articlesStore.value);

// try {
//   const { data: articles } = await getArticleApi();
//   console.log(articles);
// } catch (error) {
//   console.log(error);
// }


  const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.500570, 51.909993]
      },
      properties: {
        title: 'Newsarticle 1',
        description: 'Washington, D.C.',
        color: '#ff00ff',
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Newsarticle 2',
        description: 'San Francisco, California',
        color: '#00ff00',
      }
    }
  ]
};


</script>

<style scoped>
  p {
    color: #333;
  }
  .marker-red {
  background-color: red;
}

.marker-blue {
  background-color: blue;
}

.marker-green {
  background-color: green;
}
</style>

