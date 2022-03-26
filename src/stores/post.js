import { defineStore } from 'pinia'
import {
  getPosts,
  getUsers
} from "../api-service";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    filter: '',
    users: [],
    isFetched: false,
    searching: false
  }),
  getters: {
    filteredPosts(state) {
      return state.filter ?
        state.posts.filter(u => u.text.toLowerCase().includes(state.filter.toLowerCase())) :
        state.posts;
    },
    noPostsFound(state) {
      return (state.posts.length === 0 || this.filteredPosts.length === 0);
    }
  },
  actions: {
    addPost(post) {
      this.posts.unshift(post);
    },
    async fetchPosts() {
      const response = await getPosts();
      const data = (response.data.map(item => {
        const user = this.users.find(u => u.id === item.userId);
        const date = new Date(item.publishDate)
        return {
          id: item.id,
          image: item.image,
          likes: item.likes,
          publishDate: `${date.getFullYear()} ${monthNames[date.getMonth()]} ${date.getDate()}`,
          userName: `${user.firstName} ${user.lastName}`,
          tags: item.tags,
          text: item.text,
          avatar: user.avatar
        }
      }))
      this.posts = [...this.posts, ...data];
      this.isFetched = true;
    },
    setFilter(filter) {
      this.filter = filter;
    },
    setUsers(users) {
      this.users = users;
    },
    async fetchUsers() {
      const response = await getUsers();
      this.users = response.data;
    },
    setSearching(searching) {
      this.searching = searching
    }
  },
})