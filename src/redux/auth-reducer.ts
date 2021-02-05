import { ResultCodeEnum, ResultCodeForCaptchaEnum} from "../API/Api";
import { stopSubmit } from "redux-form";
import {authAPI} from "../API/auth-api";
import {securityAPI} from "../API/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";



let initialState = {
  userid: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captcha: null as string | null
};

export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      case 'SET_CAPTCHA_URL':
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};
const actions = {
    setUserdata: (userid: number|null, login: string|null, email: string|null, isAuth: boolean)=> ({
        type: 'SET_USER_DATA',
        data: { userid, login, email, isAuth },
    } as const),
    setCaptchaUrl: (captcha: string|null)=> ({
        type: 'SET_CAPTCHA_URL',
        data: {captcha} ,
    } as const)
}

// Thunks

export const userAuth = (): ThunkType => async (dispatch) => {
    let data= await authAPI.getAuth()

    if (data.resultCode === ResultCodeEnum.Success) {
          let { id, login, email } = data.data;

          dispatch(actions.setUserdata(id, login, email, true));
      }
};

export const userLogin = (email: string , password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  let data = await authAPI.getLogin(email, password, rememberMe, captcha)
      console.log("userLogin -> data", data);

      if (data.resultCode === ResultCodeEnum.Success ) {
        dispatch(userAuth());
      } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
          dispatch(getCaptchaUrl())
        }
        let errorMessage =
          data.messages.length > 0 ? data.messages : "Some error";
        dispatch(stopSubmit("login", { _error: errorMessage }));
      }
    };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
   const response  = await securityAPI.getCaptcha();
    const captcha = response.url;
    dispatch(actions.setCaptchaUrl(captcha));
}

export const userLogOut = (): ThunkType => async (dispatch) => {
      let data = await authAPI.getLogOut()

      if (data.resultCode === 0) {
        dispatch(actions.setUserdata(null, null, null, false));
      }
};

export default authReducer;
