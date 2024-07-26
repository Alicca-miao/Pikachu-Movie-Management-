[Card 卡片 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/card.html#card-%E5%8D%A1%E7%89%87)

class="box-card"是自定义类名的含义
`trigger` 指定了触发验证的事件类型。在表单验证框架中，`trigger` 用来定义什么时候应该执行验证规则。常见的触发事件类型包括 `blur`、`change` 等。

- **`trigger: "blur"`**：表示当输入框失去焦点（blur）时触发验证。
- **`trigger: "change"`**：表示当输入框内容变化（change）时触发验证

el-message 部分 [Message 消息提示 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/message.html#message-%E6%B6%88%E6%81%AF%E6%8F%90%E7%A4%BA)

```
const open = () => {
  ElMessage('This is a message.')
}
```

### Form Exposes[#](https://element-plus.org/zh-CN/component/form.html#form-exposes)

名称

说明

类型

validate

对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。

`Function`
这离谱的 Form Exposes 作为函数类型，使用方式非常离谱 就是
比如 其中的 resetFields 就是这么写：**formEl.resetFields()**

validate 同理 对整个表单进行验证

`ElMessage({})` 的使用方式是调用 `ElMessage` 函数，并传递一个配置对象，该对象包含消息的内容和类型等信息。

ElMessage({ message: "登录成功", type: "success", });

`dispatch` 是 Vuex 中的方法，用于触发 `action`。`dispatch` 方法的第一个参数是 `action` 的名称，第二个参数是传递给 `action` 的参数。

首先对 validate 的疑惑 这是不是属性是函数啊，接受一个回调函数
然后是对 Elmessage 的疑惑 Elmessage({})这样的使用方式是什么情况
dispathch 是触发 action 吗 第一个参数是 action 里的函数？第二个参数是传入相应 action 里函数的参数?

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。

prop
`model` 的键名。 它可以是一个属性的值(如 `a.b.0` 或 `['a', 'b', '0']`)。 在使用了 `validate`、`resetFields` 的方法时，该属性是必填的。
