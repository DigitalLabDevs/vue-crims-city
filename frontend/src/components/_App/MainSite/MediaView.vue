<template>
  <div class="description-right-m2">
    <div class="news">Media</div>
    <div class="social-media">
      <div class="row">
        <!-- ===================================== FACEBOOK =================================== -->
        <div class="ico">
          <img src="/icons/facebook.svg" alt="facebook">
          <a href="https://www.facebook.com/" target="_blank">Facebook</a>
        </div>
        <!-- ===================================== YOUTUBE =================================== -->
        <div class="ico">
         <img src="/icons/youtube.svg" alt="youtube">
          <a href="https://www.youtube.com/" target="_blank">YouTube</a>
        </div>
        <!-- ===================================== INSTAGRAM =================================== -->
        <div class="ico">
          <img src="/icons/instagram.svg" alt="instagram">
          <a href="https://www.instagram.com/" target="_blank">Instagram</a>
        </div>

      </div>



      <!-- ===================================== DISCORD =================================== -->
      <div class="row">
        <div class="ico">
          <img src="/icons/discord.svg" alt="Discord">
          <a href="https://www.discord.com/" target="_blank">Discord</a>
        </div>
        <!-- ===================================== FORM =================================== -->
        <div class="ico">
          <img src="/icons/forum.svg" alt="Forum">
          <a href="https://www.example.com/" target="_blank">Forum</a>
        </div>
        <!-- ===================================== CONTACT =================================== -->
        <div class="ico">
          <img src="/icons/contact.svg" alt="Contact">
          <router-link to="/contact">{{ t('contact.contact') }}</router-link>
        </div>





      </div>
    </div>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style scoped>
.ico {
  display: flex;
  align-items: center;
}

.description-right-m2 {
  margin-left: 25px;
  width: 310px;
  /* height: 150px; */
  margin-top: 20px;
  border: 5px solid #1a4d5e;
  box-shadow: 0 0 10px #1a4d5e;
}

.social-media {
  padding: 5px;
}

.news {
  width: 100%;
  background-color: #1a4d5e;
  font-size: 14px;
  display: flex;
}

/* .ico>* {
  margin: 0px 6px 0px 6px;
} */

.ico {
  margin: 0px 6px 0px 6px;
}

.row {
  display: flex;
  justify-content: space-around;
}

.row>a {
  color: white;
}
</style>