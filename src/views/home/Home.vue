<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新歌', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <!-- :probe-type="3" 3表示实时监听 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="more"
    >
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <!-- <swiper>
      <swiper-item v-for="(item, index) in banner.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新歌', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// import swiper from "components/common/swiper/Swiper";
// import swiperItem from "components/common/swiper/SwiperItem";
// import { Swiper, SwiperItem } from "components/common/swiper";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroller/Scroll";
import BackTop from "components/content/backtop/BackTop";

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
    Scroll,
    BackTop,
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
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
    activated() {
      this.$refs.scroll.refresh();
      
      this.$refs.scroll.scrollTo(0, this.saveY,0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
     
    },
    // destroyed(){
    //   console.log('destroyed');
    // }
  },

  mounted() {},

  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
          this.currentType = "sell";
          break;
      }

      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 300);
      // console.log(this.$refs.scroll);
    },
    contentscroll(positions) {
      // console.log(positions);

      //简单写法：this.isShowBackTop = (-positions.y)>1000
      if (-positions.y > 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }

      //决定tabControl是否吸顶
      this.isTabFixed = -positions.y > this.tabOffsetTop;
    },
    more() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  /* height: calc(100vh - 49px); */
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
