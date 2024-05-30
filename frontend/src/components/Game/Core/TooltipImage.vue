<template>
  <div
    class="tooltip-image-container"
    :style="containerStyle"
  >
    <img
      :src="imageSrc"
      class="gun"
      @mouseover="showtip"
      @mouseleave="hidetip"
      @mousemove="updatetipPosition"
    />
    <div v-if="visible" class="tooltip" :style="tooltipStyle">
      <img class="img-items" :src="imageSrc" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  posx: {
    type: Number,
    required: true
  },
  posy: {
    type: Number,
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
  transform: 'translate(-40%, -40%)',
});

const containerStyle = computed(() => ({
  position: 'absolute',
  top: `${props.posx}px`,
  left: `${props.posy}px`,
}));

const showtip = () => {
  visible.value = true;
};

const hidetip = () => {
  visible.value = false;
};

const updatetipPosition = (event: MouseEvent) => {
  const containerRect = event.currentTarget.getBoundingClientRect();
  const tooltipWidth = tooltipStyle.value.width || 150; // Domyślna wartość, jeśli width nie jest zdefiniowane
  const tooltipHeight = tooltipStyle.value.height || 150; // Domyślna wartość, jeśli height nie jest zdefiniowane

  tooltipStyle.value.top = `${event.clientY - containerRect.top - tooltipHeight}px`;
  tooltipStyle.value.left = `${event.clientX - containerRect.left - tooltipWidth / 2}px`;
};

onMounted(() => {
  tooltipStyle.value.width = document.querySelector('.tooltip')?.clientWidth || 100; // Pobieranie szerokości tooltipa po załadowaniu komponentu
});
</script>

<style scoped>
.img-items{
  
}
.tooltip-image-container {
  display: inline-block;
}

.gun {
  cursor: pointer;
  transition: transform 200ms;
}

.gun:hover {
  filter: drop-shadow(2px 2px 10px rgb(211, 93, 24));
}

.tooltip {
  /* position: fixed; */
  background-color: var(--RGBA-BLACK-50);
  width: 300px;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
