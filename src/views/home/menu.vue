*@Author: hao.ling
*@Date: 2020/11/19 16:09
*@Annotation: 菜单栏

<template>
  <div id="index-menu">
    <a-menu mode="inline" :open-keys="openKeys" @openChange="openChange">
      <a-sub-menu v-for="menu in menu_list" :key="menu.key">
        <span slot="title"><my-icon :type="menu.icon"/><span>{{ menu.name }}</span></span>
        <a-menu-item v-for="item in menu.menu_item" :key="item.key">
          <my-icon :type="item.icon"/>
          <span @click="goto(item.path)">{{ item.name }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-for="list in subMenu_list" :key="list.key">
        <my-icon :type="list.icon"/>
        <span @click="goto(list.path)">{{ list.name }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "menuList",
  data() {
    return {
      openKeys: [],
      rootSubmenuKeys: [],
      menu_list: [
        {
          key: "sub1", icon: "icon-peizhi", name: "配置中心", menu_item: [{
            key: "/system/list", icon: "icon-xitongpeizhi", name: "系统配置",
            path: {name: "systemList"}
          }, {
            key: "/databaseConfig/list", icon: "icon-data", name: "数据库配置",
            path: {name: "databaseConfigList"}
          }, {
            key: "/environmentConfig/list", icon: "icon-shujutansuohuanjingpeizhi", name: "环境配置",
            path: {name: "environmentConfigList"}
          }]
        }, {
          key: "sub2", name: "测试用例", icon: "icon-test-case-group", menu_item: [{
            key: "/functionalCase/list", icon: "icon-mokuai", name: "功能测试用例",
            path: {name: "functionalCaseList"}
          }, {
            key: "/interfaceCase/list", icon: "icon-jiekou1", name: "接口测试用例",
            path: {name: "interfaceCaseList"}
          }, {
            key: "/automatedCase/list", icon: "icon-xiaoshouzidonghua",
            name: "自动化测试用例", path: {name: "automatedCaseList"}
          }]
        }, {
          key: "sub3", name: "自动化测试", icon: "icon-xinicon_huabanfuben", menu_item: [{
            key: "/UIAutomation/list", icon: "icon-uicn", name: "UI自动化测试",
            path: {name: "uiAutomationList"}
          }, {
            key: "/interfaceAutomation/list", icon: "icon-jiekou", name: "接口自动化测试",
            path: {name: "interfaceAutomationList"}
          }]
        }, {
          key: "sub4", name: "覆盖率", icon: "icon-tongji", menu_item: [{
            key: "/functionalCoverage/list", icon: "icon-tongji1", name: "UI自动化覆盖率",
            path: {name: "functionalCoverageList"}
          }, {
            key: "/interfaceCoverage/list", icon: "icon-tongji2", name: "接口自动化覆盖率",
            path: {name: "interfaceCoverageList"}
          }]
        }, {
          key: "sub5", name: "测试报告", icon: "icon-REPORT", menu_item: [{
            key: "/functionalReport/list", icon: "icon-report", name: "UI测试报告",
            path: {name: "functionalReportList"}
          }, {
            key: "/interfaceReport/list", icon: "icon-Report", name: "接口测试报告",
            path: {name: "interfaceReportList"}
          }]
        }
      ],
      subMenu_list: [{
        key: "/mobile/platform", icon: "icon-mobile", name: "手机测试平台", path: {name: "mobilePlatform"}
      }, {
        key: "/mockData/platform", icon: "icon-data", name: "mock数据平台", path: {name: "mockPlatform"}
      }]
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    // 展开当前菜单
    openChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      this.rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? this.openKeys = openKeys : this.openKeys = latestOpenKey ? [latestOpenKey] : []
    },
    // 获取subKey
    getMenuList() {
      this.rootSubmenuKeys = []
      this.menu_list.map((item) => {
        this.rootSubmenuKeys.push(item['key'])
      })
    },
    // 菜单跳转
    goto(value) {
      this.$router.push(value)
    },
  }
}
</script>

<style scoped>

</style>