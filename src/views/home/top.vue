*@Author: hao.ling
*@Date: 2020/11/19 15:59
*@Annotation: 导航栏

<template>
  <a-dropdown :trigger="['click']" id="drop" placement="bottomCenter">
    <a @click="e=>e.preventDefault()">
      <my-icon type="icon-user" class="icon"/>
      {{ username }}
      <my-icon type="icon-down" class="icon"/>
    </a>
    <a-menu slot="overlay" id="menu">
      <a-menu-item>
        <a @click="editChangePwd">
          <my-icon type="icon-xiugaimima"/>
          修改密码</a>
      </a-menu-item>
      <a-menu-item>
        <a @click="logout">
          <my-icon type="icon-logout"/>
          退出登录</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      username: ""
    }
  },
  created() {
    this.username = this.getCookie("username")
  },
  methods: {
    // 修改密码
    editChangePwd() {
      this.$router.push({name: "changePwd"})
    },
    // 退出登录
    logout() {
      this.$router.push({name: "login"})
      this.$message.success("退出成功", 1, () => {
        this.deleteCookie("username")
      })
    }
  }
}
</script>

<style scoped>
#drop {
  color: white;
  float: right;
  margin-right: 50px;
}

#menu {
  margin-top: -20px;
}
</style>