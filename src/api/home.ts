import { GET, /* POST */ } from './index'

export const getHomeData = (params?: unknown) => GET('homepage/block/page', params)
