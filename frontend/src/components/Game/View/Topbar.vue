<template>
  <div class="Game-Topbar">
    <div class="fx">
      <div class="ssk">Forsa: 345,543</div>
      <div class="ssk">Zdrowie: 87%</div>
    </div>

    <div class="fx">
      <div class="ssk">
        <router-link to="/crims-city/maingame">{{ t('game.main') }}</router-link>
      </div>
    </div>

    <div class="fx">
      <div class="ssk">
        <router-link to="/crims-city/settings">{{ t('game.settings') }}</router-link>
      </div>
      <div class="ssk">
        <LogoutView />
      </div>
    </div>
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
.ssk{
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px 5px 2px 5px;
  margin-left: 10px;
  box-shadow: 0 0 5px black;
}

</style>
