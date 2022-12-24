import axios, {AxiosRequestConfig} from 'axios';



const abortMap = new Map()

type CustomConfig = {
  allowRepeatRequest?: boolean
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
    let allowRepeatRequest;
    if(customConfig){
      allowRepeatRequest = customConfig.allowRepeatRequest
    }

    let {config} = response
    if(!allowRepeatRequest){
      let key = createMapKey(config)
      abortMap.delete(key)
    }
    return response
  }, (error)=>{
    console.log(error)
  })

  return service(axiosConfig)
}

function createMapKey(config: AxiosRequestConfig): string{
  const {url, method, data} = config
  return [url, method, data].join('&&')
}

export default myAxios;
