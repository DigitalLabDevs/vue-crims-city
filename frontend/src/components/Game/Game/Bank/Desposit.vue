<template>
  <div class="bank-deposit">

    <p>{{ t('bank.balance') }}: $ {{ getPlayerMoney }}</p>


    <h2>{{ $t('bank.cashDepositMachine') }}</h2>
    <div class="input-group">
      <label for="deposit-amount">{{ $t('bank.depositTitle') }}</label>
      <input v-model="amount" id="deposit-amount" type="number" min="0" :placeholder="$t('bank.depositPlaceholder')" />
    </div>
    <span class="deposit-button" @click="makeDeposit">{{ $t('bank.depositButton') }}</span>
    <span class="deposit-button" @click="depositAll">{{ $t('bank.depositAllButton') }}</span>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';

import GameStore from '../../Core/GameVuex';


const config = getConfig();

const { t } = useI18n();

const props = defineProps({
  pMoney: {
    type: Number,
    required: true
  }
});

const amount = ref<number | null>(null);
const message = ref<string | null>(null);

const makeDeposit = async () => {
  if (CanMakeDeposit(amount.value, getPlayerMoney.value)) {
    try {
      const response = await fetch(`${config.API_URL}/game/bank/deposit`, {
        method: config.method,
        credentials: config.credentials,
        headers: config.headers,
        body: JSON.stringify({ amount: amount.value })
      });

      if (response.ok) {
        const data = await response.json();
        message.value = `${t('bank.message.Deposit')} $ ${amount.value}`;
        amount.value = null; // Resetowanie pola po dokonaniu depozytu
        GameStore.commit('setPlayerMoney', data.newPlayerMoney);
        GameStore.commit('setBankMoney', data.newBankPlayerMoney);
      } else {
        const errorData = await response.json();
        message.value = `Error: ${errorData.message}`;
      }
    } catch (error) {
      console.error('Error making deposit:', error);
      message.value = 'An error occurred. Please try again later.';
    }
  }
};

const CanMakeDeposit = (depositAmount: number, playerMoney: number): boolean => {
  console.log(`depositAmount: ${depositAmount}`);
    console.log(`playerMoney: ${playerMoney}`);
  if (depositAmount === null || depositAmount <= 0) {
    message.value = t('bank.invalidAmount');
    return false;
  } else if (depositAmount > playerMoney) {
    
    console.log(`depositAmount > playerMoney`);
    message.value = t('bank.insufficientFunds');
    return false;
  }
  console.log(`true`);
  return true;

};



// Getter obliczony z Vuex
const getPlayerMoney = computed(() => GameStore.state.player_money);

const depositAll = () => {
  amount.value = getPlayerMoney.value;
  makeDeposit();
};
</script>

<style scoped>
.bank-deposit {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #000000;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

#deposit-amount {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.deposit-button {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.deposit-button:hover {
  background-color: var(--RGBA-BLACK-50);
}

.message {
  margin-top: 20px;
  color: rgb(0, 255, 255);
  background-color: var(--RGBA-BLACK-50);
  padding: 15px;
}
</style>
