export type PostType ={
    id: number,
      massage: string, 
      likeCounts: number,
    }
   export  type ContactType = {
      github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
    }
   export type PhotosType = {
      small: string | undefined,
      large: string | undefined
    }
   export type ProfileType={
        userId: number,
      lookingForAJob: boolean,
      lookingForAJobDescription: string,
      fullName: string,
      contacts: ContactType,
      photos: PhotosType
       aboutMe: string
      
      }
    export type UsersType ={
        id: number,
        name: string,
        status: string,
        photos: PhotosType
        followed: boolean
    }