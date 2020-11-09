<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <img slot="item-icon" src="~assets/images/tabbar/icon01.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/images/tabbar/icon01_active.png"
        alt=""
      />
      <div slot="item-text">主页</div>
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <img slot="item-icon" src="~assets/images/tabbar/icon02.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/images/tabbar/icon02_active.png"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <img slot="item-icon" src="~assets/images/tabbar/icon03.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/images/tabbar/icon03_active.png"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <img slot="item-icon" src="~assets/images/tabbar/icon04.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/images/tabbar/icon04_active.png"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style></style>
