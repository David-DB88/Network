import React from "react";
import { InjectedFormProps, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";

import { userLogin } from "../../redux/auth-reducer";
import { required, maxLengthCreator } from "../../Utils/Validators/Validators";
// import { WithInput } from "../../HOC/InputHOC/withInput";
import { Redirect } from "react-router-dom";
import s from "../../Utils/FormControl/FormsControls.module.css";
import {createField, Input} from "../../Utils/FormControl/FormsControls";
import {AppStateType} from "../../redux/redux-store";

const maxlength5 = maxLengthCreator(20);

// const MyInput =(): string =>{
//     return  "input"
// }
// const hocInput: string = WithInput("Input");

type LoginFormOwnProps = {
  captcha: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<LoginFormValueTypeKeys>("Email", "email", Input, [required, maxlength5])}
      {createField<LoginFormValueTypeKeys>("Password", "password", Input, [required, maxlength5])}
      {createField<LoginFormValueTypeKeys>(undefined, "rememberMe", Input, [], {type: "checkbox"}, "remember me")}
      {props.captcha && <img  src = {props.captcha} alt="Captcha" />}
      {props.captcha &&  createField<LoginFormValueTypeKeys>("Simbls from image", "captcha", Input, [required]) }

      <div className={s.errorMessage}>{props.error}</div>
      <div>
        <button>Sign In</button>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm<LoginFormValuesType , LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type LoginFormValuesType = {
  captcha: string;
  rememberMe: boolean;
  password: string;
  email: string;
}
type LoginFormValueTypeKeys = GetStringKeysType<LoginFormValuesType>
export type GetStringKeysType<T> = Extract<keyof T, string>

export const  LoginPage = () =>{

    // const email =useSelector((state: AppStateType ) => state.auth.email )
    // const login =useSelector((state: AppStateType ) => state.auth.login )
    const isAuth =useSelector((state: AppStateType ) => state.auth.isAuth )
    const captcha =useSelector((state: AppStateType ) => state.auth.captcha )

    const dispatch = useDispatch()

 const onSubmit = (formData: LoginFormValuesType) => {
     dispatch(userLogin(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    ));
  };


    if (isAuth) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
      </div>
    );

}