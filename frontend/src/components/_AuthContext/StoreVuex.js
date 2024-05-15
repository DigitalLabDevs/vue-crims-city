import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    sessionToken: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.sessionToken = null;
    },
    setSessionToken(state, token) {
      state.sessionToken = token;
    },
    clearSessionToken(state) {
      state.sessionToken = null;
    }, 
  },
  getters: {
    isAuthenticated(state) {
      return state.sessionToken !== null;
    },
  },
});

export default store;
