// import { createSelector } from "reselect";

import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

// const getAllUsers = (state: AppStateType) => {
//
//   return state.usersPage.users;
// };

export const selectIsAuth = (state: AppStateType) => {
  // console.log(2222, getAllUsers())
  return state.auth.isAuth;
};

export const selectCurrentUserLogin = (state: AppStateType) => {
  return state.auth.login;
};
