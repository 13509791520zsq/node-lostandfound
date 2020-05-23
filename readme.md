# lost&found

## api

1. post  login     参数： username&password      返回值： seccuss:true/false
2. post  register  参数: username&password&email 返回值：success：true/false，message：‘邮箱已注册’
3. get   lprofiles 参数： null                   返回值: {lostitems的所有数据}
4. get   fprofiles 参数： null 返回值: {founditems的所有数据}
5. get   qlprofiles 参数：lostitemsname&place...      返回值：[ 查询到的所有结果的数据]
6. get   qfprofiles 参数： founditemsname&place  返回值：[查询到的所有结果的数据]
7. post  upload     参数： {items详细描述}        返回值：{success： true/false}
8: get deleteitems  参数： {userid: '',_id: ''}  返回值：{success： true/false}

```  items： {
    _id: '',
    userid: '',
    name: '',
    place: '',
    date: '',
    image: '',
    sketch: ''
  }

  user:{
    _id: '',
    username: '',
    password: '',
    email: '',
    identity: '' (defoult: user),
    avatar: ''
    litems: [{
      name: String,
      id: String
    }],
    fitems: [{
      name: String,
      id: String
    }]
  }
```
