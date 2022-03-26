<template>
  <div>
    <top-bar></top-bar>
    <div class="posts">
      <list :posts="filteredPosts" :no-data="noPostsFound" :loading="loading" />
    </div>
  </div>
</template>
<script setup>
import List from "../components/List.vue";
import TopBar from "../components/TopBar.vue";
import { usePostStore } from "../stores/post";
import { ref, computed, onMounted } from "vue";
const loading = ref(true)
const postStore = usePostStore();
const filteredPosts = computed(() => {
  return postStore.filteredPosts
});
const isFetched = computed(() => {
  return postStore.isFetched
});
const noPostsFound = computed(() => {
  return postStore.noPostsFound
});
onMounted(async () => {
  try {
    if (!postStore.isFetched) {
      await postStore.fetchUsers();
      await postStore.fetchPosts();
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
</style>