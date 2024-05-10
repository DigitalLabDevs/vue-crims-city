<template>
  <div class="galaxy-map"
       @mousedown="handleMouseDown"
       @mousemove="handleMouseMove"
       @mouseup="handleMouseUp"
       @mouseleave="handleMouseUp"
       @wheel.prevent="handleWheelZoom"
       :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
    <div class="map-container" :style="mapStyle">
      <div class="city" v-for="city in cities" :key="city.id" :style="{ top: city.y + 'px', left: city.x + 'px' }">
        <span class="city-name">{{ city.name }}</span>
        <span class="city-population">{{ city.population }}</span>
      </div>
    </div>
    <div class="controls">
      <button @click="zoomIn">Powiększ</button>
      <button @click="zoomOut">Pomniejsz</button>
      <button @click="centerMap">Wyśrodkuj</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { throttle } from 'lodash-es'; // Import lodash throttle function

const cities = ref([
  { id: 1, name: "Katowice", population: 299261, x: 50, y: 19 },
  { id: 2, name: "Kraków", population: 766698, x: 150, y: 119 },
  { id: 3, name: "Wrocław", population: 643866, x: 251, y: 217 },
  { id: 4, name: "Poznań", population: 572053, x: 352, y: 316 },
  { id: 5, name: "Gdańsk", population: 470861, x: 454, y: 418 },
]);

const zoomLevel = ref(1);
const mapCenter = reactive({ x: 0, y: 0 });

let isDragging = false;
let lastMousePos = { x: 0, y: 0 };

const mapStyle = computed(() => ({
  transform: `scale(${zoomLevel.value}) translate(-${mapCenter.x}px, -${mapCenter.y}px)`
}));

const handleMouseDown = (event) => {
  isDragging = true;
  lastMousePos = { x: event.clientX, y: event.clientY };
};

const handleMouseMove = throttle((event) => {
  if (isDragging) {
    const deltaX = event.clientX - lastMousePos.x;
    const deltaY = event.clientY - lastMousePos.y;
    mapCenter.x += deltaX / zoomLevel.value;
    mapCenter.y += deltaY / zoomLevel.value;
    lastMousePos = { x: event.clientX, y: event.clientY };
  }
}, 10); // Throttle the mouse move event to improve performance

const handleMouseUp = () => {
  isDragging = false;
};

const handleWheelZoom = (event) => {
  const delta = event.deltaY * -0.01;
  const newZoomLevel = zoomLevel.value + delta;
  zoomLevel.value = Math.max(1, Math.min(newZoomLevel, 5)); // Limit zoom level between 1 and 5
};

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 5);
};

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 1);
};

const centerMap = () => {
  mapCenter.x = 0;
  mapCenter.y = 0;
};

</script>

<style scoped>
.galaxy-map {
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.map-container {
  position: absolute;
  transition: transform 0.3s ease;
}

.city {
  position: absolute;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-name {
  font-weight: bold;
}

.city-population {
  color: #666;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
