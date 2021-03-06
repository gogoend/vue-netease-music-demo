import { ActionContextBasic } from '@/types/ActionContextBasic.d.ts'
import { Song,SongFile, PlayingNow } from "@/types/song";

interface State {
    playingInfo: Song | null;
    playingFile: SongFile | null;
    playlist: Song[];

}

const state: State = {
    playingInfo: null,
    playingFile: null,
    playlist: []
}

const getters = {
    playingNow: (state: State): PlayingNow => ({
        info: state.playingInfo,
        file: state.playingFile
    })
}

const mutations = {
    UPDATE_PLAYING_NOW(state: State, val: PlayingNow | null) {
        if (!val) {
            state.playingInfo = null
            state.playingFile = null
        } else {
            state.playingInfo = val.info
            state.playingFile = val.file
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions: {
        updatePlayingNow(context: ActionContextBasic, payload: PlayingNow | null = null): void {
            context.commit('UPDATE_PLAYING_NOW', payload)
        }
    },
    modules: {
    }
}