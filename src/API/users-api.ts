import {instance, GetItemsType, ApiResponseType} from "./Api";

export const usersAPI = {
    getUsers(x: number, y: number) {
        return instance
            .get<GetItemsType>(`users?page=${x}&count=${y}`)
            .then((response) => response.data);
    },
    getUnFollow(id: number) {
        return instance.delete<ApiResponseType>(`/follow/${id}`).then((response) => response.data)
    },
    getFollow(id: number) {
        return instance.post<ApiResponseType>(`/follow/${id}`).then((response) => response.data);
    },
};