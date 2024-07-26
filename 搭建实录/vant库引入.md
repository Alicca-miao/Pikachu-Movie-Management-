npm i vant
想给asset，vue-router啥的不同的icon，然后下载了个奇奇怪怪的
Material Icon Theme 拓展

**1. main.ts 里引入**

*import { Button, NavBar, Icon, Sticky, Tabs, Tab, Loading } from  "vant";
// 2. 引入组件样式(一定要引入在自己的样式之前，以方便我们自己的样式去覆盖它)
import  "vant/lib/index.css";*


const  app = createApp(App)

*// 3. 注册你需要的组件
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Sticky);
app.use(Tabs);
app.use(Tab);
app.use(Loading);
app.mount('#app')*

2.  熟练 vant里的<van-sticky>和<van-nav-bar>
 [NavBar 导航栏 - Vant 4 (vant-ui.github.io)](https://vant-ui.github.io/vant/#/zh-CN/nav-bar#you-ce-an-niu)
 布局思路：通过template#left覆盖左侧 ，点击左侧可切换到上一级
 通过template#right 覆盖右侧

3 熟练vant里的tab
[Tab 标签页 - Vant 4 (vant-ui.github.io)](https://vant-ui.github.io/vant/#/zh-CN/tab#dian-ji-shi-jian)
有个点击事件  @click-tab="onClickTab"  放在大的标签里
小的标签里输入的tab具体内容  以及个数会自动生成index
在onclicktab上有两个属性，可以解构出来
*

    let  onClickTab=({name,title})=>{
    console.log(name)
    showToast(title)
    }

这里name就是tab里的index个数
title就是tab里写的内容
作者根据tab的内容跳转router
if(name==0)
this.$router.push('"/film/nowPlaying"')
else
this.$router.push("/film/comingSoon")
*
<FilmItem  v-for="film in films"  :key="film.filmId"  :item="film"></FilmItem>

### loading部分
<van-loading type="spinner">

仍然用 v-if 和v-else的结构
[Loading 加载 - Vant 4 (vant-ui.github.io)](https://vant-ui.github.io/vant/#/zh-CN/loading)

<div>
   没有获取到数据时显示loading
   <van-loading
      v-if="!films"
      size="24px"
   >加载</van-loading>
   >
   否则显示数据
   <ul v-else>
     这里item是通过props进行传参
     <FilmItem
         v-for="film in films"
         :key="film.filmId"
         :item="film"
   ></FilmItem>
</ul>
</div>

根据上述，初步可以写出FilmItem组件结构：
根据:item="film"所以该组件里一定有props里的item

    <p>{{item.id}}</p>
    <div>{{item.description}}</div>
    name:"FilmItem"
    props:{
     item:{
       type:Object,
        required:true
     }
    }
    






 

    

 
