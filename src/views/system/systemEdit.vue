*@Author: hao.ling
*@Date: 2020/11/25 10:24
*@Annotation: 系统查看/编辑

<template>
  <div id="edit_view">
    <a-breadcrumb separator=">" style="margin-top: 10px;margin-left: 30px">
      <a-breadcrumb-item>
        <router-link :to="{name:'systemList'}">系统列表</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="value===true">查看系统</a-breadcrumb-item>
      <a-breadcrumb-item v-else-if="value===false">编辑系统</a-breadcrumb-item>
    </a-breadcrumb>
    <a-form :form="editForm" @submit="commit" id="add_form" :label-col="{span:10}">
      <a-form-item label="系统名称" class="add_form_item" style="margin-bottom: 5px">
        <a-input placeholder="请输入系统名称" class="input" size="small" :disabled="value"
                 v-decorator="['systemName',{rules:[{required:true,message:'请输入系统名称'}],initialValue:system_name}]"/>
      </a-form-item>
      <a-form-item label="系统地址" class="add_form_item" style="margin-bottom: 5px">
        <a-input placeholder="请输入系统地址" class="input" size="small" :disabled="value"
                 v-decorator="['systemPath',{rules:[{required:true,message:'请输入系统地址'}],initialValue:system_path}]"/>
      </a-form-item>
      <a-button type="primary" id="back_btn">
        <router-link :to="{name:'systemList'}">返回</router-link>
      </a-button>
      <a-button type="primary" id="add_btn" @click="commit" v-if="value===false">提交</a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "systemEdit",
  data() {
    return {
      editForm: this.$form.createForm(this, {name: "edit_form"}),
      value: "", name: "", system_name: "", system_path: "", system_id: ""
    }
  },
  created() {
    this.value = this.$route.params['value']
    this.name = this.$route.query['name']
    this.getDetail()
  },
  methods: {
    // 提交
    commit(e) {
      e.preventDefault()
      this.editForm.validateFields((err, values) => {
        if (!err) {
          this.Post("/system/update", {
            "systemName": values['systemName'], "systemPath": values['systemPath'],
            "modifyId": this.getCookie("userId"), "systemId": this.system_id
          }).then(res => {
            res["code"] === 1000 ? this.$message.success(res['message'], 1, () => {
              this.$router.push({name: "systemList"})
            }) : this.$message.error(res['message'])
          })
        }
      })
    },
    // 获取详情
    getDetail() {
      this.Get("/system/detail", {"systemName": this.name}).then(res => {
        res['code'] === 1000 ? res['data'].map((item) => {
          this.system_name = item['system_name']
          this.system_path = item['system_path']
          this.system_id = item['id']
        }) : this.$message.error(res['message'])
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