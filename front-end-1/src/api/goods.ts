import myAxios from './axios';

export function getListAPI() {
  return myAxios({
    url: '/api/list',
    method: 'get',
  })
}
