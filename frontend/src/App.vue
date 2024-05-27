  <template>

    <div v-if="isAuthenticated" class="isLoggedInTrue">
      <router-view name="main"></router-view>
    </div>



    <div v-else>
      <div class="topbar-isLoggedInFalse">
        <TopbarView />
      </div>

      <div v-if="shouldShowErrorMessage" class="errorIndex" :class="errorMessageClass">
        <span v-if="success">
          <span>{{ errorMessage }}</span>
        </span>
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
          <router-view name="main" @registrationError="handleRegistrationError"></router-view>
        </div>



        <div class="description-right-main">
          <NewsView />
          <MediaView />
        </div>

      </div>
      <div class="footer">
        <router-link to="/cookie">{{ t('cookie.title') }}</router-link>
      </div>
    </div>



  </template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import store from './components/_AuthContext/StoreVuex';

import TopbarView from './components/_App/MainSite/TopbarView.vue';
import NewsView from './components/_App/MainSite/NewsView.vue';
import MediaView from './components/_App/MainSite/MediaView.vue';

const isAuthenticated = ref(store.getters.isAuthenticated);

console.log(`APP: ${isAuthenticated.value}`);

watch(
  () => store.getters.isAuthenticated,
  (newIsAuthenticated) => {
    isAuthenticated.value = newIsAuthenticated;
  }
);

const { t } = useI18n();

const success = ref('');
const errorMessage = ref('');
const message = ref('');

const handleRegistrationError = ({ code, messages, success: isSuccess }) => {
  // errorMessage.value = t(`serverMessage.${code}`);
  errorMessage.value = t(`${code}`);
  success.value = isSuccess;
  message.value = messages;
};

const shouldShowErrorMessage = computed(() => {
  return errorMessage.value !== '' && success.value === true && errorMessage.value !== undefined;
});

const errorMessageClass = computed(() => {
  switch (message.value) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    case 'error':
      return 'error';
  }
});


</script>


<style scoped>
/* @media (max-width : 992px) {
  .description-left,
  .description-right-main {
    display: none!important;
  }
  .isLoggedInFalse{
    padding: 10px!important;
    width: 440px!important;
  }
} */
@media (max-width : 1125px) {
  .description{
    width: 80%;
  }

  .description-right-main {
    display: none !important;
  }

  .isLoggedInFalse {
    padding: 3px !important;
    width: 200px;
  }

  .topbar-isLoggedInFalse {
    height: 30px !important;
  }
}

@media (max-width : 768px) {

  .description-left,
  .description-right-main {
    display: none !important;
  }

  .isLoggedInFalse {
    padding: 3px !important;
    width: 200px;
  }

  .topbar-isLoggedInFalse {
    height: 30px !important;
  }
  .description{
    width: 80%;
  }
}

/* 
@media (max-width: 480px) {
  .description-left,
  .description-right-main {
    display: none!important;
  }
  .isLoggedInFalse {
    padding: 3px!important;
    width: 200px;
  }
  .description {
    position: relative;
  }
  .isLoggedInFalse{
    min-width: 300px!important;
    min-height: 450px!important;
  }
  .topbar-isLoggedInFalse{
    height: 30px!important;
  }
} */

.footer {
  position: fixed;
  bottom: 15px;
  left: 15px;
}
.success, .error, .info, .warning, .errorIndex{
  z-index: 9999;
}
.error {
  background-color: rgba(221, 38, 38, 0.3);
  font-size: 16px;
  padding: 10px;
  color: rgb(255, 47, 47);
}

.success {
  background-color: rgba(18, 225, 18, 0.3);
  font-size: 16px;
  padding: 10px;
  color: greenyellow;
}

.info {
  background-color: rgba(7, 171, 226, 0.3);
  font-size: 16px;
  padding: 10px;
  color: #0ab8ff;
}

.warning {
  background-color: rgba(226, 211, 7, 0.3);
  font-size: 16px;
  padding: 10px;
  color: rgb(255, 170, 0);
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

.description {
  display: flex;
  /* flex-direction: row; */
  /* justify-content: center; */
  width: 90%;
  height: 80%;
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
  height: 30px;
  box-shadow: 0 0 10px #00bfff;
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
  /* min-width: 300px; */
  /* width: 80%; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  /* height: 450px; */
}
</style>