*@Author: hao.ling
*@Date: 2020/11/20 10:26
*@Annotation: 修改密码

<template>
  <div id="edit-change">
    <h1 align="center">修改密码</h1>
    <a-form :form="edit_form" :label-col="{span:10}" @submit="changePwd">
      <a-form-item label="旧密码" class="edit-form-item" style="margin-bottom: 5px">
        <a-input-password class="input" size="small" placeholder="请输入旧密码"
                          v-decorator="['old_password',{rules:[{required:true,message:'请输入旧密码'}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-form-item label="新密码" class="edit-form-item" style="margin-bottom: 5px">
        <a-input-password class="input" size="small" placeholder="请输入新密码"
                          v-decorator="['new_password',{rules:[{required:true,message:'请输入新密码'},{validator:setPassword}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-form-item label="确认新密码" class="edit-form-item" style="margin-bottom: 5px">
        <a-input-password class="input" size="small" placeholder="请确认新密码"
                          v-decorator="['confirmNewPwd',{rules:[{required:true,message:'请确认新密码'},{validator:confirmPwd}]}]">
          <my-icon slot="prefix" type="icon-password" class="icon"/>
        </a-input-password>
      </a-form-item>
      <a-form-item label="验证码" class="new-code-form-item" style="margin-bottom: 5px">
        <a-input size="small" placeholder="验证码" style="width: 100px;z-index: 50"
                 v-decorator="['code',{rules:[{required:true,message:'请输入验证码'},{validator:confirmCode}]}]">
          <my-icon slot="prefix" type="icon-yanzhengma" class="icon"/>
        </a-input>
        <div @click="refreshCode" style="margin-left: 430px;margin-top: -40px;width: 120px">
          <verification-code :identifyCode="identifyCode" style="cursor: pointer"/>
        </div>
      </a-form-item>
      <a-button type="primary" class="btn" style="margin-left: 320px">
        <router-link :to="{name:'home'}">取消</router-link>
      </a-button>
      <a-button type="primary" class="btn" @click="changePwd">修改密码</a-button>
    </a-form>
  </div>
</template>

<script>
import VerificationCode from "@/views/index/verificationCode";

export default {
  name: "reset",
  components: {VerificationCode},
  data() {
    return {
      edit_form: this.$form.createForm(this, {name: "editForm"}),
      identifyCode: "",
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
    }
  },
  mounted() {
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
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
    },
    // 修改密码
    changePwd(e) {
      e.preventDefault()
      this.edit_form.validateFields((err, value) => {
        if (!err) {
          this.Post("/changePwd", {
            username: this.getCookie("username"),
            oldPwd: value['old_password'], newPwd: value['new_password']
          }).then(res => {
            res['code'] === 1000 ? this.$message.success(res['message'], 1, () => {
              this.$router.push({name: "login"})
              this.deleteCookie("username")
            }) : this.$message.error(res['message'])
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#edit-change {
  margin-top: 50px;
}

.input {
  width: 200px;
}

.btn {
  margin-top: 20px;
  margin-right: 50px;
}
</style>
<style>
.edit-form-item .ant-form-explain {
  margin-bottom: -20px;
  margin-left: 345px;
}

.new-code-form-item .ant-form-explain {
  margin-top: -30px;
  z-index: 50;
  margin-left: 345px;
}
</style>