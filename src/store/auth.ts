import { ActionContextBasic } from '@/types/ActionContextBasic'

import { AuthDialogType } from '@/types/auth'

interface State {
    authDialogVisible: boolean;
    authDialogType: AuthDialogType;
}

const state: State = {
    authDialogVisible: false,
    authDialogType: 'login'
}

const mutations = {
    SHOW_AUTH_DIALOG(state: State, val: boolean) {
        state.authDialogVisible = val
    },
    CHANGE_AUTH_DIALOG_TYPE(state: State, val: AuthDialogType) {
        state.authDialogType = val
    }
}

const getters = {
    authDialogVisible(state: State){
        console.log(state)
        return state.authDialogVisible
    },
    authDialogType(state: State){
        return state.authDialogType
    }
    // authDialogType: AuthDialogType;
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions: {
        showAuthDialog(context: ActionContextBasic, payload: boolean): void {
            context.commit('SHOW_AUTH_DIALOG', payload)
        },
        changeAuthDialogType(context: ActionContextBasic, payload: AuthDialogType): void {
            context.commit('CHANGE_AUTH_DIALOG_TYPE', payload)
        }
    },
    modules: {
    }
}