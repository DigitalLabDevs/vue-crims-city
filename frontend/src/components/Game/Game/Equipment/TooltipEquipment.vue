<!-- Tooltip.vue -->
<template>
  <div class="tooltip" v-if="showTooltip" @mouseleave="hideTooltip">
    <img :src="`/game/items/${props.item.img_url}`" alt="Item" class="tooltip-img" />
    <div class="tooltip-info">
      <h3>{{ props.item.name }}</h3>
      <p>{{ props.item.description }}</p>
      <!-- Dodaj więcej właściwości, jeśli są dostępne -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showTooltip = ref(false);

const hideTooltip = () => {
  showTooltip.value = false;
};

const props = defineProps({
  item: {
    type: Object
  }
});
</script>

<style scoped>
.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 999;
}

.tooltip-img {
  max-width: 100px;
}

.tooltip-info {
  margin-top: 5px;
}
</style>
