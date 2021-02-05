import { updateObjectInArray } from "../Utils/Helpers/object-helper";
import { UsersType } from "../Types/Type";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";
import {usersAPI} from "../API/users-api";
import {ApiResponseType} from "../API/Api";


let initialState = {
  users: []as Array<UsersType>,
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  fetchingProcessing: []as Array<number>,
};
export type InitialStateType = typeof initialState


type AtionTyps = InferActionsTypes<typeof actions>
const usersReducer = (state = initialState, action: AtionTyps): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, {
          followed: true,
        }),
      };

    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, {
          followed: false,
        }),
      };
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.pageNumber};
    case "SET_TOTAL_USERS_COUNT":
      return { ...state, totalCount: action.totalUsers };
    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FETCHING_PROCESSING":
      return {
        ...state,
        fetchingProcessing: action.isFetching
          ? [...state.fetchingProcessing, action.userid]
          : state.fetchingProcessing.filter((id) => id !== action.userid),
      };

    default:
      return state;
  }
};

export const actions={
  followAccsees: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowAccsees: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: Array<UsersType>) =>({ type: "SET_USERS", users } as const),
  setTotalUsesr : (totalUsers: number) => ({
  type: "SET_TOTAL_USERS_COUNT",
  totalUsers,
} as const),
  toggleIsFetching: (isFetching: boolean) => ({
  type: "TOGGLE_IS_FETCHING",
  isFetching,
} as const),
  setCurrentPages: (pageNumber: number) => ({
  type: "SET_CURRENT_PAGE",
  pageNumber,
} as const),
  togglFetchingProcessing: (isFetching: boolean, userid: number) => ({
  type: "TOGGLE_IS_FETCHING_PROCESSING",
  isFetching,
  userid,
} as const)

}




type ThunkType = BaseThunkType<AtionTyps>
type DispatchType = Dispatch<AtionTyps>


export const getUsers = (x: number, y: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPages(x));

    dispatch(actions.toggleIsFetching(true));

    let data = await usersAPI.getUsers(x, y);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsesr(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };
};

const followUnfollow = async (dispatch: DispatchType,  userId: number, apiMethod: (userId: number) => Promise<ApiResponseType>, actionCreaetor: (userId: number)=> AtionTyps) => {
  dispatch(actions.togglFetchingProcessing(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreaetor(userId));
  }
  dispatch(actions.togglFetchingProcessing(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
  await  followUnfollow(
      dispatch,
      userId,
      usersAPI.getFollow.bind(usersAPI),
      actions.followAccsees
    );
  };
};
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
   await followUnfollow(
      dispatch,
      userId,
      usersAPI.getUnFollow.bind(usersAPI),
      actions.unfollowAccsees
    );
  };
};

export default usersReducer;
