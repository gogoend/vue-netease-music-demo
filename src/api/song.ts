import { Download, GET } from './index'

import { API } from '../types/song'

export const getSongFileInfo = (params: API.UrlP) => GET('song/url',params)

export const downloadSongByUrl = (url: string) => Download(url)
 