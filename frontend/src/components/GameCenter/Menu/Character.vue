<template>
  <div>
    <h2>Wyposażenie</h2>
    <div class="equipment-grid">
      <div
        v-for="(item, index) in equipment"
        :key="index"
        class="equipment-item"
        @dragover.prevent="allowDrop"
        @drop="dropItem(index)"
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          draggable="true"
          @dragstart="dragItem(item, index)"
          @dragend="resetDrag"
        />
        <div
          v-else
          class="empty-slot"
          draggable="false"
          @dragover.prevent="allowDrop"
          @drop="dropItem(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const equipment = ref(Array(48).fill({ name: '', image: '' })); // 8x6 grid

// Przykładowe przedmioty
equipment.value[0] = { name: 'Miecz', image: 'https://via.placeholder.com/30x30' };
equipment.value[1] = { name: 'Tarcza', image: 'https://via.placeholder.com/30x30' };
equipment.value[5] = { name: 'Zbroja', image: 'https://via.placeholder.com/30x30' };

let draggedItem = null;
let draggedItemIndex = null;

const dragItem = (item, index) => {
  draggedItem = item;
  draggedItemIndex = index;
};

const resetDrag = () => {
  draggedItem = null;
  draggedItemIndex = null;
};

const allowDrop = (event) => {
  event.preventDefault();
};

const dropItem = (index) => {
  if (draggedItem) {
    equipment.value[draggedItemIndex] = equipment.value[index];
    equipment.value[index] = draggedItem;
    resetDrag();
  }
};
</script>

<style scoped>
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(8, 30px);
  grid-template-rows: repeat(6, 30px);
  gap: 5px;
}

.equipment-item {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.equipment-item img {
  max-width: 100%;
  max-height: 100%;
}

.empty-slot {
  background-color: #f0f0f0;
}
</style>