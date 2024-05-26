import { createStore } from 'vuex';

// Klucz, pod którym będzie zapisywany stan w sessionStorage
const STORAGE_KEY = 'game_store';

// Funkcja, która zapisuje stan do sessionStorage
function saveState(state) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Funkcja, która przywraca stan z sessionStorage
function loadState() {
  const storedState = sessionStorage.getItem(STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : {};
}

const GameStore = createStore({
  state: {
    player_money: null,
    bank_money: null,
    ...loadState() // Przywracanie stanu z sessionStorage
  },
  mutations: {
    setPlayerMoney(state, player_money) {
      state.player_money = player_money;
      saveState(state); // Zapisanie stanu po każdej zmianie
    },
    setBankMoney(state, bank_money) {
      state.bank_money = bank_money;
      saveState(state); // Zapisanie stanu po każdej zmianie
    },
  },
  getters: {
    getPlayerMoney(state) {
      return state.player_money !== null;
    },
    getBankMoney(state) {
      return state.bank_money !== null;
    },
  },
});

export default GameStore;
