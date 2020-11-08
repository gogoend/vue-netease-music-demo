import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

export interface ActionContextBasic {
    commit: Commit;
    dispatch: Dispatch;
}

import user from './user'
import player from './player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,player
  },
  plugins: [
    // createPersistedState({
    //   storage: window.sessionStorage, overwrite: true
    // })
  ]
})
