import { message } from "ant-design-vue";
import { Axios } from "./axios";

// 封装get请求
export const get = async (
  url: string,
  params?: any
): Promise<{ data: any }> => {
  const { data } = await Axios.get(url, { params: params });
  return data;
};

// 封装post请求
export const post = async (url: string, body: any) => {
  try {
    return await Axios.post(url, body);
  } catch (err: any) {
    message.error(err.data.message);
  }
};
