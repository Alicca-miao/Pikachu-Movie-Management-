import store from "@store/index";

export default {
   name: "admin",

   /* 同时作用于mounted + updated */
   // handler: (el, binding, vnode) => {
   //    console.log("admin handler");

   //    // 看看当前用户是否管理员
   //    if (!store.getters.isAdmin) {
   //       // 不是就el删除
   //       el.remove();
   //    }
   // },

   /* 元素挂载时 */
   mounted(el, binding, vnode) {
      console.log("admin mounted");

      // 看看当前用户是否管理员
      if (!store.getters.isAdmin) {
         // 不是就el删除
         el.remove();
      }
   },
   
};
