<template>
  <div class="building-details">
    <div class="bImg">
      <img :src="`/game/images/buildings/${imageName}.jpg`" />
    </div>

    <div class="bInfo">
      <h2>{{ t(`buildings.names.${imageName}`) }}</h2>
      <p>{{ t('buildings.level') }}: {{ data.pb_level }}</p>
      <div class="building-actions">
        <span @click="upgradeBuilding">{{ t('buildings.upgrade') }}</span>
        <span @click="destroyBuilding">{{ t('buildings.destroy') }}</span>
      </div>
      <div class="buildings-upgrades">
        <p>Następny poziom : {{ data.level }}</p>
        <p>Koszt : {{ data.upgrade_cost }} $</p>
        <p>Czas : {{ data.build_time }} min</p>
      </div>
      <div class="building-info">
        <h3>{{ t('buildings.productionTitle') }}</h3>
        <p>{{ productionInfo }}</p>
      </div>
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

const data = ref({});

const imageName = ref(route.params.imageName as string);
// const level = ref(0);
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
      const buildingData = buildingDataArray[0]; // Przypisanie pierwszego elementu tablicy
      data.value = buildingData; 
      console.log(`=====================================================`);
      console.log(`buildingData.pb_level: ${JSON.stringify(data)}`);
      console.log(`=====================================================`);
      // level = buildingData.pb_level;
      // productionInfo.value = buildingData.pb_capacity;
    }

  } catch (error) {
    console.error("Error fetching building data:", error);
  }
};

const upgradeBuilding = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/buildings/${imageName.value}/upgrade`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.credentials,
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
.bImg {
  width: 300px;
  height: 300px;
}

.bImg img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.span {
  cursor: pointer;
}

.building-details * {
  padding: 5px;
}

.building-details {
  background-color: var(--RGBA-BLACK-50);
  padding: 5px;
  display: flex;
  flex-direction: row;
}

.building-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 10px auto;
}

.building-actions {
  /* background-color: rgba(0, 0, 0, 0.8); */
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
