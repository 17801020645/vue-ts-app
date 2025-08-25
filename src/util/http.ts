import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/', // 所有请求的基础URL
  timeout: 5000, // 请求超时时间（毫秒）
});

// 请求拦截器 - 在发送请求前执行
instance.interceptors.request.use(
  function (config) {
    // 这里可以添加全局请求处理逻辑，例如：
    // 1. 添加认证token
    // 2. 设置请求头
    // 3. 添加loading状态
    return config; // 必须返回修改后的配置对象
  },
  function (error) {
    // 请求错误处理（通常发生在请求发送前）
    // 例如：网络异常、配置错误等
    return Promise.reject(error);
  }
);

// 响应拦截器 - 在收到响应后执行
instance.interceptors.response.use(
  function (response) {
    // 这里可以添加全局响应处理逻辑，例如：
    // 1. 统一处理响应数据结构
    // 2. 根据状态码进行全局提示
    // 3. 关闭loading状态
    return response; // 返回响应对象
  },
  function (error) {
    // 响应错误处理（HTTP状态码非2xx范围）
    // 例如：401未授权、500服务器错误等
    return Promise.reject(error);
  }
);

// 定义通用的数据接口
interface Data {
  [index: string]: unknown; // 字符串索引签名，允许任意字符串键，值类型为unknown
}

// 定义HTTP方法接口
interface Http {
  // 所有方法都返回Promise，解析值为AxiosResponse
  get: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  patch: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

// 实现Http接口的具体方法
const http: Http = {
  /**
   * GET请求
   * @param url 请求地址（相对路径）
   * @param data 请求参数（将转换为query参数）
   * @param config 额外axios配置
   */
  get(url, data, config) {
    return instance.get(url, {
      params: data, // GET请求参数放在params中
      ...config, // 合并其他配置
    });
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 额外配置
   */
  post(url, data, config) {
    return instance.post(url, data, config);
  },

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 更新数据
   * @param config 额外配置
   */
  put(url, data, config) {
    return instance.put(url, data, config);
  },

  /**
   * PATCH请求
   * @param url 请求地址
   * @param data 部分更新数据
   * @param config 额外配置
   */
  patch(url, data, config) {
    return instance.patch(url, data, config);
  },

  /**
   * DELETE请求
   * @param url 请求地址
   * @param data 可选请求体数据（部分服务器支持）
   * @param config 额外配置
   */
  delete(url, data, config) {
    // DELETE请求特殊处理：参数可以放在请求体
    return instance.delete(url, {
      data, // 数据放在请求体
      ...config, // 合并其他配置
    });
  },
};

// 导出封装好的http对象
export default http;
