<template>
  <div class="Buildings">
    <h1>{{ t('buildings.title') }}</h1>
    <div class="BuildingsView">
      <BuildingsCore imageName="fbf" level="4" name="Fabryka Fałszywek"/>
      <BuildingsCore imageName="kk2" level="1" name="O1"/>
      <BuildingsCore imageName="kk3" level="3" name="O2"/>
      <BuildingsCore imageName="kk4" level="2" name="O3"/>
      <BuildingsCore imageName="kk5" level="7" name="O4"/>
      <BuildingsCore imageName="kk1" level="4" name="O5"/>
      <BuildingsCore imageName="kk2" level="1" name="O6"/>
      <BuildingsCore imageName="kk3" level="3" name="O7"/>
      <BuildingsCore imageName="kk4" level="2" name="O8"/>
      <BuildingsCore imageName="kk5" level="7" name="O9"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BuildingsCore from '../Core/BuildingsCore.vue';

const { t } = useI18n();

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
