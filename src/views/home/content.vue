*@Author: hao.ling
*@Date: 2020/11/19 15:54
*@Annotation: 内容主体显示

<template>
  <div id="content">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "con"
}
</script>

<style scoped>
#content {
  margin-left: -150px;
}
</style>