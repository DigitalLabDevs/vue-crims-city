<template>
  <div class="main-links">
    <router-link to="/login">{{ t('main.loginLabel') }}</router-link>
    <router-link to="/registration">{{ t('main.registerLabel') }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style scoped>
.main-links {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.main-links>* {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 40px 10px 40px;
  box-shadow: 0 0 10px black;
  border: 1px solid rgba(26, 77, 94, 0.8);
  width: 200px;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
}

.main-links>*:hover {
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(26, 77, 94, 0.9);
}

@media (max-width : 1270px) {
  .main-links {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .main-links>* {
    width: 100%;
    
  }

  .main-links {
    flex-direction: column;
  }
}
</style>
