import Axios from "axios";
import {UsersType} from "../Types/Type";

export const instance = Axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "fd92e9d5-9ec1-4ca2-b5d8-0364ffad1a27",
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