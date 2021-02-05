import React from "react";
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import { connect } from "react-redux";
import {  userLogOut } from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
  };
};

export default connect<MapPropsType, DispatchPropsType,{},AppStateType>(mapStateToProps, { userLogOut })(HeaderContainer);
