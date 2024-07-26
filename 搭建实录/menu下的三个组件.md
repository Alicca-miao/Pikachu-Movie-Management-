- icon部分
首先确定<customcomponetn :icon=iconcomponent/> 这里的icon就是props定义的名称
在customcomponetn里  有 vue2写法： props:['icon']
然后是解释render函数 和import {h} from 'vue'

render函数和h函数用于创建和返回虚拟dom节点  

render允许你完全控制组件的渲染过程 
通常会使用模板语法定义组件的解构
有时需要灵活的控制 可以使用render函数


- h函数 也叫做 createElement 用于创建虚拟dom节点
接受三个参数：
1 创建的节点类型（可以是字符串或组件）   
2 节点属性props
3 子节点


- menu部分
- [Menu 菜单 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/menu.html#menu-%E8%8F%9C%E5%8D%95)
class="el-menu-vertical-demo"
这个class没看到 都是 Mode = horizontal


就很离谱第一次看到调用自身组件进行递归 然后是为了确保sub menu 那个parentindex各不相同

`v-model:file-list="form.actors"` 的用法是为了处理 `<el-upload>` 组件的特定属性 `file-list`，将上传文件的列表与 `form.actors` 数据属性进行双向绑定。
**标准用法** (`v-model="xxx"`): 适用于大多数表单元素，直接绑定输入值到 Vue 实例中的数据属性。





