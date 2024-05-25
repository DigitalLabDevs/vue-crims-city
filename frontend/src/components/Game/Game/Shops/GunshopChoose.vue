<template>
  <div>
    <h2>Sklepy z bronią</h2>
    <div class="shops">
    <div class="shop-item">
      <router-link to="/crims-city/shops/felk-guns">
        <img src="/game/places/gunshops/gunshop4.jpg" alt="Felek Guns" />
        <p>Felek Guns</p>
      </router-link>
    </div>
    <div class="shop-item">
      <router-link to="/crims-city/shops/karabiny-wuela">
        <img src="/game/places/gunshops/gunshop1.jpg" alt="Karabiny Wuela" />
        <p>Karabiny Wuela</p>
      </router-link>
    </div>
    <div class="shop-item">
      <router-link to="/crims-city/shops/militaria">
        <img src="/game/places/gunshops/gunshop2.jpg" alt="Militaria" />
        <p>Militaria</p>
      </router-link>
    </div>
    <div class="shop-item">
      <router-link to="/crims-city/shops/klawe-spluwy">
        <img src="/game/places/gunshops/gunshop3.jpg" alt="Klawe spluwy" />
        <p>Klawe spluwy</p>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

</script>

<style scoped>
.shops{
  display: flex;
  justify-content: space-around;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.shop-item {
  width: 120px;
  height: 160px;
  margin-bottom: 20px;
  text-align: center;
}

.shop-item img {
  width: 100%;
  height: auto;
}

.shop-item p {
  margin-top: 10px;
}
</style>
