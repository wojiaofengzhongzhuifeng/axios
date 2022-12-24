import axios, {AxiosRequestConfig} from 'axios';
import {message} from "antd";


const abortMap = new Map()

type CustomConfig = {
  allowRepeatRequest?: boolean
  hideError?: boolean
}
const errorMap = {
  '00000': '正常',
  '40001': '没有权限'
}

function myAxios(axiosConfig: AxiosRequestConfig, customConfig?: CustomConfig) {
  const service = axios.create({
    baseURL: '/api', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  service.interceptors.request.use((config)=>{
    let allowRepeatRequest;
    if(customConfig){
      allowRepeatRequest = customConfig.allowRepeatRequest
    }

    if(!allowRepeatRequest){
      const controller = new AbortController();
      let key = createMapKey(config)
      config.signal = controller.signal
      if(abortMap.has(key)){
        controller.abort()
      } else {
        abortMap.set(key, controller)
      }
    }
    return config
  },(error)=>{
    console.log(error);
  })

  service.interceptors.response.use((response)=>{
    console.log('响应结果', response);
    let allowRepeatRequest;
    let hideError;
    if(customConfig){
      allowRepeatRequest = customConfig.allowRepeatRequest
      hideError = customConfig.hideError
    }

    let {config} = response
    if(!allowRepeatRequest){
      let key = createMapKey(config)
      abortMap.delete(key)
    }
    if(!hideError){
      let code = response.data.code
      // @ts-ignore
      if(errorMap[code] !== '正常'){
        // @ts-ignore
        message.error(errorMap[code])
        return Promise.reject('')
      }
    }
    return response.data.data || 'ok'
  }, (error)=>{
    let hideError;
    if(customConfig){
      hideError = customConfig.hideError
    }
    if(!hideError){
      // 当出现错误情况下，返回的 httpcode 不为 200，都会走这里，处理后端错误情况的第一种和第二种
      // message.error(error.response.data.message)
      message.error(error.response.data.message)
    }
    return Promise.reject('')
  })

  return service(axiosConfig)
}

function createMapKey(config: AxiosRequestConfig): string{
  const {url, method, data} = config
  return [url, method, data].join('&&')
}

export default myAxios;
