<template>
  <div>
    <div class="tabs">
      <span class="tabs0v" v-for="(tab, index) in tabsTranslation" :key="index" @click="currentTab = index">
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
        <Loader v-if="isLoading" />
        <div
          v-else
          v-for="(slot, index) in inventorySlots"
          :key="index"
          class="inventory-slot"
          draggable="true"
          @dragover.prevent
          @drop="onDrop($event, index)"
        >
          <div
            v-if="filteredItems[currentTab][index]"
            class="inventory-item"
            draggable="true"
            @dragstart="onDragStart($event, filteredItems[currentTab][index], index)"
          >
            <img 
            :title="`${filteredItems[currentTab][index].name} - ${filteredItems[currentTab][index].description}`" v-if="filteredItems[currentTab][index].img_url" 
            :src="`/game/items/${filteredItems[currentTab][index].img_url}`" :alt="filteredItems[currentTab][index].name" />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

import Loader from '../../_Core/Loader.vue';
import { API_URL } from '../../../config';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Przykładowe kategorie pobrane z bazy danych
const categoriesFromDatabase = ['Weapon', 'Defense', 'Items', 'Trash'];

// Obiekt z przetłumaczonymi nazwami kategorii
const translatedCategories = {
  Weapon: t('category.Weapon'),
  Defense: t('category.Defense'),
  Items: t('category.Items'),
  Trash: t('category.Trash')
};

// Użyj nazw kategorii po angielsku w twojej aplikacji
const tabs = categoriesFromDatabase;

// Użyj przetłumaczonych nazw kategorii do wyświetlania
const tabsTranslation = Object.values(translatedCategories);

const isLoading = ref(true);
const currentTab = ref(0);

const gridItems = ref(Array.from({ length: 4 }, () => [])); // Inicjalizacja tablicy 2D dla każdej kategorii
const inventorySlots = ref(40);
const itemSize = ref(50);
const columns = ref(6);

const draggedItem = ref(null);
const draggedIndex = ref(null);

const fetchItems = async () => {
  try {
    const promises = categoriesFromDatabase.map(async (category, index) => {
      const response = await fetch(`${API_URL}/game/player-items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category })
      });
      const data = await response.json();
      console.log(data);
      gridItems.value[index] = data;
    });
    await Promise.all(promises);
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

const filteredItems = computed(() => {
  return gridItems.value.map(itemsInCategory => {
    return [...itemsInCategory, ...Array(inventorySlots.value - itemsInCategory.length).fill(null)];
  });
});

// Dodaj obserwację zmiany currentTab
watch(currentTab, () => {
  // Wywołaj ponownie computed property filteredItems, aby ponownie obliczyć wartość
  filteredItems.value;
});

const onDragStart = (event, item, index) => {
  draggedItem.value = item;
  draggedIndex.value = index;
};

const onDrop = (event, index) => {
  if (draggedIndex.value !== null) {
    const temp = filteredItems[currentTab.value][index];
    filteredItems[currentTab.value].splice(index, 1, draggedItem.value);
    filteredItems[currentTab.value].splice(draggedIndex.value, 1, temp);
    draggedItem.value = null;
    draggedIndex.value = null;
  }
};

onMounted(() => {
  fetchItems();

  const handleResize = () => {
    const containerWidth = document.querySelector('.inventory-grid').offsetWidth;
    columns.value = Math.floor(containerWidth / (itemSize.value + 10)); // 10 is the gap size
  };
  window.addEventListener('resize', handleResize);
  handleResize();
});
</script>

<style scoped>
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
  grid-template-columns: repeat(10, 50px);
  gap: 10px;
}

.inventory-slot {
  width: 50px;
  height: 50px;
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
