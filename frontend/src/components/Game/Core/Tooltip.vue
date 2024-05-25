<template>
  <div v-if="visible" :style="tooltipStyle" class="tooltip-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

// Props
const props = defineProps({
  visible: Boolean
});

const tooltipStyle = ref({
  position: 'absolute',
  top: '0px',
  left: '0px',
  transform: 'translate(10px, 10px)',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '4px',
  pointerEvents: 'none',
  zIndex: 1000
});

const updateTooltipPosition = (event: MouseEvent) => {
  tooltipStyle.value.top = `${event.clientY}px`;
  tooltipStyle.value.left = `${event.clientX}px`;
};

onMounted(() => {
  window.addEventListener('mousemove', updateTooltipPosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateTooltipPosition);
});
</script>

<style scoped>
.tooltip-content {
  z-index: 1000;
}
</style>
