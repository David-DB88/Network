// import { createSelector } from "reselect";

import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

// const getAllUsers = (state: AppStateType) => {
//
//   return state.usersPage.users;
// };

export const getAllUsersSelector = (state: AppStateType) => {
  // console.log(2222, getAllUsers())
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalCount = (state: AppStateType) => {
  return state.usersPage.totalCount;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFetchingProcessing = (state: AppStateType) => {
  return state.usersPage.fetchingProcessing;
};
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter
};
