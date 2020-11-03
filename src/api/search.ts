import { GET } from './index'

interface SearchParams {
    keywords: string;
}
export const search = (params: SearchParams) => { GET('search', params) }