console.log(process.env);
let serverConfig = process.env.serverConfig;
let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
let isOpera = userAgent.indexOf("Opera") > -1; // 判断是否Opera浏览器
let isIE =
  userAgent.indexOf("compatible") > -1 &&
  userAgent.indexOf("MSIE") > -1 &&
  !isOpera; // 判断是否IE浏览器

 let baseURL = "http://testadmin.yqh168.com/v1/sys";

export default {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  upload: "/file/upload",
  timeout: 5000
};
