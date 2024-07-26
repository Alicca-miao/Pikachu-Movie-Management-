// 引用 Mock
import Mock from 'mockjs';
 
const countryList = [
  "United States", "Canada", "China", "Japan", "Germany", 
  "France", "United Kingdom", "Italy", "Spain", "Australia",
  "Brazil", "India", "Russia", "South Korea", "Mexico"
];

export const userData = Mock.mock("/data/list", "get", {
  "list|10-20": [  // 生成一个长度在10到20之间的数组
    {
      "filmId|+1": 1,  // 自增的ID
      "poster": "@image('60x60', '#50B347', '#FFF', 'Mock.js')",  // 随机生成的海报图片
     'actors': [{  // 生成1到3个演员 |1-3
        'avatarAddress': "@image('60x60', '#FF0000', '#FFF', 'Actor')",  // 随机生成的演员头像地址
        'name': '@name'  // 随机生成的演员名字
      }], 
      // 随机生成的演员名字
      "name": "@ctitle(5, 10)",  // 随机生成的影片名字
      "category": "@word",  // 随机生成的影片类型
      "filmType": {
        "name": "@pick(['2D', '3D', 'IMAX'])"  // 随机生成的视觉类型
      },
      "premiereAt": "@integer(1609459200, 1672444800)",  // 随机生成的首映时间戳（范围从2021-01-01到2023-01-01）
      // "nation": function() { 
      //   return this.pick(countryList);  // 从自定义的国家列表中随机选择
      // },
      // "nation":"aa",
      "nation": "@pick([" +
        countryList.map(country => `"${country}"`).join(', ') +
      "])",  // 从自定义的国家列表中随机选择
      "grade|1-10.1": 1,  // 随机生成1到10之间的浮点数，保留1位小数
      "runtime|60-180": 1,  // 随机生成的影片时长，单位：分钟
    },
  ],
  code: 200,
  message: 'ok',
});

export const detailinfo = Mock.mock("/api/movie/detail", "get", {
  "detail": {
    "filmId|+1": 1,  // 自增的ID
    "poster": "@image('200x300', '#50B347', '#FFF', 'Mock.js')",  // 随机生成的海报图片
    "actors|1-3": [{  // 生成1到3个演员
      "avatarAddress": "@image('60x60', '#FF0000', '#FFF', 'Actor')",  // 随机生成的演员头像地址
      "name": '@name',  // 随机生成的演员名字
      "role": "actress"  // 固定角色名称为 'actress'
    }],
    "name": "@ctitle(5, 10)",  // 随机生成的影片名字，长度在5到10个字之间
    "category": '爱情|动作|科幻',  // 固定的影片类型
    "filmType": {
      "name": "@pick(['2D', '3D', 'IMAX'])"  // 随机生成的视觉类型
    },
    "premiereAt": "@integer(1609459200, 1672444800)",  // 随机生成的首映时间戳（范围从2021-01-01到2023-01-01）
    "nation": "@pick([" +
        countryList.map(country => `"${country}"`).join(', ') +
      "])",  // 从自定义的国家列表中随机选择
    "grade|1-10.1": 1,  // 随机生成1到10之间的浮点数，保留1位小数
    "runtime|60-180": 1,  // 随机生成的影片时长，单位：分钟
    "synopsis": "hahah",  // 固定的剧情摘要
    "_id": "1234567890",  // 固定的影片唯一标识符
    "isPresale": "@pick(['true', 'false'])"  // 随机生成是否预售
  },
  code: 200,
  message: 'ok'
});


Mock.mock('/api/movie/update', 'post', (options) => {
  // 解析提交的数据
  // 使用 Mock.mock 来定义一个 POST 请求的接口 (/api/movie/update)
  // 。当前端代码发送 POST 请求到这个接口时，Mock.js 会拦截请求并返回预定义的响应。
  const requestData = JSON.parse(options.body);
  
  console.log('Received data:', requestData);

  // 返回模拟的响应
  return {
    code: 200,
    message: 'Update successful',
    modifiedCount: 1 // 模拟的更新计数
  };
});

Mock.mock('/api/users', 'get', {
  'users|10-20': [
    {
      'username': '@word(5, 10)',  // 随机生成5到10个字符的用户名
      'password': '@word(8)',  // 随机生成8个字符的密码
      'admin|1': [true, false]  // 随机生成true或false表示是否管理员
    }
  ]
});




