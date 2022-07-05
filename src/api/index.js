import requests from './axios';
export const reqUserLogin = (data) => requests({
  url: `/user/passport/login`,
  method: 'post',
  data
});
export const reqUserLogout = () => requests({
  url: `/user/passport/logout`,
  method: 'get'
});
export const reqModifyPassword = (data) => requests({
  url: `/user/passport/logout`,
  method: 'post',
  data
})
// export const reqAddRow = (data) => requests({
//   url: `/user/passport/logout`,
//   method: 'post',
//   data
// })
export const reqSubmitTable = (tableData) => requests({
  url: `/user/passport/logout`,
  method: 'post',
  tableData
})
export const reqPullData = () => requests({
  url: `/user/passport/logout`,
  method: 'get',
})