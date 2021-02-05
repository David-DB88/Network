import Axios from "axios";
import {UsersType} from "../Types/Type";

export const instance = Axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "8f6e5ab0-f6a4-4ada-b71f-3956c2042918",
  },
});
export type GetItemsType={
  items: Array<UsersType>
  totalCount: number
  error: string
}

export enum  ResultCodeEnum  {
Success =0,
Error =1
}
export enum  ResultCodeForCaptchaEnum  {
CaptchaIsRequired = 10
}


export type ApiResponseType<D = {}, RC = ResultCodeEnum | ResultCodeForCaptchaEnum > = {
  data: D
  messages: Array<string>
  resultCode: RC
}