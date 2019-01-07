const axios = require('axios');

const server = axios.create({
    // baseURL: '',
    timeout: 5000
}) 

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

let api = {
   async doTrasication(method,url,txObj){
      let response = await server({
          url: url,
          data: txObj,
          method: method
       })
       return response.data
    }
}
module.exports = api