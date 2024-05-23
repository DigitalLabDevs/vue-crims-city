<template>
  <div class="Missions">
    <h1>{{ t('game.missions') }}</h1>
    Missions
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
