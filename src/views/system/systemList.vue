*@Author: hao.ling
*@Date: 2020/11/20 10:26
*@Annotation: 系统配置列表

<template>
  <div id="system_list">
    <a-layout id="layout">
      <a-layout-header id="header">
        <a-form :form="searchForm" layout="inline" @submit="search">
          <a-form-item label="系统名称">
            <a-input class="input" size="small" v-decorator="['system_name',{rules:[{}]}]"/>
          </a-form-item>
          <my-icon type="icon-add" id="add_btn" class="btn" @click="add"/>
          <my-icon type="icon-zhongzhi" id="reset_btn" class="btn" @click="reset"/>
          <my-icon type="icon-search" id="search_btn" class="btn" @click="search"/>
        </a-form>
      </a-layout-header>
      <a-layout-content>
        <a-table :data-source="system_list" :columns="column" bordered :pagination="false">
          <span slot="action" slot-scope="text,record">
            <my-icon type="icon-edit" class="icon" style="color: green" @click="edit(record.system_name,false)"/>
            <a-divider type="vertical"/>
            <my-icon type="icon-view" class="icon" style="color: deeppink" @click="view(record.system_name,true)"/>
            <a-divider type="vertical"/>
            <a-popconfirm title="是否删除" ok-text="确认" cancel-text="取消" @confirm="del(record.system_name,1)">
              <my-icon type="icon-delete1" class="icon" style="color: red"/>
            </a-popconfirm>
          </span>
        </a-table>
        <a-pagination id="page" :default-current="6" size="small" :total="total" :pageSize="pageSize"
                      :show-total="() => `共${total}条`"/>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
const column = [
  {dataIndex: "id", kye: "id", title: "Id"},
  {dataIndex: "system_name", kye: "system_name", title: "系统名称"},
  {dataIndex: "system_path", kye: "system_path", title: "系统地址"},
  {dataIndex: "user", kye: "user", title: "创建者"},
  {dataIndex: "createTime", kye: "createTime", title: "创建时间"},
  {dataIndex: "modifyTime", kye: "modifyTime", title: "修改时间"},
  {
    key: "action", title: "操作", scopedSlots: {customRender: 'action'}
  }
]

export default {
  name: "list",
  data() {
    return {
      searchForm: this.$form.createForm(this, {name: "search_form"}),
      system_list: [], column,
      currentPage: 1, pageSize: 10, total: 10
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询
    search(e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          let system_name
          this.system_list = []
          values['system_name'] === "undefined" ? system_name = "" : system_name = values['system_name']
          this.Get("/system/list", {
            "systemName": system_name, "currentPage": this.currentPage, "pageSize": this.pageSize
          }).then(res => {
            if (res['code'] === 1000) {
              res['data'].map((item) => {
                this.system_list.push({
                  id: item['id'], "system_name": item['system_name'], "system_path": item['system_path'],
                  "user": item['creatorId'], "createTime": item['create_time'],
                  "modifyTime": item['modify_time']
                })
              })
            } else {
              this.$message.error(res['message'])
            }
          })
        }
      })
    },
    // 获取列表
    getList() {
      this.system_list = []
      this.Get("/system/list", {"currentPage": this.currentPage, "pageSize": this.pageSize}).then(res => {
        if (res['code'] === 1000) {
          this.total = res['total']
          res['data'].map((item) => {
            this.system_list.push({
              id: item['id'], "system_name": item['system_name'], "system_path": item['system_path'],
              "user": item['creatorId'], "createTime": item['create_time'],
              "modifyTime": item['modify_time']
            })
          })
        } else {
          this.$message.error(res['message'])
        }
      })
    },
    // 添加
    add() {
      this.$router.push({name: "systemAdd"})
    },
    // 重置清空
    reset() {
      this.searchForm.resetFields()
    },
    // 编辑
    edit(name, value) {
      this.$router.push({name: "systemEdit", query: {"name": name}, params: {"value": value}})
    },
    // 查看
    view(name, value) {
      this.$router.push({name: "systemEdit", query: {"name": name}, params: {"value": value}})
    },
    // 删除
    del(name, value) {
      this.Post("/system/delete", {
        "systemName": name, "status": value,
        "modifyId": this.getCookie("userId")
      }).then(res => {
        res['code'] === 1000 ? this.$message.success(res['message'], 1, () => {
          this.$router.go(0)
        }) : this.$message.error(res['message'])
      })
    }
  }
}
</script>

<style scoped>
#system_list {
  height: 110%;
  width: 115%;
}

#layout {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

#header {
  height: 12%;
  margin-left: -40px;
  margin-top: 10px;
  background-color: #fff;
}

.input {
  width: 120px;
}

.btn {
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
}

#add_btn {
  color: green;
}

#reset_btn {
  color: blue;
  margin-left: 10px;
}

#search_btn {
  color: red;
  margin-left: 10px;
}

.icon {
  cursor: pointer;
  font-size: 20px;
}

#page {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
}
</style>