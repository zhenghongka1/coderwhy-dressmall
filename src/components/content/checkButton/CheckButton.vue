<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isCheck: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
  .check-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: auto 5px;
    border: 2px solid pink;
    background-color: pink;
  }
  .check-button img {
    display: inline-block;
  }
  .check {
    background-color: var(--color-high-text);
    border: 2px solid var(--color-high-text);
  }
</style>