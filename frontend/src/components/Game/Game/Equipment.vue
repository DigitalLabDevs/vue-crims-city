<template>
  <Loader v-if="!isLoading" />
  <div v-else>
    <div class="info">
      {{ t('equipment.OccupiedSlots') }}: {{ totalEq }} / {{ totalSlots }}
    </div>
    <div class="container">
      <div v-for="(item, index) in inventory" :key="index" class="square" @drop="onDrop(index)" @dragover.prevent="onDragOver(index)">
        <div class="item-container" @mouseover="showTooltip(item)" @mouseleave="hideTooltip">
          <img v-if="item.img_url" :src="`/game/items/${item.img_url}`" class="draggable" draggable="true" @dragstart="onDragStart(index)" />
        </div>
      </div>
    </div>

    
    <div class="tooltip" v-if="tooltip.show" :style="{ top: tooltip.top, left: tooltip.left }">
      <img :src="`/game/items/${tooltip.item.img_url}`" alt="Item" class="tooltip-img" />
      <div class="tooltip-info">
        <h3>{{ t(`items.${tooltip.item.name}`) }}</h3> 
        <p>{{ t(`items.${tooltip.item.description}`) }}</p>
        <hr>
        <p v-if="tooltip.item.durability !=null && tooltip.item.current_durability !=null" >
          {{ t('equipment.Durability') }}: {{ tooltip.item.current_durability }}/{{ tooltip.item.durability }}
        </p>
        <p>{{ t('equipment.Weight') }}: {{ tooltip.item.weight }} kg</p>
        <p v-if="tooltip.item.attack != null">{{ t('equipment.Attack') }}: {{ tooltip.item.attack }}</p>
        <p v-if="tooltip.item.defense != null">{{ t('equipment.Defense') }}: {{ tooltip.item.defense }}</p>
        <p><strong>{{ t('equipment.Price') }}:</strong> {{ tooltip.item.price }} $</p>
        <!-- Dodaj więcej właściwości, jeśli są dostępne -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getConfig } from 'config';
import Loader from '../../_Core/Loader.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isLoading = ref(false);
const config = getConfig();
// Ilośc slotów dostępnych dla użytkownika
let totalSlots = 0;
let totalEq = 0;
// const totalSlots = ref(8);

// Inicjalizacja ekwipunku
const inventory = ref([]);

const dragSourceIndex = ref(null);

const tooltip = ref({
  show: false,
  item: null,
  top: '0px',
  left: '0px'
});

const onDragStart = (index) => {
  tooltip.value.show = false;
  dragSourceIndex.value = index;
};

const onDrop = (targetIndex) => {
  if (dragSourceIndex.value !== null && dragSourceIndex.value !== targetIndex) {
    // Zamień miejscami elementy
    const temp = inventory.value[targetIndex];
    inventory.value[targetIndex] = inventory.value[dragSourceIndex.value];
    inventory.value[dragSourceIndex.value] = temp;

    console.log(inventory.value[targetIndex]);

    // Zapisz nowe pozycje do bazy danych
    // savePositionToDatabase(inventory.value[targetIndex]);
    savePositionToDatabase(inventory.value[targetIndex], targetIndex); 
    // savePositionToDatabase(inventory.value[dragSourceIndex.value]);

    dragSourceIndex.value = null;
  }
};

const onDragOver = (index) => {
  // Optional: Add some visual indication for the drop target
};

  
// ========================================================================
// Mock funkcja do zapisu pozycji do bazy danych
// ========================================================================
const savePositionToDatabase = async (item, newPosition) => {

  console.log(newPosition);
  // return;
  try {
    const response = await fetch(`${config.API_URL}/game/save-item-position`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers,
      body: JSON.stringify({ itemId: item.id, newPosition: newPosition })
    });
    if (response.ok) {
      console.log(`Pozycja przedmiotu o id ${item.id} została zaktualizowana.`);
    } else {
      console.error('Wystąpił błąd podczas aktualizowania pozycji przedmiotu.');
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas komunikacji z serwerem:', error);
  }
};



const showTooltip = (item) => {
  tooltip.value.show = true; // Ustawienie flagi, że tooltip ma być wyświetlany
  tooltip.value.item = item; // Przypisanie elementu do tooltipu

  // Oblicz pozycję tooltipu
  const containerRect = event.currentTarget.getBoundingClientRect();
  tooltip.value.top = `${containerRect.top}px`;
  tooltip.value.left = `${containerRect.left + containerRect.width}px`;
};

const hideTooltip = () => {
  tooltip.value.show = false;
};

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

      inventory.value = slots; // Ustawienie danych ekwipunku
      totalSlots = slots[0].p_eq_slots;
      totalEq = inventory.value.length;
      inventory.value = Array(totalSlots).fill(null).map((_, index) => {
        return slots.find(item => item.item_slot === index) || { img_url: null, name: null, description: null };
      });
      isLoading.value = true;

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
  position: relative; /* Dodaj pozycję względną, aby ustawić tooltip */
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

.tooltip {
  position: absolute;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid #06f5e9;
  padding: 10px;
  z-index: 999;
  transform: translate(-95%, 5%);
}

.tooltip-img {
  max-width: 100px;
}

.tooltip-info {
  margin-top: 5px;
}
</style>
