<template>
  <Loader v-if="isLoading" />
  <div v-else class="bank">
    <h2>{{ t('bank.title') }}</h2>
    <div class="bank_money">
      <div class="balance">{{ t('bank.balance') }}: $ {{ getPlayerMoney }}</div>
      <div class="balance">{{ t('bank.money') }}: $ {{ getBankMoney }}</div>
    </div>
    <hr style="margin-top: 10px; margin-bottom: 10px;">
    <div class="bank-actions">

      <!-- <span>
        <router-link 
          :pMoney="money.p_money" 
          to="/crims-city/bank/deposit">{{ t('bank.deposit') }}
        </router-link>
      </span> -->

      <span>
        <router-link to="/crims-city/bank/deposit">{{ t('bank.deposit') }}</router-link>
      </span>

      <span><router-link to="/crims-city/bank/withdraw">{{ t('bank.withdraw') }}</router-link></span>
      <span><router-link to="/crims-city/bank/safedepositboxes">{{ t('bank.safeDepositBoxes') }}</router-link></span>
      <span><router-link to="/crims-city/bank/investment">{{ t('bank.investment') }}</router-link></span>
      <span><router-link to="/crims-city/bank/transfers">{{ t('bank.transfers') }}</router-link></span>
      <span><router-link to="/crims-city/bank/insurance">{{ t('bank.insurance') }}</router-link></span>
      <span><router-link to="/crims-city/bank/specialTasks">{{ t('bank.specialTasks') }}</router-link></span>
      <span><router-link to="/crims-city/bank/transactionHistory">{{ t('bank.transactionHistory')
          }}</router-link></span>

    </div>


    <router-view name="bank" :pMoney="money.p_money"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';
import Loader from '../../_Core/Loader.vue';
import GameStore from 'GameVuex';

const config = getConfig();
const { t } = useI18n();
const isLoading = ref(true);
const money = ref({});


onMounted(() => {
  fetchPlayerBankMoney();
});

const fetchPlayerBankMoney = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/bank`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers
    });
    if (response.ok) {
      const playerMoney = await response.json();
      money.value = playerMoney[0];
      isLoading.value = false;

      // console.log(money.value);
      
      GameStore.commit('setPlayerMoney', money.value.p_money);
      GameStore.commit('setBankMoney', money.value.b_player_money);

    }

  } catch (error) {
    console.error("Error Bank:", error);
  }
};


const getPlayerMoney = computed(() => GameStore.state.player_money);
const getBankMoney = computed(() => GameStore.state.bank_money);
</script>


<style scoped>
.bank_money{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.balance {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 7px;
  width: fit-content;
}

span {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 7px;
  margin: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

}

.bank-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* padding-bottom: 15px; */
}
</style>
