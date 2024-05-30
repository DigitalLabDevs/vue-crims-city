<template>
  <div class="Game-Topbar">
    <div class="fx ssk">
       <router-link to="/crims-city">Crims City</router-link>
    </div>

    <div class="rMenu">
      <MusicPlayer />
      <DropdownMenu>
        <router-link to="/crims-city/settings">{{ t('game.settings') }}</router-link>
      </DropdownMenu>
      <LogoutView />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import DropdownMenu from '../../_Core/DropdownMenu.vue';
import LogoutView from '../../_AuthContext/LogoutView.vue'
import MusicPlayer from '../../_Core/MusicPlayer.vue';

const { t } = useI18n();
</script>

<style scoped>
.Game-Topbar {
  display: flex;
  justify-content: space-evenly;
}

.ssk {
  background-color: var(--RGBA-BLACK-50);
  padding: 2px 5px 2px 5px;
  box-shadow: 0 0 5px black;
}
.rMenu{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rMenu *{
  margin: 0px 4px 0px 4px;

}
</style>
