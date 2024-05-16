  <template>

    <div v-if="isAuthenticated" class="isLoggedInTrue">
      <router-view></router-view>
    </div>



    <div v-else>
      <div class="topbar-isLoggedInFalse">
        <TopbarView />
      </div>

      <div v-if="shouldShowErrorMessage" :class="errorMessageClass">
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
            <router-link to="/cookie">{{ t('main.joinUs') }}</router-link>
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
      <div class="footer">
        <router-link to="/cookie">{{ t('cookie.title') }}</router-link>
      </div>
    </div>



  </template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';

import store from './components/_AuthContext/StoreVuex';
import { useStore } from 'vuex';

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
const hasResponse = ref(false);

const handleRegistrationError = ({ code, messages, success: isSuccess }) => {
  errorMessage.value = t(`serverMessage.${code}`);
  console.log(errorMessage.value);
  success.value = isSuccess;
  message.value = messages;
  hasResponse.value = true;
};

const shouldShowErrorMessage = computed(() => {
  return errorMessage.value !== '' && hasResponse.value;
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
.footer{
  position: fixed;
  bottom: 15px;
  left: 15px;
}
.error {
  background-color: rgba(221, 38, 38, 0.1);
  font-size: 16px;
  padding: 10px;
  color: rgb(255, 47, 47);
}

.success {
  background-color: rgba(18, 225, 18, 0.1);
  font-size: 16px;
  padding: 10px;
  color: greenyellow;
}

.info {
  background-color: rgba(7, 171, 226, 0.1);
  font-size: 16px;
  padding: 10px;
  color: #0ab8ff;
}

.warning {
  background-color: rgba(226, 211, 7, 0.1);
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