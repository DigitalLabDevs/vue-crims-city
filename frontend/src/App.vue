  <template>
    <div v-if="isLoggedIn" class="isLoggedInTrue">
      <router-view></router-view>
    </div>



    <div v-if="!isLoggedIn">
      <div class="topbar-isLoggedInFalse">
        <TopbarView />
      </div>

      <div v-if="shouldShowErrorMessage" :class="errorMessageClass">
        <span v-if="success">
          <span>{{ errorMessage }}</span>
          <router-link to="/login">{{ t('main.loginLabel') }}</router-link></span>
        <span v-else>
          {{ errorMessage }}
        </span>
      </div>



      <div class="description">

        <div class="description-left">
          <img class="desc-img" src="/site/left.jpg" />
          <div class="w1 desc">
            {{ t('descriptions.descriptionGame') }}
          </div>

          <div class="w1">
            <router-link to="/registration">{{ t('main.joinUs') }}</router-link>
          </div>
        </div>



        <div class="isLoggedInFalse">
          <router-view @registrationError="handleRegistrationError"></router-view>
        </div>



        <div class="description-right-main">
          <NewsView />
          <MediaView />
        </div>

      </div>

    </div>



  </template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import TopbarView from './components/_App/MainSite/TopbarView.vue';
import NewsView from './components/_App/MainSite/NewsView.vue';
import MediaView from './components/_App/MainSite/MediaView.vue';


const { t } = useI18n();
const isLoggedIn = false;

const errorMessage = ref('');
const success = ref('');
const hasResponse = ref(false);

const handleRegistrationError = ({ code, success: isSuccess }) => {
  errorMessage.value = t(`serverMessage.${code}`);
  console.log(errorMessage.value);
  success.value = isSuccess;
  hasResponse.value = true;
};

const shouldShowErrorMessage = computed(() => {
  return errorMessage.value !== '' && hasResponse.value;
});

const errorMessageClass = computed(() => {
  return success.value ? 'success' : 'error';
});
</script>

<style scoped>
.error {
  background-color: rgba(226, 7, 7, 0.1);
  font-size: 16px;
  padding: 10px;
  color: rgb(255, 47, 47);
}

.success {
  background-color: rgba(7, 226, 7, 0.1);
  font-size: 16px;
  padding: 10px;
  color: greenyellow;
}

.desc {
  min-height: 75px;
  display: flex;
  align-items: center;
}


.desc-img {
  width: 270px;
  height: 260px;
}

.w1 {
  margin: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
}

.description {
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.description-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background: url(/site/left.jpg); */
  margin-right: 25px;
  width: 280px;
  height: 420px;
  border: 5px solid #1a4d5e;
  box-shadow: 0 0 10px #1a4d5e;
}

.topbar-isLoggedInFalse {
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  height: 50px;
  box-shadow: 0 0 10px rgb(167, 177, 169);

  background-image: url(/site/topbarbg.jpg);
  background-repeat: repeat-x;
}

.topbar-isLoggedInFalse>div {
  margin-left: 2px;
  margin-right: 2px;
}



.isLoggedInFalse {
  padding: 20px;
  border: 5px solid #1a4d5e;
  box-shadow: 0 0 10px #1a4d5e;
  background-image: url(/site/logo.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 640px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>