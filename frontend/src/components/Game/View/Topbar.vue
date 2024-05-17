<template>
  <div class="Game-Topbar">
    <router-link to="/crims-city/settings">{{ t('game.settings') }}</router-link>
    <LogoutView />
  </div>
</template>

<script setup>
import LogoutView from '../../_AuthContext/LogoutView.vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.Game-Topbar{
  display: flex;
  justify-content: space-evenly;
}
</style>
