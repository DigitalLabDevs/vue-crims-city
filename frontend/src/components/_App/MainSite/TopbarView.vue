<template>
  <div class="lang-title">{{ t('global.chooseLanguage') }} </div>
  <div>
    <LanguageSelector />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import LanguageSelector from '../../Language/LanguageSelector.vue';
</script>

<style scoped>
.lang-title {
  width: 130px;
  text-align: center;
}
/* @media (max-width : 992px) {

}
@media (max-width : 768px) {
  
}
@media (max-width: 480px) {
 
} */
</style>