*@Author: hao.ling
*@Date: 2020/11/19 15:47
*@Annotation: 首页

<template>
  <div id="index-home">
    <a-layout>
      <a-layout-header id="header">
        <top/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider id="side">
          <leftMenu/>
        </a-layout-sider>
        <a-layout-content id="content">
          <con/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Top from "@/views/home/top";
import leftMenu from "@/views/home/menu";
import con from "@/views/home/content";

export default {
  name: "home",
  components: {leftMenu, Top, con}
}
</script>

<style scoped>
#header {
  background-color: pink;
}

#side {
  background-color: gray;
  height: 89%;
  position: absolute;
}

#content {
  background-color: white;
  height: 89%;
  width: 84.97%;
  left: 15%;
  position: absolute;
}
</style>