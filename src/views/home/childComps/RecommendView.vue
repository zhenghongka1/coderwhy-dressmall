<template>
  <div class="recommred">
    <div
      v-for="(item, index) in recommends.list"
      :key="index"
      class="recommred-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommred {
  display: flex;
  margin: 0.5rem 0 1.333333rem;
  text-align: center;
  font-size: 0.16rem;
  border-bottom: .5rem solid rgb(248, 244, 244);
}

.recommred-item {
  flex: 1;
  margin-bottom: 2rem;
}

.recommred img {
  width: 80%;
  padding-bottom: 0.133333rem;
}
</style>