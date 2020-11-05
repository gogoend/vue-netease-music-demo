import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'

export interface ActionContextBasic {
    commit: Commit;
    dispatch: Dispatch;
}

import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
