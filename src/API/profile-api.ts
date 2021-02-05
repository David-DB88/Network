import {PhotosType, ProfileType} from "../Types/Type";
import {instance, ApiResponseType} from "./Api";

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    userProfile(userid: number) {
        return instance.get<ProfileType>(`profile/${userid}`).then((response) => response.data);
    },
    status(userid: number) {
        return instance
            .get<string>(`/profile/status/${userid}`)
            .then((response) => response.data);
    },
    statusUpdate(status: string) {
        return instance
            .put<ApiResponseType>(`/profile/status`, {status})
            .then((response) => response.data);
    },
    photoUpdate(photo: File) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance
            .put<ApiResponseType<SavePhotoResponseType>>(`/profile/photo`, formData, {headers: {"Content-Type": 'multipart/form-data'}})
            .then((response) => response.data);
    },
    saveProfileInfo(profile: ProfileType) {
        return instance
            .put(`/profile`, profile)
            .then((response) => response.data);
    },
};