import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import demoModule from "./modules/demoModule";

// 创建一个新的 store 实例
const store = createStore({
   /* 状态（一手数据） */
   state() {
      return {
         count: 0,
         user: null,
         token: null,
      };
   },

   /* 二手数据：从一手数据换算而来 */
   // store.getters.isAdmin
   getters: {
      isAdmin(state){
         return state.user && state.user.admin
      }
   },

   /* 操作器 */
   actions: {
      add(context, n) {
         context.commit("increment", n);
      },

      saveUserInfo({ commit }, {user, token}) {
         commit("setUser", user);
         commit("setToken", token);
      },
   },

   /* 修改器 */
   mutations: {
      setCount(state, n) {
         state.count += n;
      },
      setUser(state, user) {
         state.user = user;
      },
      setToken(state, token) {
         state.token = token;
      },
   },

   /* 子模块 */
   modules: {
      demoModule: demoModule,
   },

   /* 插件 */
   plugins: [
      // 配置持久化插件（把数据存在localStorage）
      createPersistedState(),
   ],
});

export default store;
