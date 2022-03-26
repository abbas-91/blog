<template>
  <div class="header">
    <div class="action-con">
      <div class="flex-1">
        <div class="search-box">
          <input
            type="text"
            v-model="filter"
            @input="debounceSearch"
            placeholder="Search"
            class="search-input"
          />
          <search-icon class="search-icon" :color="filter ? '#2D2D2D' : '#9D9D9D'" />
        </div>
      </div>
      <div class="flex-1 flex-end">
        <span class="btn add-new-btn" @click="addNew">
          Add new Post
          <img src="../assets/plus.svg" alt="add new" class="add-new" />
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { usePostStore } from '../stores/post'
import { useRouter } from 'vue-router'
import SearchIcon from './icons/Search.vue'
const router = useRouter()
const filter = ref("")
let debounce = null
const postStore = usePostStore()
const debounceSearch = (event) => {
  postStore.setSearching(true)
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    const value = event.target.value
      ? event.target.value.toLowerCase()
      : "";
    postStore.setFilter(value);
    postStore.setSearching(false)
  }, 500);
}
const addNew = () => {
  router.push({ name: 'NewPost' });
}
</script>

<style lang="scss" scoped>
@import "../assets/_variables.scss";
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 99;
}
.action-con {
  max-width: 1020px;
  width: 100%;
  display: flex;
  align-items: center;
}

.content {
  padding-top: 80px;
}

.b-shadow {
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
}
input[type="text"] {
  width: 100%;
  border: 1px solid $gray-g1;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}
.search-input {
  height: 40px;
  border-radius: 24px;
  width: 100%;
  padding-left: 40px !important;
}

.add-new {
  padding-left: 10px;
}

.search-box {
  position: relative;
  max-width: 316px;
  width: 100%;
  .search-icon {
    position: absolute;
    left: 20px;
    top: 20px;
  }
}

.add-new-btn {
  max-width: 150px;
}
</style>
