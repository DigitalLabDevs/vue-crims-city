<template>
  <Loader v-if="!isLoading" />
  <div v-else class="Buildings">
    <h1>{{ t('buildings.title') }}</h1>
    <div class="BuildingsView">
      <BuildingsCore v-for="(building, index) in buildings" :key="index" :imageName="building.buildings_img"
        :name="t(`buildings.names.${building.buildings_name}`)" :level="building.pb_level"
        :description="t(`buildings.names.${building.buildings_name}`)" />
    </div>

    <router-view name="buildings"></router-view>


    <div class="buildings-build2">
      <router-view name="buildings2"></router-view>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_URL } from '../../../config.js';
import BuildingsCore from '../Core/BuildingsCore.vue';
import Loader from '../../_Core/Loader.vue';

import { getConfig } from '../../../../getConfig.js';
const config = getConfig();

const { t } = useI18n();
const buildings = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/game/buildings`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    buildings.value = data;
    console.log(buildings.value);
    isLoading.value = true;
  } catch (error) {
    console.error('Error fetching buildings data:', error);
  }
});
</script>

<style scoped>
.BuildingsView {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.buildings-build2 {
  position: fixed;
  width: 600px;
  top: 90px;
  right: 10px;
}
</style>
