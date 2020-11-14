<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl"
      class="tabControlShow"
      v-if="isTabFixed"
    />
    <scroll
      class="content"
      ref="scrollObj"
      :probe-type="3"
      @scrollmessage="contentscroll"
      :pull-up-load="true"
      @pullingUpLoad="loadmore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="BTClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navigationbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 处于活跃时
  activated() {
    // 滚动到上次保存的位置
    this.$refs.scrollObj.scrollTo(0, this.saveY, 0);
    // 刷新
    this.$refs.scrollObj.refresh();
  },
  // 不处于活跃时
  deactivated() {
    // 将当前位置记录下来
    this.saveY = this.$refs.scrollObj.scroll.y;
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidataPackage();
    // 2.请求商品数据
    this.getHomeGoodsPackage("pop");
    this.getHomeGoodsPackage("new");
    this.getHomeGoodsPackage("sell");
  },
  mounted() {
    // 1.item中图片加载完成的事件监听
    const refresh = debounce(this.$refs.scrollObj.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    BTClick() {
      // 回到顶部
      // 先通过refs获取到scrollObj对象再调用scroll对象的scroll属性，调用scroll属性中的scrollTo方法实现返回顶部
      // this.$refs.scrollObj.scroll.scrollTo(0, 0, 500);
      // 调用scroll对象中封装后的scrollTo方法
      this.$refs.scrollObj.scrollTo(0, 0, 500);
    },
    contentscroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;

      // 2.决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = position.y < -this.tabOffsetTop;
    },
    loadmore() {
      // console.log("上拉加载更多");
      this.getHomeGoodsPackage(this.currentType);
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidataPackage() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsPackage(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 通过for循环方式将请求过来的数组数据追加到定义的数组中存储
        // for (let arr in res.data.list) {
        //   this.goods[type].list.push(arr);
        // }

        // 将数组解构，再将当前数组中的值追加到定义的数组中
        this.goods[type].list.push(...res.data.list);
        // 将页码加一
        this.goods[type].page += 1;

        // 重复加载更多
        this.$refs.scrollObj.finishPullUp();
      });
    },
    swiperImageLoad() {
      // 获取tabControl的tabOffsetTop
      // 所有的组件都有一个元素$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh：视口高度 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-high-text);
  color: #fff;
  /* 
  在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabControlShow {
  position: relative;
  z-index: 9;
}
</style>
