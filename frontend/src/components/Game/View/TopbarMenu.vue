<template>
  <nav>
  <ul class="TopbarMenu">
    <span><router-link to="/crims-city/missions">{{ t('game.missions') }}</router-link></span>
    <span><router-link to="/crims-city/messages">{{ t('game.messages') }}</router-link></span>
    <span><router-link to="/crims-city/postoffice">{{ t('game.postOffice') }}</router-link></span>
    <span><router-link to="/crims-city/statistics">{{ t('game.statistics') }}</router-link></span>
  </ul>
</nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<style scoped>
span{
  margin: 0px 4px 0px 4px;
  padding: 5px;
}
span:hover{
  background-color: var(--RGBA-BLACK-50);
}
.TopbarMenu{
  display: flex;
}
</style>
