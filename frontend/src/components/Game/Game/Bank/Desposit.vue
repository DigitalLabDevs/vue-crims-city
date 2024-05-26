<template>
  <div class="bank-deposit">
    <h2>{{ $t('bank.atm') }}</h2>
    <div class="input-group">
      <label for="deposit-amount">{{ $t('bank.depositTitle') }}</label>
      <input v-model="amount" id="deposit-amount" type="number" min="0" :placeholder="$t('bank.depositPlaceholder')" />
    </div>
    <span class="deposit-button" @click="makeDeposit">{{ $t('bank.depositButton') }}</span>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';

const config = getConfig();

const { t } = useI18n();

const amount = ref<number | null>(null);
const message = ref<string | null>(null);

const makeDeposit = async () => {
  if (amount.value !== null && amount.value > 0) {
    try {
      const response = await fetch(`${config.API_URL}/game/bank/deposit`, {
        method: config.method,
        credentials: config.credentials,
        headers: config.headers,
        body: JSON.stringify({ amount: amount.value })        
      });

      if (response.ok) {
        const data = await response.json();
        message.value = t('successMessage', { amount: amount.value });
        amount.value = null; // Resetowanie pola po dokonaniu depozytu
      } else {
        const errorData = await response.json();
        message.value = `Error: ${errorData.message}`;
      }
    } catch (error) {
      console.error('Error making deposit:', error);
      message.value = 'An error occurred. Please try again later.';
    }
  } else {
    message.value = t('errorMessage');
  }
};
</script>

<style scoped>
.bank-deposit {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* background-color: #f9f9f9; */
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
  background-color: rgba(0, 0, 0, 0.5);
}

.message {
  margin-top: 20px;
  color: green;
}
</style>
