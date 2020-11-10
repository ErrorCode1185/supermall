import axios from "axios";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/w6",
    timeout: 5000
  });

  // 2.axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 作用：拦截config中不符合服务器要求的信息、每次网络请求时，希望在界面中显示的请求图标

      // 拦截之后必须返回
      return config;
    },
    err => {
      // console.log(err);
    }
  );
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  // 3.发送真正的网络请求
  return instance(config);
}
