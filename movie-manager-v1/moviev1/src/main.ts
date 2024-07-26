import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import './assets/main.scss'
import axios from 'axios';
import change from "@/directives/change";
// import admin from "@/directives/admin";
import router from './router'
import store from './store'

// 
import { createApp } from 'vue'
import "@/mockjs/index";
import App from './App.vue'


// // 监听 First Contentful Paint (FCP)
// if ('PerformanceObserver' in window) {
//   const observer = new PerformanceObserver((list) => {
//     for (const entry of list.getEntriesByName('first-contentful-paint')) {
//       console.log('First Contentful Paint:', entry.startTime);
//       // 在这里可以将 FCP 时间发送到服务器或进行其他处理
//     }
//   });

//   observer.observe({ type: 'paint', buffered: true });
// }
const app = createApp(App)

// app.component('MyPageHeader', MyPageHeader);
// app.component('EpMenu', EpMenu);
app.directive(change.name,change)
// app.directive(admin.name,admin)
app.use(router)
app.use(store)
// axios.get("/data/list").then(res => {
//     console.log(res);
//   }).catch(error => {
//     console.log(error);
//   })



app.use(ElementPlus);
app.mount('#app')