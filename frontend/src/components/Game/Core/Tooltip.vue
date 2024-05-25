<template>
  <div
    class="tooltip-image"
    :style="containerStyle"
  >

    <div v-if="visible" class="tooltipo" :style="tooltipStyle">
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

const showTooltip = () => {
  visible.value = true;
};

const hideTooltip = () => {
  visible.value = false;
};

const updateTooltipPosition = (event: MouseEvent) => {
  const containerRect = event.currentTarget.getBoundingClientRect();
  const tooltipWidth = tooltipStyle.value.width || 150; // Domyślna wartość, jeśli width nie jest zdefiniowane
  const tooltipHeight = tooltipStyle.value.height || 150; // Domyślna wartość, jeśli height nie jest zdefiniowane

  tooltipStyle.value.top = `${event.clientY - containerRect.top - tooltipHeight}px`;
  tooltipStyle.value.left = `${event.clientX - containerRect.left - tooltipWidth / 2}px`;
};

onMounted(() => {
  tooltipStyle.value.width = document.querySelector('.tooltipo')?.clientWidth || 100; // Pobieranie szerokości tooltipa po załadowaniu komponentu
});
</script>

<style scoped>
.img-items{
  
}
.tooltip-image {
  display: inline-block;
}

.gun {
  cursor: pointer;
  transition: transform 200ms;
}

.gun:hover {
  filter: drop-shadow(2px 2px 10px rgb(211, 93, 24));
}

.tooltipo {
  /* position: fixed; */
  background-color: rgba(0, 0, 0, 0.5);
  width: 300px;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
