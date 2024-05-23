<template>
  <div>
    <div class="tabs">
      <span class="tabs0v" v-for="(tab, index) in tabs" :key="index" @click="currentTab = index">
        {{ tab }}
      </span>
    </div>
    <div class="tab-content">
      <div v-if="currentTab === 0">
        <h2>Broń</h2>
      </div>
      <div v-else-if="currentTab === 1">
        <h2>Obrona</h2>
      </div>
      <div v-else-if="currentTab === 2">
        <h2>Przedmioty</h2>
      </div>
      <div v-else-if="currentTab === 3">
        <h2>Śmieci</h2>
      </div>
    </div>
    <div class="inventory">
      <div class="inventory-grid">
        <div
          v-for="(slot, index) in inventorySlots"
          :key="index"
          class="inventory-slot"
          @dragover.prevent
          @drop="onDrop($event, index)"
        >
          <div
            v-if="filteredItems[index]"
            class="inventory-item"
            draggable="true"
            @dragstart="onDragStart($event, filteredItems[index], index)"
          >
            <img v-if="filteredItems[index].img" :src="filteredItems[index].img" :alt="filteredItems[index].name" />
            <p>{{ filteredItems[index].name }}</p>
            <p>{{ filteredItems[index].description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const tabs = ['Broń', 'Obrona', 'Przedmioty', 'Śmieci'];
const currentTab = ref(0);

const gridItems = ref([
  {
    name: 'Pistolet',
    description: 'Mały pistolet kaliber 9mm.',
    img: '/game/items/guns/pistol1.jpg',
    category: 'Broń',
  },
  {
    name: 'Kamizelka kuloodporna',
    description: 'Kamizelka chroniąca przed pociskami.',
    img: '/game/items/vest/vest1.jpg',
    category: 'Obrona',
  },
  {
    name: 'Telefon',
    description: 'Nowoczesny smartfon.',
    img: '/game/items/others/phone1.jpg',
    category: 'Przedmioty',
  },
  {
    name: 'Stare Buty',
    description: 'Podarte stare buty.',
    img: 'path/to/old_shoes.jpg',
    category: 'Śmieci',
  },
  {
    name: 'Karabin',
    description: 'Szybkostrzelny karabin automatyczny.',
    img: '/game/items/guns/rifle1.jpg',
    category: 'Broń',
  },
  {
    name: 'Hełm',
    description: 'Hełm ochronny.',
    img: '/game/items/vest/helmet3.jpg',
    category: 'Obrona',
  },
]);

const inventorySlots = ref(40);
const itemSize = ref(50);
const columns = ref(6);

const draggedItem = ref(null);
const draggedIndex = ref(null);

const filteredItems = computed(() => {
  const category = tabs[currentTab.value];
  const itemsInCategory = gridItems.value.filter(item => item.category === category);
  // Ensure we have the right number of slots by filling with nulls if needed
  return [...itemsInCategory, ...Array(inventorySlots.value - itemsInCategory.length).fill(null)];
});

const onDragStart = (event, item, index) => {
  draggedItem.value = item;
  draggedIndex.value = index;
};

const onDrop = (event, index) => {
  if (draggedIndex.value !== null) {
    const temp = filteredItems.value[index];
    filteredItems.value.splice(index, 1, draggedItem.value);
    filteredItems.value.splice(draggedIndex.value, 1, temp);
    draggedItem.value = null;
    draggedIndex.value = null;
  }
};

onMounted(() => {
  const handleResize = () => {
    const containerWidth = document.querySelector('.inventory-grid').offsetWidth;
    columns.value = Math.floor(containerWidth / (itemSize.value + 10)); // 10 is the gap size
  };
  window.addEventListener('resize', handleResize);
  handleResize();
});
</script>

<style>
:root {
  --item-size: 50px;
  --grid-gap: 10px;
  --columns: 10;
}

.tabs0v {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
}

span {
  width: 100px;
  text-align: center;
  transition: 200ms;
  color: aqua;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
}

.tab-content {
  margin-top: 20px;
}

.inventory {
  margin-top: 20px;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), var(--item-size));
  gap: var(--grid-gap);
}

.inventory-slot {
  width: var(--item-size);
  height: var(--item-size);
  border: 1px solid #ccc;
  background-color: #5a5a5a;
}

.inventory-item {
  text-align: center;
}

.inventory-item img {
  width: 100%;
  height: auto;
}

.inventory-item p {
  font-size: 12px;
  margin: 0;
}
</style>
