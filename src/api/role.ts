import { post } from "../utils/axios/request";
import { userDto } from "../utils/dto/user";

export const loginApi = async (body: userDto) => {
  const data = await post("/user/login", body);
  return data;
};
