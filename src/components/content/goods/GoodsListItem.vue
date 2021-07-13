<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" />
    <div class="goods-info">
      <p>{{ goodItem.title }}</p>
        <span class="price">{{ goodItem.price }}</span>
        <span class="collect">{{ goodItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListitem",
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      },
    },
    
  },
  computed:{
    showImage(){
      return this.goodItem.image || this.goodItem.show.img
    }
  },
  methods:{
    itemClick(){
      // console.log('-----');
      this.$router.push('/detail/' + this.goodItem.iid)
    }
  }
};
</script>

<style>
  .goods-item {
    padding-bottom: 3rem;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 1rem;
    border:0.2rem solid var(--color-tint);
  }

  .goods-info {
    font-size: 1rem;
    position: absolute;
    bottom: 0.3rem;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.2rem;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 2rem;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -1.1rem;
    top: -0.1rem;
    width: 1rem;
    height: 1rem;
    background: url("~assets/img/common/collect.svg") 0 0/1rem 1rem;
  }
</style>