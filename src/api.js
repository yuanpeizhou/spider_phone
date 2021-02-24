
import axios from 'axios'

const api_host_local = 'http://127.0.0.1/book_spider/public/'
const api_host_company = 'http://192.168.6.98/book_spider/public/'
export const img_host = 'http://192.168.6.98/book_spider/'


function httpRequest(url,method = 'get',params,charset,callback){
  var apiUrl = ''
  if(url.indexOf('http') != -1){
    apiUrl = url
  }else{
    apiUrl = api_host_company + url
  }
  if(method === 'get'){
      axios.get(apiUrl, {
        params: params
      })
      .then(function (response) {
        callback(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    axios.post(apiUrl, params)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

/**获取套图列表 */
export function getImgsList(params,callback,charset="utf-8"){
  return httpRequest('api/imgs/list','get',params,charset,callback)
}

/**获取套图详情 */
export function getImgsInfo(url,method = "get",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**获取颜控网套图列表 */
export function getYankongImgsList(params,callback,charset="utf-8"){
  return httpRequest('admin/yankongImgs/list','get',params,charset,callback)
}


/**获取颜控网套图详情 */
export function getYankongImgsInfo(params,callback,charset="utf-8"){
  return httpRequest('admin/yankongImgs/info','get',params,charset,callback)
}