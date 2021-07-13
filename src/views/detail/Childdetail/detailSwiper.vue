<template>
  <div class="detail-swiper">
      <swiper class="swiperscroll">
      <swiper-item v-for="item in topImages" :key="item">
          <img :src="item" alt="">
      </swiper-item>
      </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "detailSwiper",
  name:"Detial",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swiperscroll{
    height: 300px;
    overflow: hidden;
}
</style>