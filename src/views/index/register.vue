*@Author: hao.ling
*@Date: 2020/11/19 14:24
*@Annotation: 注册页面

<template>
  <div id="register">
    <h1 align="center">注册</h1>
    <a-form :form="registerForm" @submit="register" :labelCol="{span:7}">
      <a-form-item label="用户名" class="register-form-item" style="margin-bottom: 5px">
        <a-input class="input" placeholder="请输入用户名" size="small"
                 v-decorator="['username',{rules:[{required:true,message:'请输入用户名'}]}]">
          <my-icon slot="prefix" type="icon-user" class="icon"/>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" class="register-form-item" style="margin-bottom: 5px">
        <a-input-password class="input" placeholder="请输入密码" size="small"
                          v-decorator="['password',{rules:[{required:true,message:'请输入密码'},{validator:setPassword}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-form-item label="确认密码" class="register-form-item" style="margin-bottom: 5px">
        <a-input-password class="input" size="small" placeholder="请确认密码"
                          v-decorator="['confirmPwd',{rules:[{required:true,message:'请确认密码'},{validator:confirmPwd}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-form-item label="验证码" class="code-form-item" style="margin-bottom: 5px">
        <a-input size="small" placeholder="验证码" style="width: 100px;z-index: 50"
                 v-decorator="['code',{rules:[{required:true,message:'请输入验证码'},{validator:confirmCode}]}]">
          <my-icon slot="prefix" type="icon-yanzhengma" class="icon"/>
        </a-input>
        <div @click="refreshCode" style="margin-left: 210px;margin-top: -40px;width: 120px">
          <verification-code :identifyCode="identifyCode" style="cursor: pointer"/>
        </div>
      </a-form-item>
      <a-button type="primary" class="btn" style="margin-left: 120px" :disabled="disable">
        <router-link :to="{name:'login'}">登录</router-link>
      </a-button>
      <a-button type="primary" class="btn" @click="register" :disabled="disable">注册</a-button>
    </a-form>
  </div>
</template>

<script>
import VerificationCode from "@/views/index/verificationCode";

export default {
  name: "register",
  components: {VerificationCode},
  data() {
    return {
      registerForm: this.$form.createForm(this, {name: "register_form"}),
      password: "",
      identifyCode: "",
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
      disable: false
    }
  },
  mounted() {
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 注册
    register(e) {
      e.preventDefault()
      this.registerForm.validateFields((err, values) => {
        if (!err) {
          this.Post("/register", {username: values['username'], password: values['password']}).then(res => {
            res['code'] === 1000 ? this.$message.success(res["message"], 1, () => {
              this.$router.push({name: "login"})
            }) : this.$message.error(res['message'])
          })
        }
      })
    },
    // 获取密码
    setPassword(rules, value, callback) {
      this.password = value
      callback()
    },
    // 校验两次密码
    confirmPwd(rules, value, callback) {
      value && this.password !== value ? callback("两次密码不一致") : callback()
    },
    // 校验图形验证码
    confirmCode(rules, value, callback) {
      value && this.identifyCode !== value ? callback("验证码错误") : callback()
    },
    // 刷新图形验证码
    refreshCode() {
      this.identifyCode = ""
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成随机数
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成随机图形验证码
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    }
  }
}
</script>

<style scoped>
#register {
  margin-top: 120px;
  margin-left: 450px;
  padding-top: 20px;
  height: 350px;
  width: 420px;
  background-color: white;
  border-radius: 20px;
}

.input {
  width: 200px;
}

.icon {
  margin-left: -2px;
  font-size: 16px;
}

.btn {
  margin-top: 10px;
  margin-right: 30px;
}
</style>
<style>
.register-form-item .ant-form-explain {
  margin-bottom: -20px;
  margin-left: 125px;
}

.code-form-item .ant-form-explain {
  margin-left: 125px;
  margin-top: -30px;
  z-index: 50;
}
</style>