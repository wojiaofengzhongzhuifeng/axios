import axiosInstance from './axios'
import qs from 'qs';

type LoginInfo = {
  username: string
  password: string
}

export function postLogin(loginInfo: LoginInfo){
  return axiosInstance({
    url: '/api/login',
    method: 'post',
    data: loginInfo,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // 请求拦截器
    transformRequest: [
      (data) => {
        return qs.stringify(data)
      }
    ],
  })
}
