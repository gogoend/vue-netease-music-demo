import { GET } from './index'

import { API } from '../types/song'

export const getPlaylistDetail = (params: API.UrlP) => GET('playlist/detail', params)