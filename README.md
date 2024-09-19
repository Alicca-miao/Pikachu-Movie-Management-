Pikachu-Movie-Management-
皮卡丘电影管理B端系统 

功能：创建与维护系统用户、管理用户权限、发布影片与影院信息、创建运营活动、跟踪用户订单、提供售后服务等

前端技术栈：
Vue3 + TypeScript + Vue-Router + Vuex + Axios
E-charts+UI component library+ElementPlus

后端技术栈：
Node.js+Express+Multer

负责模块：用户管理、数据看板、在映影片管理、预告管理。

搭建流程：
1. 静态组件搭建，数据交互设置，路由和状态管理；
2. mockjs测试数据，封装常用表格及头部组件，封装常用自定义指令，进行逻辑复用；
3. 权限管理设置，接口测试和动态数据可视化，最后前端部署到nginx上。

创建master+dev+test分支，后续在dev分支上合并test分支，在test分支上测试, 在master分支上合并test分支打包。
<img width="970" alt="nginx部署上线" src="https://github.com/user-attachments/assets/e9ba563b-2c38-49d2-a6d4-b263ac60539b">
<img width="676" alt="打包上线" src="https://github.com/user-attachments/assets/23602bb5-bb11-4f96-8705-afcfb790c23a">


遇到问题：
<img width="407" alt="出错的" src="https://github.com/user-attachments/assets/5e66f871-e607-43e4-be41-d1677a35d782">
原因：动态参数与另一接口冲突


项目总览：
1. 登录部分

https://github.com/user-attachments/assets/52b24e1f-e72c-4a1d-a182-4f755f253d82


<img width="1202" alt="加载中" src="https://github.com/user-attachments/assets/8b6543b2-bf2e-42b5-848f-0efe21b78132">


2.数据展板部分

https://github.com/user-attachments/assets/5c252708-a401-495d-88fc-1f7ae0d98a31


3. 文件上传部分


https://github.com/user-attachments/assets/49cc6355-086a-494c-83e6-c8fce5f41801

4. 用户列表部分
   <img width="1202" alt="用户列表" src="https://github.com/user-attachments/assets/40a99e1f-ef8d-4c96-ad1f-f031db5c9150">

5. 正在热映部分
   

https://github.com/user-attachments/assets/8d9e56dc-92a7-4b40-9519-36e98bca5988

6. mock数据部分
<img width="992" alt="mock数据" src="https://github.com/user-attachments/assets/1b3d82f6-2fda-41f2-bc55-9d3222f1c977">
7. 即将上映模块

https://github.com/user-attachments/assets/aafbfd7a-87b9-47b3-8325-70cb99952a43















