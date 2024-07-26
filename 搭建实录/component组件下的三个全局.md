
- btngroup组件
justify-content：flex-end对齐 弹性项目到末端

一个问题 这个class写的是card但是不是elementplus里card用法
[Card 卡片 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/card.html)

（1）@click="emit(`groupBtnClick`,btn.callback)"

这里btn.callback 是从groupbtns中获得的 
groupbtns是个数组

就是说 当按钮被点击时候 这个groupBtnClick会被触发 并且传递 btn.callback参数给父组件

（2）`:type="btn.type"` 

`type` 属性也是从 `groupBtns` 数组中的每个 `btn` 对象获得的。这个属性通常用于定义按钮的样式类型，如 `primary`, `danger` 等


（3）<slot :name="btn.slotName">

<!-- 这里代表是slotname里的default，loading还是icon？自定义默认内容，加载中组件 -->

<!-- 这里显示的是父组件那个传入的参数？ -->

<el-icon><Menu  /></el-icon>

</slot>
对应这个slot，父组件里应该是
<mycomponent>
   <template v-slot:slotfor1>
      <span> content for1</span>
   </template>
   <template v-slot:slotfor2>
      <span> content for2</span>
   </template>
   </mycomponent>
   这样对应的slotname 分别为slotname1和slotname2的button里的内容就是 span里的for 1和for2的内容


- 关于 defineexpose的使用
`myComponentRef` 的初始值为 `null` 是为了在组件挂载前避免访问未定义的引用，这是 Vue 3 中常见的模式。当组件挂载后，`myComponentRef` 会自动指向子组件实例。

举例：
defineExpose能够使得父组件可以访问私有的组件状态和方法

const cnt = ref(0)
function increment(){
	cnt.value++
}

defineExpose({
	cnt,
	increment
})

在父组件里可以这么用(上述组件为mycomponent)：
通过ref访问这些属性和方法
<Mycomponent ref="myComponentRef"/>

<button @click= "incrementcount">Increment cnt</button>
<p> {{myComponentRef?.cnt}}</p>

import Mycomponent from './Mycomponent.vue'

const myComponentRef = ref(null)

function incrementcount(){
	if(myComponentRef.value){
	myComponentRef.value.increment()
	}
}

**需要外部提供的：groupBtns（包含callback，type， name）和emit父组件groupBtnClick**


dialog部分
[Dialog 对话框 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/dialog.html#dialog-%E5%AF%B9%E8%AF%9D%E6%A1%86)
v-model后提供一个布尔值
diaglog分为两个部分 包括body和footer footer需要具名为footer的slot
<el-dialog
    v-model="dialogVisible"
    title="操作确认"
>

基础用法
1 去除点击按钮后再弹出对话框
2 点击对话框×按钮后不会弹出handleclose
3 显示的信息根据dialogmode.msg动态来
4 点击确认后 执行的是dialogmode.callback

表格部分
default-sort  默认的排序列的  prop  和顺序。它的  prop  属性指定默认的排序的列，order  指定默认排序的顺序
objectif  prop  is  set,  and  order  is  not  set,  then  order  is  default  to  ascending
[Table 表格 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/table.html#table-%E8%A1%A8%E6%A0%BC)
[Table 表格 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/table.html#table-%E8%A1%A8%E6%A0%BC) 【1】
```
<el-table-column type="selection" width="55" />
``` 
这一句由来【1】

所以通过hasslot确定 #default后面的row那一行数据是prop为action的cols那一行数据
然后 同样确定的是slot ：name为action且row为这一行数据，将其传给父组件 得到click出的那行数据是cols里prop为action的一行


首先在表头里设置 **label** 代表表头header里内容， 数据来源:data  :default-sort 数据排序不
@selection应该是因为后续的column里有type=selection所以出现

总的问题：对于 el-table和el-button这种是不是真的不能用v-for？

**npm install -D sass**

头部组件
一个大class epHeader 显示前提条件是看 meta里的hideFrame（布尔值？）
左边：左侧设置一个图标 点击导致 $router.back()
中间标题
右边
{
 - avatar头像
 -  span里包含“欢迎”和用户名
 -  div 里的action按钮区域 点击时通知父组件（actionBtnClic 传递的是当前的时间戳参数）
中间夹着插槽里有 默认关闭的图标

}











