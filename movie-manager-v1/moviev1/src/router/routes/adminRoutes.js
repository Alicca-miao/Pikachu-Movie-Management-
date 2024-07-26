export default [
   /* 热门城市 */
   {
      path: "/cinema/hot",
      name: "hot",
      // 当前路由的访问需要管理员权限
      meta: { menuIndex: "2-0-0", adminRequired: true },
      component: () => import("@/views/cinema/HotCity.vue"),
   },

   /* 所有城市 */
   {
      path: "/cinema/all",
      name: "allcity",
      // 当前路由的访问需要管理员权限
      meta: { menuIndex: "2-1", adminRequired: true },
      component: () => import("@/views/cinema/AllCity.vue"),
   },
];
