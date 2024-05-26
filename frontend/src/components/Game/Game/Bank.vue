<template>
  <Loader v-if="isLoading"/>
  <div v-else class="bank">
    <h2>{{ t('bank.title') }}</h2>
    <div class="balance">{{ t('bank.balance') }}: $ {{ money.p_money }}</div>
    <div class="bank-actions">

      <span><router-link to="/crims-city/bank/deposit">{{ t('bank.deposit') }}</router-link></span>
      <span><router-link to="/crims-city/bank/withdraw">{{ t('bank.withdraw') }}</router-link></span>
      <span><router-link to="/crims-city/bank/safedepositboxes">{{ t('bank.safeDepositBoxes') }}</router-link></span>
      <span><router-link to="/crims-city/bank/investment">{{ t('bank.investment') }}</router-link></span>
      <span><router-link to="/crims-city/bank/transfers">{{ t('bank.transfers') }}</router-link></span>
      <span><router-link to="/crims-city/bank/insurance">{{ t('bank.insurance') }}</router-link></span>
      <span><router-link to="/crims-city/bank/specialTasks">{{ t('bank.specialTasks') }}</router-link></span>
      <span><router-link to="/crims-city/bank/transactionHistory">{{ t('bank.transactionHistory')
          }}</router-link></span>

    </div>


    <router-view name="bank"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';

const config = getConfig();
const { t } = useI18n();
const isLoading = ref(true);
const money = ref([]);

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
      console.log(money.value);
    }

  } catch (error) {
    console.error("Error Bank:", error);
  }
};
</script>


<style scoped>
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
