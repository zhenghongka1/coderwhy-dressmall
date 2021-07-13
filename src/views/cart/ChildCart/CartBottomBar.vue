<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isCheck="selectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="right" @click="cartBuy">去结算({{ totalCount }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.ischeck;
          })
          .reduce((preValue, item) => {
            return preValue + parseInt(item.price.substring(1)) * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    totalCount() {
      return this.cartList.filter((item) => item.ischeck).length;
    },
    selectAll() {
      if (this.cartList.length === 0) return false;
      // return !(this.cartList.filter((item) => !item.ischeck).length)  false

      // return !this.cartList.find((item) => !item.ischeck);

      for (let item of this.cartList) {
        if (!item.ischeck) {
          return false;
        }
      }
      return true
    },
  },
  methods: {
    cartBuy() {
      // this.$emit("cartBuy");

      // this.$toasts.shows(res,2000)
    },
    checkClick() {
      // console.log('----');
      if (this.selectAll) {
        this.cartList.forEach((item) => (item.ischeck = false));
      }else{
        this.cartList.forEach((item) => (item.ischeck = true));
      }
      
      // 以下为简化操作，因为一边遍历一边修改值，所以不符合逻辑
      // this.cartList.forEach(item => item.ischeck = !this.selectAll)
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}
.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}
.check-content span {
  padding-left: 40px;
}
.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 20px;
  width: 20px;
}
.price {
  flex: 1;
}
.right {
  text-align: center;
  background-color: var(--color-high-text);
  width: 100px;
  color: white;
}
</style>