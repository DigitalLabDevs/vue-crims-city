<template>
  <div>
    <div class="Main-Game-Container">

      <div class="Main-Game-Topbar">
        <Topbar></Topbar>
      </div>

      <div class="fx">
      <!-- <div class="Main-Game-Right">
        <div>MENU</div>
      </div> -->

      <div class="rout">
        <router-view name="game"></router-view>
      </div>

      <div class="Main-Game-Right">
        <div>MENU 2</div>
      </div>
    </div>

      <div class="Main-Game-Footer">
        <Footer></Footer>
      </div>

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
  width: 100vw;
  height: 100vh;
  background-image: url(/game/main/main.jpg);
  background-repeat: no-repeat;
  /* background-size: 100% 100%; */
  background-size: cover;
}
.Main-Game-Right{
  border: 1px solid green;
  width: 20%;
  height: 90%;
}
.rout{
  width: 80%;

  border: 1px solid green;
}
.Main-Game-Topbar,
.Main-Game-Footer 
{
  background-color: rgb(40 71 81);
  padding: 2px;

}
.Main-Game-Footer{
  width: 100%;
  position: fixed;
  bottom: 0;
}
.fx{
  justify-content: space-evenly;
}
</style>
