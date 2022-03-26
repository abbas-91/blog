<template>
  <div class="new-con">
    <div class="w-full">
      <div class="new-header">
        <div class="flex">
          <span class="back">
            <img src="../assets/back.svg" alt="back" @click="back" />
          </span>
          <span class="new-text">New post</span>
        </div>
        <span class="btn" @click="addNew">Publish post</span>
      </div>
      <div class="input-con">
        <label>Title</label>
        <input type="text" v-model="post.title" @input="v$.title.$touch()" />
        <span v-if="v$.title.$error" class="text-danger">Title is required</span>
      </div>
      <div class="input-con">
        <span class="black-text">Text</span>
        <textarea v-model="post.text" @input="v$.text.$touch()" />
        <span v-if="v$.text.$error" class="text-danger">Text is required</span>
      </div>
      <div class="input-con">
        <span class="black-text">Tags</span>
        <div class="relative">
          <input type="text" v-model="tag" />
          <span @click="addTag" class="add-action" :class="{ 'text-blue': tag }">
            Add
            <plus-icon :color="tag ? '#4F73D0' : '#E7E7E7'" />
          </span>
        </div>
        <div>
          <span class="tag" v-for="(item, index) in post.tags" :key="index">
            <remove-icon @click="remove(index)" />
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { required } from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";
import { usePostStore } from "../stores/post";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import PlusIcon from '../components/icons/Plus.vue'
import RemoveIcon from '../components/icons/Remove.vue'
const router = useRouter()
const initialPost = { title: "", text: "", tags: [] }
const post = reactive({ ...initialPost });
const tag = ref("");
const rules = {
  post: {
    title: {
      required,
    },
    text: {
      required,
    },
  }
};
const v$ = useVuelidate(rules.post, post);
const postStore = usePostStore();
const back = () => {
  router.push({ name: 'Posts' });
};
const addTag = () => {
  if (tag.value) {
    post.tags.push(tag.value);
    tag.value = "";
  }
};
const remove = (index) => {
  post.tags.splice(index, 1);
};
const addNew = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    postStore.addPost(post);
    Object.assign(post, initialPost);
    post.tags = [];
    v$.value.$reset();
  }
};
</script>

<style lang="scss">
@import "../assets/_variables.scss";

.new-con {
  max-width: 503px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  input[type="text"] {
    height: 40px;
  }
  textarea {
    height: 120px;
  }
  input[type="text"],
  textarea {
    border: 1px solid $light-gray;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    margin-top: 4px;
    padding: 12px 16px;
    outline: none;
    &:focus {
      border: 1px solid $gray;
    }
  }
  .new-header {
    display: flex;
    justify-content: space-between;
  }

  .back {
    width: 40px;
    height: 40px;
    border: 1px solid $gray-g1;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    cursor: pointer;
  }

  .new-text {
    color: $black;
    font-size: 22px;
    font-weight: bold;
  }

  .input-con {
    margin-top: 24px;
    text-align: left;
  }

  .black-text {
    color: $black;
  }

  .add-action {
    position: absolute;
    transition: color 0.5s ease;
    right: 15px;
    top: 15px;
    cursor: pointer;
    color: $light-gray;
    font-size: 14px;
    font-weight: 700;
  }

  .remove-icon {
    margin-right: 8px;
  }
  .tag {
    border: 1px solid $light-gray;
    box-sizing: border-box;
    border-radius: 24px;
    font-size: 14px;
    padding: 4px 12px;
    margin: 8px;
    display: inline-block;
    color: $gray;
    &:hover {
      border-color: $black;
      color: $black;
      transition: color 0.5s ease, filter 0.5s ease;
      path {
        fill: $black !important;
        cursor: pointer;
      }
    }
  }
}
</style>
