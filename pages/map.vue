<template>
  <MapboxMap 
    access-token="pk.eyJ1Ijoiamptb25zdGVyIiwiYSI6ImNsZnYwd3I3dzAyc28zZXBrdHZ3d281b2cifQ.rrueXCO64olGrxsW7Y30Xg"
    style="height: 900px"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="[25, 40]"
    :zoom="4">
    <MapboxMarker :lng-lat="[12, 30]" popup color="#FF00FF">
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
    </MapboxMarker>
    </MapboxMap>
</template>

<script setup>
  import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<style scoped>
  p {
    color: #333;
  }
</style>

