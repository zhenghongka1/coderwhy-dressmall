<template>
  <nav-bar>
    <div slot="center" class="titles">
      <div
        class="title-item"
        v-for="(item, index) in titles"
        :key="item"
        :class="{ active: index === currentindex }"
        @click="currentClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="leftback" slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "detailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentindex: 0,
    };
  },
  methods: {
    currentClick(index) {
      this.currentindex = index;
      
      this.$emit("currentClick",index)
    },
    backClick() {
      this.$router.go(-1);
      // this.$router.back();

    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 1rem;
}

.active {
  color: var(--color-high-text);
}

.leftback {
  margin: 0.4rem;
}
</style>