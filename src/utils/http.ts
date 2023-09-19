import axios from "axios";

const instance = axios.create({
  baseURL: "http://www.tangxiaoyang.vip:8888/api/v2",
  timeout: 10000,
});
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default instance;
