<template>
  <ul class="cart-list">
    <!-- <li v-for="(item, index) in cartList" :key="index" :product="item">
      {{ item }}
    </li> -->
    <li>
        <cart-list-item v-for="(item,index) in cartList"  :key="index" :product="item"/>
    </li>
  </ul>
</template>

<script>
import CartListItem from "./CartListItem.vue"

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
      CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style>
</style>