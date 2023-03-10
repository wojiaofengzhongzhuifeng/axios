## axios 封装

### 取消重复请求，并且添加自定义设置

- 首先，确定数据结构与取消的api
```javascript
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
```
- 在请求拦截器中，将请求的url + 请求data + 请求header 生成字符串key ，然后尝试在map寻找有没有value
  - 如果有，那么说明存在重复请求，需要立即调佣abort
  - 如果没有，设置map[key] = controllerInstance
- 在响应拦截器中，将请求的将请求的url + 请求data + 请求header 生成字符串key ，删除map[key]

### 统一处理响应结果与错误处理
- 首先确定后端所有可能的响应数据结构
  - 客户端和服务器都正常
  ```javascript
  {
  result: 'OK',
  data: '苹果',
  message: '请求正常',
  code: '000000' // 业务 code ，前端维护一个map ，根据后端返回的code，前端知道响应结果
  }
  ```
  - 和后端确定错误情况下的数据结构
    - 那么 httpcode 的还是 200 吗？
    - 返回的数据结构和正常的数据结构是一致的吗？
- 根据后端响应数据结构，分别处理
