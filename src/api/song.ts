import { Download, GET } from './index'

import { API } from '../types/song'

export const getSongFileInfo = (params: API.UrlP) => GET('song/url', params)

export const downloadSongByUrl = (url: string, component: any) => Download(url, {}, {
    onDownloadProgress(ev: ProgressEvent) {
        console.log()
        if (component){
            component.downloadProgress = ev.loaded / ev.total * 100
        }
    }
})
