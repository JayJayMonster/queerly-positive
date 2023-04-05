<template>
  <MapboxMap 
    access-token="pk.eyJ1Ijoiamptb25zdGVyIiwiYSI6ImNsZnYwd3I3dzAyc28zZXBrdHZ3d281b2cifQ.rrueXCO64olGrxsW7Y30Xg"
    style="height: 900px"
    map-style="mapbox://styles/jjmonster/clg3jrdz1007h01oalb7fuvlm"
    :center="[-122.4194, 37.7749]"
    :zoom="3">
    <!-- <MapboxMarker :lng-lat="[12, 30]" popup color="#FF00FF">
        <template v-slot:popup>
        <h1>Nieuwsartikel</h1>
        <p>tekst tekst tekst</p>
    </template>
</MapboxMarker>
<MapboxMarker :lng-lat="[20, 52]" popup color="#0000FF">
    <template v-slot:popup>
        <h1>Nieuwsartikel 2</h1>
        <p>tekst tekst tekst</p>
    </template>
</MapboxMarker>
<MapboxMarker :lng-lat="[36, 42]" popup color="#00FFFF">
    <template v-slot:popup>
        <h1>Nieuwsartikel 3</h1>
        <p>tekst tekst tekst</p>
      </template>
    </MapboxMarker> -->
      <MapboxMarker v-for="(feature, index) of geojson.features" :key="index" 
      :lng-lat="feature.geometry.coordinates" :color= "feature.properties.color"
      >
        <template v-slot:popup>
          <h1>{{ feature.properties.title }}</h1>
          <p>{{ feature.properties.description }}</p>
        </template>
      </MapboxMarker>
  </MapboxMap>
</template>

<script setup>
  import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
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

