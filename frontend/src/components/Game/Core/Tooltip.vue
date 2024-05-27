<template>
  <div 
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  
  >
    <slot></slot>
    <div v-if="visible" class="tooltip-content" :style="tooltipStyle">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  description: {
    type: String,
    required: true
  }
});

const visible = ref(false);

const tooltipStyle = ref({
  position: 'absolute',
  top: '0px',
  left: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '4px',
  pointerEvents: 'none',
  zIndex: 1000,
  transform: 'translate(10px, 10px)',
});

const showTooltip = () => {
  visible.value = true;
};

const hideTooltip = () => {
  visible.value = false;
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  white-space: nowrap;
}
</style>
