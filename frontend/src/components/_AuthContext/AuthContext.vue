<template>
  <div>
    <h2>Wyposażenie Gracza</h2>
    <div class="player-equipment">
      <div class="head equipment-slot"
           @dragover.prevent="allowDrop"
           @drop="dropItem('head')"
           :class="{ 'occupied': equipment.head }">
        <img v-if="equipment.head" :src="equipment.head.image" :alt="equipment.head.name" draggable="true" @dragstart="dragItem(equipment.head, 'head')" @dragend="resetDrag" />
        <div v-else class="empty-slot"></div>
      </div>
      <div class="torso equipment-slot"
           @dragover.prevent="allowDrop"
           @drop="dropItem('torso')"
           :class="{ 'occupied': equipment.torso }">
        <img v-if="equipment.torso" :src="equipment.torso.image" :alt="equipment.torso.name" draggable="true" @dragstart="dragItem(equipment.torso, 'torso')" @dragend="resetDrag" />
        <div v-else class="empty-slot"></div>
      </div>
      <div class="hands equipment-slot"
           @dragover.prevent="allowDrop"
           @drop="dropItem('hands')"
           :class="{ 'occupied': equipment.hands }">
        <img v-if="equipment.hands" :src="equipment.hands.image" :alt="equipment.hands.name" draggable="true" @dragstart="dragItem(equipment.hands, 'hands')" @dragend="resetDrag" />
        <div v-else class="empty-slot"></div>
      </div>
      <div class="legs equipment-slot"
           @dragover.prevent="allowDrop"
           @drop="dropItem('legs')"
           :class="{ 'occupied': equipment.legs }">
        <img v-if="equipment.legs" :src="equipment.legs.image" :alt="equipment.legs.name" draggable="true" @dragstart="dragItem(equipment.legs, 'legs')" @dragend="resetDrag" />
        <div v-else class="empty-slot"></div>
      </div>
      <div class="feet equipment-slot"
           @dragover.prevent="allowDrop"
           @drop="dropItem('feet')"
           :class="{ 'occupied': equipment.feet }">
        <img v-if="equipment.feet" :src="equipment.feet.image" :alt="equipment.feet.name" draggable="true" @dragstart="dragItem(equipment.feet, 'feet')" @dragend="resetDrag" />
        <div v-else class="empty-slot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const equipment = ref({
  head: null,
  torso: null,
  hands: null,
  legs: null,
  feet: null
});

// Przykładowe przedmioty
equipment.value.head = { name: 'Hełm', image: 'https://via.placeholder.com/30x30' };
equipment.value.torso = { name: 'Zbroja', image: 'https://via.placeholder.com/30x30' };
equipment.value.hands = { name: 'Rękawice', image: 'https://via.placeholder.com/30x30' };
equipment.value.legs = { name: 'Spodnie', image: 'https://via.placeholder.com/30x30' };
equipment.value.feet = { name: 'Buty', image: 'https://via.placeholder.com/30x30' };

let draggedItem = null;
let draggedItemType = null;

const dragItem = (item, type) => {
  draggedItem = item;
  draggedItemType = type;
};

const resetDrag = () => {
  draggedItem = null;
  draggedItemType = null;
};

const allowDrop = (event) => {
  event.preventDefault();
};

const dropItem = (type) => {
  if (draggedItem) {
    equipment.value[type] = draggedItem;
    resetDrag();
  }
};
</script>

<style scoped>
.player-equipment {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.equipment-slot {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.equipment-slot img {
  max-width: 100%;
  max-height: 100%;
}

.empty-slot {
  background-color: #f0f0f0;
}

.occupied:after {
  content: '🟢'; /* Symbolizuje zajęte miejsce */
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
