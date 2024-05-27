<template>

  <div class="Building-card">
    <div class="Building-options">
      <span title="informacje">i</span>
      <span title="Buduj">B</span>
      <span title="Destrukcja">D</span>
    </div>
    <router-link :to="`/crims-city/buildings/${props.imageName}`">
      <Tooltip :description="`${props.description}`">
      <img
        :src="`/game/images/buildings/${props.imageName}.jpg`" 
        :alt="props.imageName" 
      />
    </Tooltip>
    </router-link>
    <div class="BuildingsCorefooter">
      {{ t('game.level') }}: {{ level }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Tooltip from './Tooltip.vue';
const { t } = useI18n();
const router = useRouter;

const props = defineProps({
  imageName: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'EEl',
    required: false
  }
});

</script>

<style scoped>
.Building-options>span:hover {
  color: aqua;
}

.Building-options>span {
  margin-left: 2px;
  margin-right: 2px;
  cursor: pointer;
}

.Building-card {
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  /* overflow: hidden; */
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.Building-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  cursor: pointer;
}

.BuildingsCorefooter {
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
}
</style>
