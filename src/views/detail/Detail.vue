<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @currentClick="currentClick" ref="nav" />
    <!-- :probe-type="3" 3表示实时监听 -->
    <scroll class="content" ref="scroll" :probeType="3" @scroll="itemscroll">
      <!-- <div v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</div> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :imagesInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar
      @addShopCar="addShopCarClick"
      class="detail-bottom-bar"
    />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" class="toast" :show="show" /> -->
  </div>
</template>

<script>
import detailNavBar from "./Childdetail/detailNavBar";
import detailSwiper from "./Childdetail/detailSwiper";
import DetailBaseInfo from "./Childdetail/DetailBaseInfo.vue";
import DetailShopInfo from "./Childdetail/detialShopInfo.vue";
import DetailImagesInfo from "./Childdetail/DetailImagesInfo.vue";
import DetailParamInfo from "./Childdetail/DetailParamInfo.vue";
import DetailCommentInfo from "./Childdetail/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./Childdetail/DetailBottomBar.vue";
import BackTop from "components/content/backtop/BackTop";
// import Toast from "components/common/toast/Toast";
import Scroll from "components/common/scroller/Scroll";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommends,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    detailNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      comment: {},
      recommends: [],
      detailitemshowY: [],
      getitemTopY: null,
      currentindex: null,
      isShowBackTop: false,
      message: "",
      show: false,
    };
  },
  // 注意是否有keep-alive，如果在created的话组件只会被创建一次，所以用activated
  activated() {
    this.iid = this.$route.params.iid;

    // 请求详情页的数据
    getDetail(this.iid).then((res) => {
      // console.log(res);

      const data = res.data.result;

      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate != 0) {
        this.comment = data.rate.list[0];
      }

      getRecommends().then((res) => {
        // console.log(res);
        this.recommends = res.data.data.list;
      });

      // $nextTick是内置的方法用来执行渲染完毕之后的回调方法，但是图片没有对应加载完毕，目前获取到的offsetTop不包含图片
      // this.$nextTick(() => {
      //   this.detailitemshowY = [];
      //   this.detailitemshowY.push(0);
      //   this.detailitemshowY.push(this.$refs.params.$el.offsetTop);
      //   this.detailitemshowY.push(this.$refs.comment.$el.offsetTop);
      //   this.detailitemshowY.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.detailitemshowY);
      // });
    });
  },
  // 只能在生命周期中的钩子函数updated中定义当前所拿到的offsetTop，但是图片没有对应加载完毕，目前获取到的offsetTop不包含图片
  // 且更新会执行俩次
  // updated(){
  //   this.detailitemshowY = []
  //   this.detailitemshowY.push(0)
  //   this.detailitemshowY.push(this.$refs.params.$el.offsetTop)
  //   this.detailitemshowY.push(this.$refs.comment.$el.offsetTop)
  //   this.detailitemshowY.push(this.$refs.recommend.$el.offsetTop)

  //   console.log(this.detailitemshowY);
  // },
  methods: {
    ...mapActions(["addCart"]),
    imgLoad() {
      this.$refs.scroll.refresh();

      //这里可以解决问题，但是回调该方法太多次
      this.detailitemshowY = [];
      this.detailitemshowY.push(0);
      this.detailitemshowY.push(this.$refs.params.$el.offsetTop);
      this.detailitemshowY.push(this.$refs.comment.$el.offsetTop);
      this.detailitemshowY.push(this.$refs.recommend.$el.offsetTop);
    },
    currentClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.detailitemshowY[index], 0);
    },
    itemscroll(positions) {
      // console.log(positions);

      const positionY = -positions.y;

      let length = this.detailitemshowY.length;

      for (let i = 0; i < length; i++) {
        // console.log(i);

        if (
          this.currentindex !== i &&
          ((i < length - 1 &&
            positionY >= this.detailitemshowY[i] &&
            positionY < this.detailitemshowY[i + 1]) ||
            (i === length - 1 && positionY >= this.detailitemshowY[i]))
        ) {
          this.currentindex = i;
          // console.log(this.currentindex);
          this.$refs.nav.currentindex = this.currentindex;
        }
      }

      //简单写法：this.isShowBackTop = (-positions.y)>1000
      if (-positions.y > 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 300);
      // console.log(this.$refs.scroll);
    },
    addShopCarClick() {
      // 1.获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      // 将商品的添加到购物车里
      // this.$store.dispatch("addCart", product)

      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // // console.log(res);

        // setTimeout(()=>{
        //   this.show =false
        // },1500)

        this.$toast.show(res,2000)
      });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 99;
  background-color: #fff;
}

.detail-bottom-bar {
  position: absolute;
  z-index: 9999;
}

/* .toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
} */
</style>