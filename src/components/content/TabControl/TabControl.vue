<template>
    <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentindex }"
      @click="itemCilck(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentindex: 0,
    };
  },
  methods: {
    itemCilck(index) {
      this.currentindex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>


.tab-control {
  display: flex;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #fff;
  margin-bottom: 1rem;
}
.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding-bottom: 0.266667rem;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 0.266667rem solid var(--color-high-text);
}
</style>