import { Download, GET } from './index'

import { API } from '../types/song'

export const getSongFileInfo = (params: API.UrlP) => GET('song/url', params)

export const downloadSongByUrl = (url: string, progressCb?: Function) => Download(url, {}, {
    onDownloadProgress(ev: ProgressEvent) {
        if (progressCb){
            progressCb(ev)
        }
    }
})

export const getSongDetail = (params: {
    ids: string;
}) => GET('song/detail', params)