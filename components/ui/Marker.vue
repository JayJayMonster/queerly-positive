<template>
  <div class="svg-component">
    <MapPinLine :fill="fill" @click="$emit('marker-clicked', tag)"/>
  </div>
</template>

<script>
import MapPinLine from '@/assets/svg/map-marker.svg';

export default {
  name: 'SvgComponent',
  components: {
    MapPinLine,
  },
  props: {
    fill: {
      type: String,
      default: '#FFFF00',
    },
    tag: {
      type: String,
      default: ''
    },
  },
};
</script>