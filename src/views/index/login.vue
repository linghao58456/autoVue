*@Author: hao.ling
*@Date: 2020/11/10 10:43
*@Annotation: 登录页面

<template>
  <div id="login">
    <h1 align="center">Welcome</h1>
    <a-form :form="loginForm" @submit="login" :labelCol="{span:7}">
      <a-form-item label="用户名" class="login-form-item" style="margin-bottom: 5px">
        <a-input class="input" size="small" placeholder="请输入用户名"
                 v-decorator="['username',{rules:[{required:true,message:'请输入用户名'}]}]">
          <my-icon slot="prefix" type="icon-user" class="icon"/>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" class="login-form-item" style="margin-bottom: -10px">
        <a-input-password class="input" size="small" placeholder="请输入密码" @keyup.native.enter="login"
                          v-decorator="['password',{rules:[{required:true,message:'请输入密码'}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-button id="forget_btn" type="link">
        <router-link :to="{name: 'forget'}">忘记密码?</router-link>
      </a-button>
      <a-button id="register_btn" type="primary">
        <router-link :to="{name:'register'}">注册</router-link>
      </a-button>
      <a-button id="login_btn" type="primary" @click="login">登录</a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: this.$form.createForm(this, {name: "login_form"})
    }
  },
  methods: {
    // 登录
    login(e) {
      e.preventDefault()
      this.loginForm.validateFields((err, values) => {
        if (!err) {
          this.Post("/login", {"username": values['username'], "password": values['password']}).then(res => {
            res['code'] === 1000 ? this.$message.success(res['message'], 1, () => {
              this.setCookie("userId", res['data']['user_id'])
              this.setCookie("username", res['data']['username'])
              this.$router.push({name: "home"})
            }) : this.$message.error(res['message'])
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#login {
  background-color: white;
  width: 400px;
  height: 240px;
  border-radius: 25px;
  margin-left: 450px;
  margin-top: 120px;
}

.input {
  width: 200px;
}

#forget_btn {
  margin-left: 120px;
  z-index: 100;
}

#register_btn {
  margin-top: 10px;
  margin-left: 110px;
  margin-right: 50px;
}

.icon {
  margin-left: -2px;
  font-size: 16px;
}
</style>
<style>
.login-form-item .ant-form-explain {
  margin-bottom: -20px;
  margin-left: 120px;
}
</style>