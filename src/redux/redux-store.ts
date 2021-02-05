import {createStore, combineReducers, applyMiddleware, compose, Action} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidbarReducer from "./sidbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkmiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type rootReducersType= typeof rootReducers // (globalState : AppStateType)=> AppStateType
export type AppStateType = ReturnType<rootReducersType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U}? U: never

export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkmiddleware))
);
// @ts-ignore
window.store = store;

export default store;
