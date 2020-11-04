import { GET } from './index'

import { SearchParams } from '../types/search'

export const search = (params: SearchParams) => GET('search', params)