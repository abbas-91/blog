<template>
  <div class="card">
    <div>
      <img class="post-img" :src="postImage" :alt="post.title" />

      <span class="title0">{{ post.title }}</span>

      <p :title="post.text" class="text">{{ post.text }}</p>
      <div class="tags">
        <span class="tag" v-for="(tag, index) in post.tags" :key="index">{{
          tag
        }}</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="user-info">
        <img class="avatar" :src="post.avatar" :alt="post.userName" />
        <div class="user-detail">
          <span class="user-name">{{ post.userName }}</span>
          <span class="date">{{ post.publishDate }}</span>
        </div>
      </div>
      <div>
        <span class="like-text"> {{ post.likes }}</span>
        <img src="../assets/like.svg" alt="like" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});
const postImagecomputed = computed(() => {
  return props.post.image || require("../assets/placeholder.jpg");
});
</script>

<style lang="scss" scoped>
@import "../assets/_variables.scss";

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  width: 245px;
  height: 352px;
  border: 1px solid $light-gray;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 10px 5px;
  justify-content: space-between;
}

.tag {
  border: 1px solid $light-gray;
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 10px;
  padding: 4px 12px;
  margin: 2px;
}

.post-img {
  height: 123px;
  width: 221px;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 100%;
}

.text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 80px;
  font-size: 14px;
  color: $gray;
  max-width: 200px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  color: $gray;
}

.card-footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 10px;
}

.user-detail {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}

.user-name {
  font-weight: bold;
}

.date {
  color: $gray;
}

.like-text {
  color: $gray;
  padding-right: 6px;
  font-size: 12px;
}

.title {
  font-size: 18px;
  color: black;
  font-weight: 700;
}
</style>