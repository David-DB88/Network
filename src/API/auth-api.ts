import {instance, ApiResponseType} from "./Api";


type MyResponseDataType = {
        id: number
        email: string
        login: string
}
type MyResponseLoginType = {
        userId: number
}
// resultCode: ResultCodeForCaptchaEnum | ResultCodeEnum
// messages: Array<string>
export const authAPI = {
    getAuth() {
        return instance.get<ApiResponseType<MyResponseDataType>>(`auth/me`).then((response) => response.data);
    },

    getLogin(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance
            .post<ApiResponseType<MyResponseLoginType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then((response) => response.data);
    },
    getLogOut() {
        return instance.delete(`auth/login`).then((response) => response.data);
    },
};