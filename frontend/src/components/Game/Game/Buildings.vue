<template>
  <div class="Buildings">
    <h1>{{ t('buildings.title') }}</h1>
    <div class="BuildingsView">
      <BuildingsCore 
        v-for="(building, index) in buildings" 
        :key="index" 
        :imageName="building.buildings_img" 
        :name="building.buildings_name"
        :level="building.pb_level"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_URL } from '../../../config.js';
import BuildingsCore from '../Core/BuildingsCore.vue';

import { getConfig } from '../../../../getConfig.js';
const config = getConfig();

const { t } = useI18n();
const buildings = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/game/buildings`,{
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
</style>
