*@Author: hao.ling
*@Date: 2020/11/19 15:23
*@Annotation: 忘记密码

<template>
  <div id="forget">
    <h1 align="center">重置密码</h1>
    <a-form :form="forget_form" :label-col="{span:7}" @submit="forget">
      <a-form-item label="用户名" class="check-form-item">
        <a-input placeholder="请输入用户名" size="small" class="input"
                 v-decorator="['username',{rules:[{required:true,message:'请输入用户名'}]}]">
          <my-icon slot="prefix" type="icon-user" class="icon"/>
        </a-input>
      </a-form-item>
    </a-form>
    <a-button type="primary" class="btn" style="margin-left: 100px">
      <router-link :to="{name:'login'}">返回</router-link>
    </a-button>
    <a-button type="primary" class="btn" @click="forget">下一步</a-button>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      forget_form: this.$form.createForm(this, {name: "forgetForm"})
    }
  },
  methods: {
    // 检查用户
    forget(e) {
      e.preventDefault()
      this.forget_form.validateFields((err, value) => {
        if (!err) {
          this.Get("/searchUser", {username: value['username']}).then(res => {
            res['code'] === 1000 ? this.$router.push({
              name: "reset",
              params: {username: value['username']}
            }) : this.$message.error(res['message'])
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#forget {
  margin-top: 120px;
  margin-left: 450px;
  padding-top: 20px;
  height: 250px;
  width: 400px;
  background-color: white;
  border-radius: 20px;
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
.check-form-item .ant-form-explain {
  margin-left: 120px;
}
</style>