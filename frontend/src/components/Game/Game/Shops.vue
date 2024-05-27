<template>
  <div>
    <div class="tabs">
      <span class="tabs0v" v-for="(shop, index) in shops" :key="index" @click="currentShop = index">
        {{ shop.name }}
      </span>
    </div>
    <div class="tab-content">
      <div v-if="currentShop === 0">
        <GunshopChoose />
        <router-view name="gunshops"></router-view>
      </div>
      <div v-else-if="currentShop === 1">
        <h2>Sklep z odzieżą</h2>
      </div>
      <div v-else-if="currentShop === 2">
        <h2>Sklep spożywczy</h2>
      </div>
      <!-- Dodaj tutaj kolejne bloki div v-else-if dla innych sklepów -->
    </div>
    <div class="inventory">
      <div class="inventory-grid">
        <div v-for="(item, index) in filteredItems" :key="index" class="inventory-slot" @dragover.prevent
          @drop="onDrop($event, index)">
          <div v-if="item" class="inventory-item" draggable="true" @dragstart="onDragStart($event, item, index)">
            <img v-if="item.img_url" :src="'/game/items/' + item.category.toLowerCase() + '/' + item.img_url"
              :alt="item.name" />
            <p>{{ item.name }}</p>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import GunshopChoose from './Shops/GunshopChoose.vue';

const shops = [
  { name: 'Sklep z bronią', category: 'Weapon' },
  { name: 'Sklep z odzieżą', category: 'Defense' },
  { name: 'Sklep spożywczy', category: 'Food' },
  { name: 'Salon samochodowy', category: 'Cars' },
  // Dodaj tutaj kolejne sklepy w razie potrzeby
];

const currentShop = ref(0);

const inventorySlots = ref(40);
const itemSize = ref(50);
const columns = ref(6);

const draggedItem = ref(null);
const draggedIndex = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`/api/items?category=${shops[currentShop.value].category}`);
    filteredItems.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

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
  fetchData();

  const handleResize = () => {
    const containerWidth = document.querySelector('.inventory-grid').offsetWidth;
    columns.value = Math.floor(containerWidth / (itemSize.value + 10)); // 10 is the gap size
  };
  window.addEventListener('resize', handleResize);
  handleResize();
});
</script>

<style>
/* Dodaj tutaj style */
</style>
