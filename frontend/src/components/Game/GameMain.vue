<template>
  <div>
    <div class="Main-Game-Container">
      <Topbar></Topbar>
      <div class="rout">
        <router-view name="game"></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import Topbar from './View/Topbar.vue';
import Footer from './View/Footer.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.Main-Game-Container{

}
</style>
