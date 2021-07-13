<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,

      // 默认状态设置为0表示不需要进行实时监听
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scroll: null,
    };
  },

  methods:{
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    this.scroll.on("scroll", (positions) => {
      // console.log(positions);
      this.$emit("scroll", positions);
    });

    this.scroll.on("pullingUp", () => {
      //   console.log("上拉加载更多");
      this.$emit("pullingUp");
    });
  },
};
</script>

<style>
</style>
