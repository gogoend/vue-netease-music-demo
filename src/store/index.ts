import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user'
import player from './player'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    player,
    auth
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, overwrite: true
    })
  ]
})
