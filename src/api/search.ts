import { GET } from './index'

import { API } from '../types/search'

export const search = (params: API.SearchParams) => GET('search', params)