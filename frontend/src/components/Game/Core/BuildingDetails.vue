<template>
  <div class="building-details" :style="`background-image: url(/game/images/buildings/${imageName}.jpg);`">
    <h2>{{ t(`buildings.names.${imageName}`) }}</h2>
    <p>{{ t('buildings.level') }}: {{ level }}</p>
    <div class="building-actions">
      <span @click="upgradeBuilding">{{ t('buildings.upgrade') }}</span>
      <span @click="destroyBuilding">{{ t('buildings.destroy') }}</span>
    </div>
    <div class="building-info">
      <h3>{{ t('buildings.productionTitle') }}</h3>
      <p>{{ productionInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getConfig } from '../../../../getConfig';

const config = getConfig();

const { t } = useI18n();
const route = useRoute();

const imageName = ref(route.params.imageName as string);
// const level = ref(0);
let level;
const productionInfo = ref("Loading...");
const imageSrc = computed(() => `/game/images/buildings/${imageName.value}.jpg`);

const fetchBuildingData = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/buildings/${imageName.value}`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers
    });
    if (response.ok) {
      const buildingDataArray = await response.json();
      let buildingData = buildingDataArray[0];
      console.log(`buildingData.pb_level: ${buildingData.pb_level}`);
      level = buildingData.pb_level;
      productionInfo.value = buildingData.pb_capacity;
    }

  } catch (error) {
    console.error("Error fetching building data:", error);
  }
};

const upgradeBuilding = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/buildings/${imageName.value}/upgrade`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedBuildingData = await response.json();
    level = updatedBuildingData.level;
    productionInfo.value = updatedBuildingData.productionInfo;
    console.log("Building upgraded", imageName.value);
  } catch (error) {
    console.error("Error upgrading building:", error);
  }
};

const destroyBuilding = async () => {
  try {
    await fetch(`${config.API_URL}/game/buildings/${imageName.value}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Building destroyed", imageName.value);
    // Here you can handle post-destroy logic, such as redirecting the user
  } catch (error) {
    console.error("Error destroying building:", error);
  }
};

watch(() => route.params.imageName, (newImageName) => {
  imageName.value = newImageName as string;
  fetchBuildingData(); // Fetch new data when imageName changes
});

fetchBuildingData(); // Fetch initial data on component mount
</script>

<style scoped>
.span {
  cursor: pointer;
}

.building-details * {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
}

.building-details {
  text-align: center;
  height: 300px;
  background-size: contain;
}

.building-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 10px auto;
}

.building-actions {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px;
}

.building-actions span {
  margin-left: 5px;
  margin-right: 5px;
  transition: 200ms;
}

.building-actions span:hover {
  color: #00ff11;
}

.building-info {
  margin-top: 20px;
}

h2,
h3 {
  margin-bottom: 10px;
}
</style>
