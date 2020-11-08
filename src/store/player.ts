import { ActionContextBasic } from './index'
import { Song } from "@/types/song";

interface State {
    playingInfo: Song | null;
    playingUrl: string;
    playlist: Song[];

}

const state: State = {
    playingInfo: null,
    playingUrl: '',
    playlist: []
}

const getters = {
    playingNow: (state: State) => ({
        info: state.playingInfo,
        url: state.playingUrl
    })
}

export default {
    namespaced: true,
    state,
    getters,
    mutations: {
        UPDATE_PLAYING_NOW(state: State, val: {
            info: Song;
            url: string;
        } | null) {
            if (!val) {
                state.playingInfo = null
                state.playingUrl = ''
            } else {
                state.playingInfo = val.info
                state.playingUrl = val.url
            }
        }
    },
    actions: {
        updatePlayingNow(context: ActionContextBasic, payload: {
            info: Song;
            url: string;
        } | null = null): void {
            context.commit('UPDATE_ACCOUNT_INFO', payload)
        }
    },
    modules: {
    }
}