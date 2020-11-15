<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 创建better-scroll对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
      // observeDOM: true
    });

    // 监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scrollmessage", position);
      });
    }

    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUpLoad");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 重复加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新刷新高度
    refresh() {
      // console.log("重新刷新高度");
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped></style>
