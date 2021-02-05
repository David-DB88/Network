import {instance} from "./Api";
type ResponseSecurityType = {
    url: string
}
export const securityAPI = {
    getCaptcha() {
        return instance
            .get<ResponseSecurityType>(`security/get-captcha-url`)
            .then((response) => response.data);

    }
}