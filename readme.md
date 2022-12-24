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
