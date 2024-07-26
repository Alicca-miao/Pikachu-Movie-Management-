import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

export default [
    {
        path: "/",
        redirect:"/login"
        // 当用户访问/时候自动跳转到darta
    },
    
    // //数据看板
    {
        path: "/data",
        name: "data",
        meta:{menuIndex: "0"},
        component: ()=>import("@/views/DashBoard.vue")


    },
    //正在热

    {
        path:"/film/playing",
        name:"playing",
        meta:{menuIndex:"1-0"},
        component:()=>import("@/views/film/Playing.vue")
 
    },
    //即将上映

    {
        path:"/film/coming",
        name: "coming",
        meta:{menuIndex:"1-1"},
        component:()=>import("@/views/film/Coming.vue")

    },

    //用户管理
    {
        path:"/user",
        name:"user",
        meta: {menuIndex:"3"},
        component:()=>import("@/views/UserList.vue")
    },

    {
    //   path: "/film/:id([a-z\\d]{24})",
    path:"/film/:id",
    //   :id 是参数名，通常在路由处理函数中可以通过 this.$route.params.id 获取到。
      name: "detail",
      component: () => import("@/views/film/Detail.vue"),
   },

   
   {
      path: "/film/add",
      name: "filmadd",
      component: () => import("@/views/film/DetailAdd.vue"),
   },
   {
      path: "/login",
      name: "login",
      meta: { hidePageHeader: true },
      component: () => import("@/views/Login.vue"),
   },
   /* 404 */
   {
      path: "/:pm(.*)*",
    //   允许捕获任意数量的路径段，并将其作为一个数组传递给路由参数 pm
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
   },

    

]