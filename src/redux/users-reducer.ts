import {updateObjectInArray} from "../Utils/Helpers/object-helper";
import {UsersType} from "../Types/Type";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "react";
import {usersAPI} from "../API/users-api";
import {ApiResponseType} from "../API/Api";
import {isBoolean} from "util";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    fetchingProcessing: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter


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
            return {...state, users: action.users};
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.pageNumber};
        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalCount: action.totalUsers};
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "SET_FILTER":
            return {...state, filter: action.payload};
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

export const actions = {
    followAccsees: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowAccsees: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: "SET_USERS", users} as const),
    setTotalUsesr: (totalUsers: number) => ({
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
    setFilter: (filter: FilterType) => ({
        type: "SET_FILTER",
        payload: filter,
    } as const),
    togglFetchingProcessing: (isFetching: boolean, userid: number) => ({
        type: "TOGGLE_IS_FETCHING_PROCESSING",
        isFetching,
        userid,
    } as const)

}


type ThunkType = BaseThunkType<AtionTyps>
type DispatchType = Dispatch<AtionTyps>


export const getUsersSaga = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPages(pageNumber));

        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsersApi(pageNumber, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsesr(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };
};

const followUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<ApiResponseType>, actionCreaetor: (userId: number) => AtionTyps) => {
    dispatch(actions.togglFetchingProcessing(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreaetor(userId));
    }
    dispatch(actions.togglFetchingProcessing(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollow(
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
