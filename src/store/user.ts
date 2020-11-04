import {Store} from 'vuex'

interface State {
    accountInfo: object | null;
}

const state: State = {
    accountInfo: null
}

const getters = {
    accountInfo: (state: State) => state.accountInfo
}

export default {
    namespaced: true,
    state,
    getters,
    mutations: {
        UPDATE_ACCOUNT_INFO(state: State, val: object) {
            state.accountInfo = val
        }
    },
    actions: {
        updateAccountInfo({ commit,state }, payload = null) {
            commit('UPDATE_ACCOUNT_INFO', payload)
        }
    },
    modules: {
    }
}