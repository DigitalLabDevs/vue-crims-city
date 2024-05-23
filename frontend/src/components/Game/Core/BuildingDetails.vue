<template>
  <div class="building-details" :style="`background-image: url(/game/images/buildings/${imageName}.jpg);`">
    <h1>{{ t('buildings.detailsTitle') }}: {{ imageName }}</h1>
    <!-- <img :src="imageSrc" :alt="imageName" class="building-image" /> -->
    <p>{{ t('buildings.level') }}: {{ level }}</p>
    <div class="building-actions">
      <button @click="upgradeBuilding">{{ t('buildings.upgrade') }}</button>
      <button @click="destroyBuilding">{{ t('buildings.destroy') }}</button>
    </div>
    <div class="building-info">
      <h3>{{ t('buildings.productionTitle') }}</h3>
      <p>{{ productionInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

const { t } = useI18n();
const route = useRoute();

const imageName = ref(route.params.imageName as string);
const level = ref(0); // Jeśli nie używamy poziomu, możemy go pominąć

const productionInfo = "This building produces resources necessary for your city's growth.";

const imageSrc = computed(() => `/game/images/buildings/${imageName.value}.jpg`);

const upgradeBuilding = () => {
  console.log("Upgrading building", imageName.value);
};

const destroyBuilding = () => {
  console.log("Destroying building", imageName.value);
};


watch(() => route.params.imageName, (newImageName) => {
  imageName.value = newImageName as string;
});

// watch(() => route.params.imageName, () => {
//   key.value += 1;
// });
</script>

<style scoped>
.building-details {
  text-align: center;
  /* margin: 20px; */
  /* width: 300px; */
  height: 300px;
  background-size: contain;
}

.building-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 10px auto;
}

.building-actions button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.building-actions button:hover {
  background-color: #0056b3;
}

.building-info {
  margin-top: 20px;
}

h1,
h3 {
  margin-bottom: 10px;
}
</style>
