<template>
  <swiper>
    <swiper-item v-for="(item, index) in banner.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banner: {
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    imageload() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>