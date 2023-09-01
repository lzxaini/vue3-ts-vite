/*
 * @Author: lizhixiang 1245634367@qq.com
 * @Date: 2023-09-01 09:45:30
 * @LastEditors: lizhixiang 1245634367@qq.com
 * @LastEditTime: 2023-09-01 09:58:18
 * @FilePath: \largeScreen\src\router\index.ts
 * @Description: Fuck Bug
 * 微信：My-World-40
 */
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/home/index.vue'),
  meta: {title: '首页'}
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
