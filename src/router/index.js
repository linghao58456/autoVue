import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/components/index";
import login from "@/views/index/login";
import register from "@/views/index/register";
import forget from "@/views/index/forget";
import reset from "@/views/index/reset";
import home from "@/components/home"
import changePwd from "@/views/home/change"
import systemList from "@/views/system/systemList";
import systemAdd from "@/views/system/systemAdd";
import systemEdit from "@/views/system/systemEdit";

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: index,
    children: [{
        path: "/",
        name: "login",
        component: login
    }, {
        path: "/register",
        name: "register",
        component: register
    }, {
        path: "/forget",
        name: "forget",
        component: forget
    }, {
        path: "/reset",
        name: "reset",
        component: reset
    }]
}, {
    path: "/home",
    name: "home",
    component: home,
    children: [{
        path: "/changePwd",
        name: "changePwd",
        component: changePwd
    }, {
        path: "/system/list",
        name: "systemList",
        component: systemList
    }, {
        path: "/system/add",
        name: "systemAdd",
        component: systemAdd
    }, {
        path: "/system/edit",
        name: "systemEdit",
        component: systemEdit
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
