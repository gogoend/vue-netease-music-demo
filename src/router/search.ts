import Search from '../views/Search/index.vue'

export default {
    path: '/search/:kw',
    name: 'search',
    component: Search,
    // redirect: '/search/song/:kw',
    // children: [{
    //     path: '/search/song/:kw',
    //     name: 'searchSong',
    //     component: Search
    // }
    // ]
}