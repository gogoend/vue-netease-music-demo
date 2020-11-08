import { GET } from './index'

import { API } from '../types/song'

export const getSongFileUrl = (params: API.UrlP) => GET('song/url',params)
 