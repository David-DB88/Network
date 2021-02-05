import React from "react";
import { InjectedFormProps, reduxForm} from "redux-form";
import { connect } from "react-redux";

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

type MapStatePropsType = {
  captcha: string | null
  isAuth: boolean
    login: string | null
    email: string | null
}
type MapDispatchPropsType = {
  userLogin:  (email: string , password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesType = {
  captcha: string;
  rememberMe: boolean;
  password: string;
  email: string;
}
type LoginFormValueTypeKeys = GetStringKeysType<LoginFormValuesType>
export type GetStringKeysType<T> = Extract<keyof T, string>
const  Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) =>{
 const onSubmit = (formData: LoginFormValuesType) => {
     // console.log("dispatch",props.userLogin)
    props.userLogin(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };


    if (props.isAuth) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
      </div>
    );

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    captcha: state.auth.captcha,
    isAuth: state.auth.isAuth,
     login: state.auth.login,
     email: state.auth.email,
  };
};

const LoginContainer = connect(mapStateToProps, { userLogin })(Login);
export default LoginContainer;
