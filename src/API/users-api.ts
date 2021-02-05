import {instance, GetItemsType, ApiResponseType} from "./Api";

export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance
            .get<GetItemsType>(`users?page=${pageNumber}&count=${pageSize}&term=${term}`+ (friend === null ? '': `&friend=${friend}`) )
            .then((response) => response.data);
    },
    getUnFollow(id: number) {
        return instance.delete<ApiResponseType>(`/follow/${id}`).then((response) => response.data)
    },
    getFollow(id: number) {
        return instance.post<ApiResponseType>(`/follow/${id}`).then((response) => response.data);
    },
};