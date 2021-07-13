<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div class="center" slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./ChildCart/CartList.vue";
import CartBottomBar from "./ChildCart/CartBottomBar.vue"
import Scroll from "components/common/scroller/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  computed: {
    //   第一种写法
    // ...mapGetters([
    //     'cartLength'
    // ])

    // 第二种写法
    ...mapGetters({
      length: "cartLength",
    }),
  },
  activated(){
    //要刷新一次，因为不刷新，此时betterscroll不能监听到数据的更新，此时可滚动的区域就是0
      this.$refs.scroll.scroll.refresh()
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-size: 20px;
}

.content {
  height: calc(100% - 95px);
  overflow: hidden;
}
</style>
