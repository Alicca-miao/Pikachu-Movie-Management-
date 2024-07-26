import axios from "axios";
// import store from "@store/index";
// import router from "@router/index";

const instance = axios.create({
   //localhost:5173/api
   baseURL: "/api",
   timeout: 3000,
});

// /* 请求拦截器：统一添加鉴权token */
// instance.interceptors.request.use(
//    function (config) {
//       // 在发送请求之前做些什么
//       config.headers["Authorization"] = `Bearer ${store.state.token}`;
//       return config;
//    },

//    function (error) {
//       // 对请求错误做些什么
//       return Promise.reject(error);
//    }
// );

// /* 响应拦截器：从响应中过滤出服务器返回的数据 */
// instance.interceptors.response.use(
//    function (res) {
//       if(res.data.code===401 || res.data.code===403){
//         router.push("/login")
//       }
//       return res.data;
//    },

//    function (error) {
//       // 对请求错误做些什么
//       return Promise.reject(error);
//    }
// );

 export default instance;
