import { GET } from './index'

import { API } from '../types/search'

export const search = (params: API.SearchP) => GET('search', params)