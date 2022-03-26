<template>
  <div>
    <div v-if="noData && !loading" class="no-data">No data found.</div>
    <loading v-if="loading || searching"></loading>
    <template v-if="!loading && !searching && !noData && posts">
      <div>
        <Grid
          :length="posts.length"
          :pageSize="40"
          class="grid"
          :pageProvider="
            dataProvider
          "
        >
          <template v-slot:default="{ item, style }">
            <card :style="style" :post="item"></card>
          </template>
        </Grid>
      </div>
    </template>
  </div>
</template>
<script setup>
import Grid from "vue-virtual-scroll-grid";
import Card from "./Card.vue";
import Loading from "./Loading.vue";
import { usePostStore } from "../stores/post";
import { computed  } from "vue";
const postStore = usePostStore();
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  noData: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const dataProvider = async (pageNumber, pageSize) => {
  return props.posts.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
};

const searching = computed(() => {
  return postStore.searching
});
</script>

<style scoped>
.grid {
  display: grid;
  padding: 0 1rem;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  place-items: start stretch;
  grid-template-rows: 352px;
}
.list {
  max-width: 1020px;
  display: flex;
  margin-top: 100px;
  flex-wrap: wrap;
}
.no-data {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 550px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (min-width: 1650px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 2530px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

</style>