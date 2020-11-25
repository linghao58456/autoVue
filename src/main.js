import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd, {Icon, message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Axios from "axios";
import Cookie from "vue-cookie"
import Moment from "moment"

Vue.use(Antd)

Vue.config.productionTip = false

// 请求超时时间
Axios.defaults.timeout = 1000

// 默认请求地址
Axios.defaults.baseURL = "http://10.66.9.127:9990/api"

// 请求拦截
Axios.interceptors.request.use(request => {
    return request
}, error => {
    return Promise.reject(error)
})

// 响应拦截
Axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = "请求错误(400)"
                break
            case 403:
                error.message = "拒绝访问(403)"
                break
            case 404:
                error.message = "请求资源未找到(404)"
                break
            case 405:
                error.message = "请求方法错误(405)"
                break
            case 408:
                error.message = "请求超时(408)"
                break
            case 500:
                error.message = "服务器错误(500)"
                break
            case 502:
                error.message = "网络错误(502)"
                break
            case 503:
                error.message = "服务不可用(503)"
                break
            case 504:
                error.message = "网络超时(504)"
                break
            default:
                error.message = `连接出错${error.response.status}`
        }
    } else {
        error.message = "连接服务器失败"
    }
    message.error(error.message)
    return Promise.reject(error)
})

// get请求
Vue.prototype.Get = function (url, param = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, {params: param}).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

// post请求
Vue.prototype.Post = function (url, param = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

// 设置cookie
Vue.prototype.setCookie = function (name, value) {
    Cookie.set(name, value)
}

// 获取cookie
Vue.prototype.getCookie = function (name) {
    return Cookie.get(name)
}

// 删除cookie
Vue.prototype.deleteCookie = function (name) {
    Cookie.delete(name)
}

// 时间转换
Vue.prototype.getDate = function (date) {
    return Moment.utc(date).format("YYYY-MM-DD HH:ss:mm")
}

// 自定义icon
Vue.component("myIcon", Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1966076_g622hcbqokl.js',
}))

// message提示框全局
message.config({
    top: `100px`,
    duration: 1.5,
    maxCount: 3
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    to.path !== '/' && to.path !== '/register' && to.path !== '/forget' ?
        Cookie.get('username') === null ? next('/') : next() : next()
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
