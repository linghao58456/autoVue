*@Author: hao.ling
*@Date: 2020/11/20 14:21
*@Annotation: 新增系统配置

<template>
  <div id="system_add">
    <a-breadcrumb separator=">" style="margin-top: 10px;margin-left: 30px">
      <a-breadcrumb-item>
        <router-link :to="{name:'systemList'}">系统列表</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>新增系统</a-breadcrumb-item>
    </a-breadcrumb>
    <a-form :form="addForm" @submit="commit" id="add_form" :label-col="{span:10}">
      <a-form-item label="系统名称" class="add_form_item" style="margin-bottom: 5px">
        <a-input placeholder="请输入系统名称" class="input" size="small"
                 v-decorator="['systemName',{rules:[{required:true,message:'请输入系统名称'}]}]"/>
      </a-form-item>
      <a-form-item label="系统地址" class="add_form_item" style="margin-bottom: 5px">
        <a-input placeholder="请输入系统地址" class="input" size="small"
                 v-decorator="['systemPath',{rules:[{required:true,message:'请输入系统地址'}]}]"/>
      </a-form-item>
      <a-button type="primary" id="back_btn">
        <router-link :to="{name:'systemList'}">返回</router-link>
      </a-button>
      <a-button type="primary" id="add_btn" @click="commit">提交</a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "systemAdd",
  data() {
    return {
      addForm: this.$form.createForm(this, {name: "add_form"})
    }
  },
  methods: {
    // 提交
    commit(e) {
      e.preventDefault()
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.Post("/system/add", {
            "systemName": values['systemName'], "systemPath": values['systemPath'], "userId": this.getCookie("userId")
          }).then(res => {
            res['code'] === 1000 ? this.$message.success(res['message'], 1, () => {
              this.addForm.resetFields()
            }) : this.$message.error(res['message'])
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#add_form {
  margin-top: 50px;
}

.input {
  width: 250px;
}

#back_btn {
  margin-top: 30px;
  margin-left: 350px;
  margin-right: 80px;
}
</style>
<style>
.add_form_item .ant-form-explain {
  margin-bottom: -20px;
  margin-left: 390px;
}
</style>