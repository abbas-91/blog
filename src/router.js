import { createRouter, createWebHashHistory } from 'vue-router'
import Posts from './views/Posts.vue'
import NewPost from './views/NewPost.vue'

const routes= [
    {
        path: '',
        name: 'Home',
        component: Posts,
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => Posts,
    },
    {
        path: '/new',
        name: 'NewPost',
        component: NewPost,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })


export default router