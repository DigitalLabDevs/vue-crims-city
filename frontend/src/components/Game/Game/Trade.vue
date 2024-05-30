<template>
  <div>
    <div class="info">
      Wyświetlone sloty: {{ inventory.length }} / {{ totalSlots }}
    </div>
    <div class="container">
      <div v-for="(item, index) in inventory" :key="index" class="square" @drop="onDrop(index)" @dragover.prevent="onDragOver(index)">
        <img v-if="item.img_url" :src="`/game/items/${item.img_url}`" class="draggable" draggable="true" @dragstart="onDragStart(index)" />
        <div v-if="item.img_url">{{ item.name }}</div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getConfig } from 'config';

const config = getConfig();

// Stałe
const totalSlots = 8;

// Inicjalizacja ekwipunku
const inventory = ref([]);

const dragSourceIndex = ref(null)

const onDragStart = (index) => {
  dragSourceIndex.value = index
}

const onDrop = (targetIndex) => {
  if (dragSourceIndex.value !== null && dragSourceIndex.value !== targetIndex) {
    // Zamień miejscami elementy
    const temp = inventory.value[targetIndex];
    inventory.value[targetIndex] = inventory.value[dragSourceIndex.value];
    inventory.value[dragSourceIndex.value] = temp;

    // Zapisz nowe pozycje do bazy danych
    savePositionToDatabase(inventory.value[targetIndex]);
    savePositionToDatabase(inventory.value[dragSourceIndex.value]);

    dragSourceIndex.value = null;
  }
};

const onDragOver = (index) => {
  // Optional: Add some visual indication for the drop target
}

// Mock funkcja do zapisu pozycji do bazy danych
const savePositionToDatabase = (square) => {
  console.log(`Zapisz pozycję: ${square.position} dla elementu: ${square.desc}`)
}

onMounted(async () => {
  await getPlayerSlots();
});

const getPlayerSlots = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/player-slots`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers
    });
    if (response.ok) {
      const slots = await response.json();

      console.log(slots);
      inventory.value = slots; // Ustawienie danych ekwipunku
      while (inventory.value.length < totalSlots) {
        inventory.value.push({ img_url: null, name: null, description: null });
      }

    }
  } catch (error) {
    console.error("Error Bank:", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.square {
  width: 50px;
  height: 50px;
  border: 1px dashed #1cada8;
  display: inline-block;
  align-items: center;
  justify-content: center;
  background-color: var(--BLACK50);
}

.square img {
  max-width: 100%;
  max-height: 100%;
}

.info {
  margin-bottom: 10px;
}
</style>
