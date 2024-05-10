<template>
  <div v-if="isLoggedIn" class="isLoggedInTrue">
    <router-view></router-view>
  </div>

  <div v-if="!isLoggedIn" class="topbar-isLoggedInFalse">
    <div class="lang-title">{{ t('global.chooseLanguage') }} </div>
    <div>
      <LanguageSelector />
    </div>
  </div>

  <div v-if="!isLoggedIn" class="isLoggedInFalse">

    <router-view></router-view>
  </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSelector from './components/Language/LanguageSelector.vue';

const { t } = useI18n();
const isLoggedIn = false;

</script>

<style scoped>
.topbar-isLoggedInFalse {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  box-shadow: 0 0 10px rgb(0, 255, 0);
}
.topbar-isLoggedInFalse>div {
  margin-left: 2px;
  margin-right: 2px;
}
.lang-title {
  width: 12%;
  text-align: center;
}
.isLoggedInFalse {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0px 10px rgb(17, 255, 0);

  background-image: url(/site/logo.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
  width: 640px;
  height: 480px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* Dodatkowe style dla lepszej responsywności */
@media (max-width: 768px) {
  .isLoggedInFalse {
    /* width: 80%; */
  }
}

@media (max-width: 576px) {
  .isLoggedInFalse {
    /* width: 90%; */
  }
}






.psa {
  position: relative;
}

.height300 {
  min-height: 300px;
  /* border: 1px solid greenyellow; */
}

.bg {
  width: 100%;
  /* background-color: cadetblue; */
}

.TP2 {
  width: 600px;
  border: 1px solid green;
  /* height: auto; */
}

.Game-Center {
  display: flex;
  flex-direction: row;
}

.Game-Center>* {
  /* flex: 1; */
}

.Game-Container {
  display: flex;
  flex-direction: column;
  /* Aby zawartość była wyśrodkowana w pionie */
  justify-content: flex-start;
  /* Wyśrodkowanie zawartości w poziomie */
  align-items: center;
  /* Wyśrodkowanie zawartości w pionie */
  height: 100vh;
}

@media screen and (max-width: 600px) {
  .router {
    margin-left: 60px;
  }
}
</style>