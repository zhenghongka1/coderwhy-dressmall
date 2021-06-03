<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner" />
    <!-- <swiper>
      <swiper-item v-for="(item, index) in banner.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新歌', '精选']" @tabClick="tabClick" />
    <goods-list :goods="showGoods" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// import swiper from "components/common/swiper/Swiper";
// import swiperItem from "components/common/swiper/SwiperItem";
// import { Swiper, SwiperItem } from "components/common/swiper";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeData, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    // Swiper,
    // SwiperItem,
    RecommendView,
    FeatureView,
  },

  data() {
    return {
      banner: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
    };
  },

  computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
  },

  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType  = "sell";
          break;
      }

    },

    //网络请求相关
    getHomeData() {
      getHomeData().then((res) => {
        this.banner = res.data.data.banner;
        this.recommends = res.data.data.recommend;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
.home-nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
