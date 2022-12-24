import myAxios from './axios';

export function getListAPI() {
  return myAxios({
    url: '/goods',
    method: 'get',
  }, {
    allowRepeatRequest: true
  })
}
