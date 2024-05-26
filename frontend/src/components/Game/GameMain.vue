<template>
  <div>
    <div class="Main-Game-Container">

      <div class="Main-Game-Topbar">
        <Topbar></Topbar>
      </div>
      <div class="fullcenter">
        <TopbarMenu></TopbarMenu>
        <div class="fx wwo">
          <div class="Main-Game-Left">
            <LeftMenu></LeftMenu>
          </div>

          <div class="rout">
            <router-view name="game"></router-view>
          </div>

          <div class="Main-Game-Right">
            <div>XC</div>
            <router-view name="menu2"></router-view>

          </div>
        </div>
      </div>

      <div class="Main-Game-Footer">
        <Footer></Footer>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Topbar from './View/Topbar.vue';
import Footer from './View/Footer.vue';
import LeftMenu from './View/LeftMenu.vue';
import TopbarMenu from './View/TopbarMenu.vue';
const { t } = useI18n();
</script>

<style scoped>
.fullcenter {
  display: flex;
  justify-content: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
}

.wwo {
  width: 1100px;
}

.Main-Game-Topbar {
  width: 100%;
}

.Main-Game-Container {
  width: 100vw;
  height: 100vh;
  background-image: url(/game/main/main.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Main-Game-Right {
  border: 1px solid green;
  min-width: 360px;
}

.Main-Game-Left {
  border: 1px solid green;
}

.Main-Game-Left,
.Main-Game-Right {
  height: fit-content;
}

.rout {
  width: 80%;
  height: min-content;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid green;
  padding-bottom: 15px;
}

.Main-Game-Topbar,
.Main-Game-Footer {
  background-color: rgb(40 71 81);
  padding: 2px;

}

.Main-Game-Footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.fx {
  justify-content: space-evenly;
}
</style>
