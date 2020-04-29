import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from './router';

import index from '../views/index/index.vue'; //首页

// 加载路由
Vue.use(VueRouter);

const routes = [
	{
		path: '/index', //首页
		component: index
	},
	{
		path: '/', // 重定向
		redirect: '/index'
	},
	...Router.routes
];

var router = new VueRouter({
	mode: 'history', //去掉url中的#
	routes
});

/**
 * router拦截
 * nextRoute 路由权限
 *
 *  */

router.beforeEach((to, from, next) => {
	//  let user = JSON.parse(storage.getStorage('user'))
	//  !user&& to.path != '/login'?next({ path: '/login' }):next()
	next();
});

export default router;
