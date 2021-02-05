import { stopSubmit } from "redux-form";
import { type } from "os";
import {PhotosType, ContactType, PostType, ProfileType, UsersType} from "../Types/Type";
import {profileAPI} from "../API/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";

// const ADD_POST = 'ADD-POS';
// const SET_PROFILE = ;
// const SET_STATUS = ;
// const SET_PHOTO = ;
// const PROFILE_INFO = 'PROFILE_INFO';
// const EDIT_MOD = ;


 


let initialState = {
  posts: [
    { id: 1, massage: "This is my frirst post", likeCounts: 20 },
    { id: 2, massage: "Hi everyone", likeCounts: 15 },
    { id: 3, massage: "it's fine", likeCounts: 14 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  editMod: false,
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "ADD-POS":
      let newPost = {
        id: 5,
        massage: action.newPostText,
        likeCounts: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SET_PHOTO":
      return {
        ...state,
        profile: {...state.profile, photos: action.photo} as ProfileType
      };
        case "EDIT_MOD":
          return {
            ...state,
            editMod:  action.mod
          };
    default:
      return state;
  }
};

export  const actions = {
  addPostActionCreator: (newPostText: string)=> ({
    type: 'ADD-POS',
    newPostText,
  } as const),
  setProfile: (profile: ProfileType) => ({
    type: 'SET_PROFILE',
    profile
  } as const),
  setStatus: (status: string)=> ({
    type: 'SET_STATUS',
    status,
  } as const),
  setPhoto: (photo: PhotosType)=> ({
    type: 'SET_PHOTO',
    photo,
  } as const),
  setEditMod: (mod: boolean)=> ({
    type: 'EDIT_MOD',
    mod,
  } as const)
}

export const  setEditMod = actions.setEditMod

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.userProfile(userId)
    dispatch(actions.setProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
   let data = await profileAPI.status(userId)
      dispatch(actions.setStatus(data));

};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
   let data = await profileAPI.statusUpdate(status)
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }

};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
   let data = await profileAPI.photoUpdate(file)
      if (data.resultCode === 0) {
        debugger
        dispatch(actions.setPhoto(data.data.photos));
      }

};
export const saveProfileInfo = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userID = getState().auth.userid
    let data =  await  profileAPI.saveProfileInfo(profile)
      if (data.resultCode === 0) {
        if (userID != null){
          dispatch(getProfile(userID));
        }else {
          throw new Error("userID can't be null")
        }
        dispatch(actions.setEditMod(false));
      }else{
        dispatch(stopSubmit("profile-info", { _error: data.messages[0] }));
        
      }

};

export default profileReducer;
