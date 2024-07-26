import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
// routes 是用于定义应用中所有路由的数组
// 将 publicRoutes 数组中的所有路由配置展开，并传递给 routes 属性。
const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [...publicRoutes],
});

// 挂载公共路由 全局路由守卫判断权限 动态挂载权限路由表
router.beforeEach((to, from, next) => {
   console.log("beforeEach",store.state.user);

   // 如果发现是管理员，就动态挂载管理员路由
   if (store.state.user && store.state.user.admin) {
      // 如果权限路由表未挂载就挂载之
      adminRoutes.forEach(r => {
         // 未挂载就挂载
         if (!router.hasRoute(r)) {
            router.addRoute(r);
            console.log(`挂载${r}完毕`);
         } else {
            console.log(`${r}已挂载`);
         }
      });
   }

   // 放行
   console.log("放行", to);
   next();
});
export default router;