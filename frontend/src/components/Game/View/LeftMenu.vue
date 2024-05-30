<template>
  <nav>
    <ul class="Menu-ul">
      <li><router-link to="/crims-city">{{ t('game.main') }}</router-link></li>
      <li><router-link to="/crims-city/buildings">{{ t('game.buildings') }}</router-link></li>
      <li><router-link to="/crims-city/trade">{{ t('game.trade') }}</router-link></li>
      <li><router-link to="/crims-city/equipment">{{ t('game.equipment') }}</router-link></li>
      <li><router-link to="/crims-city/shops">{{ t('game.shops') }}</router-link></li>
      <li><router-link to="/crims-city/heists">{{ t('game.heists') }}</router-link></li>
      <li><router-link to="/crims-city/arena">{{ t('game.arena') }}</router-link></li>      
      <li><router-link to="/crims-city/bank">{{ t('game.bank') }}</router-link></li>
      <li><router-link to="/crims-city/market">{{ t('game.market') }}</router-link></li>
      <li><router-link to="/crims-city/hospital">{{ t('game.hospital') }}</router-link></li>
      <li><router-link to="/crims-city/police">{{ t('game.police') }}</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
ul{
  display: flex;
  flex-direction: column;
  background-color: var(--RGBA-BLACK-50);
}
nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: inline;
  margin-right: 20px;
  padding: 5px;
}
</style>
