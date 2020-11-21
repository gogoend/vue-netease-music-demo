import { GET } from './index'

import { API } from '../types/song'

export const getSubcount = (params?: API.UrlP) => GET('user/subcount', params)

export const getPlaylist = (params?: API.PlaylistP) => GET('/user/playlist', params)
