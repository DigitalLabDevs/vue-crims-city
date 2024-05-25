<template>
  <div class="bank">
    <h2>{{ t('bank.title') }}</h2>
    <div class="balance">{{ t('bank.balance') }}: {{ formattedBalance }}</div>
    <div class="actions">
      <button @click="showDepositForm = true">{{ t('bank.deposit') }}</button>
      <button @click="showWithdrawForm = true">{{ t('bank.withdraw') }}</button>
      <button @click="toggleLoanInfo">{{ t('bank.loan') }}</button>
    </div>

    <div v-if="showDepositForm || showWithdrawForm" class="transaction-form">
      <input 
        v-model="transactionAmount" 
        type="number" 
        placeholder="Enter amount" 
      />
      <button @click="processTransaction">{{ showDepositForm ? t('bank.deposit') : t('bank.withdraw') }}</button>
      <button @click="cancelTransaction">{{ t('bank.cancel') }}</button>
    </div>

    <div v-if="showLoanInfo" class="loan-info">
      <h3>{{ t('bank.loanTitle') }}</h3>
      <p>{{ t('bank.loanDescription') }}</p>
      <button @click="applyForLoan">{{ t('bank.applyForLoan') }}</button>
      <button @click="repayLoan">{{ t('bank.repayLoan') }}</button>
    </div>

    <div class="transaction-history">
      <h3>{{ t('bank.transactionHistory') }}</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          <span>{{ transaction.type }}</span>
          <span>{{ transaction.amount }}</span>
          <span>{{ transaction.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const balance = ref(1000); // Początkowe saldo
const transactions = ref([]); // Historia transakcji

const showDepositForm = ref(false);
const showWithdrawForm = ref(false);
const showLoanInfo = ref(false);
const transactionAmount = ref('');

const formattedBalance = computed(() => {
  return `$${balance.value.toFixed(2)}`;
});

const toggleLoanInfo = () => {
  showLoanInfo.value = !showLoanInfo.value;
  showDepositForm.value = false;
  showWithdrawForm.value = false;
};

const deposit = () => {
  const parsedAmount = parseFloat(transactionAmount.value);
  if (!isNaN(parsedAmount) && parsedAmount > 0) {
    balance.value += parsedAmount;
    addTransaction('Deposit', parsedAmount);
    transactionAmount.value = '';
    showDepositForm.value = false;
  } else {
    alert(t('bank.invalidAmount'));
  }
};

const withdraw = () => {
  const parsedAmount = parseFloat(transactionAmount.value);
  if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance.value) {
    balance.value -= parsedAmount;
    addTransaction('Withdrawal', -parsedAmount);
    transactionAmount.value = '';
    showWithdrawForm.value = false;
  } else {
    alert(t('bank.invalidAmount'));
  }
};

const applyForLoan = () => {
  const loanAmount = 500; // Przykładowa kwota kredytu
  balance.value += loanAmount;
  addTransaction('Loan', loanAmount);
};

const repayLoan = () => {
  const loanAmount = 500; // Przykładowa kwota kredytu
  if (balance.value >= loanAmount) {
    balance.value -= loanAmount;
    addTransaction('Loan Repayment', -loanAmount);
  } else {
    alert(t('bank.insufficientFunds'));
  }
};

const processTransaction = () => {
  if (showDepositForm) {
    deposit();
  } else if (showWithdrawForm) {
    withdraw();
  }
};

const cancelTransaction = () => {
  showDepositForm.value = false;
  showWithdrawForm.value = false;
  transactionAmount.value = '';
};

const addTransaction = (type: string, amount: number) => {
  const transaction = {
    id: Date.now(),
    type,
    amount,
    date: new Date().toLocaleString(),
  };
  transactions.value.unshift(transaction);
};
</script>

<style scoped>
.bank {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
}

.balance {
  font-weight: bold;
  margin-bottom: 10px;
}

.actions button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.transaction-form {
  margin-top: 20px;
}

.loan-info {
  margin-top: 20px;
}

.transaction-history {
  margin-top: 20px;
}

.transaction-history ul {
  list-style-type: none;
  padding: 0;
}

.transaction-history li {
  margin-bottom: 5px;
}

.transaction-history li span {
  margin-right: 10px;
}
</style>
