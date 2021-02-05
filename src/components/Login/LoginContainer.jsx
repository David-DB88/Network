// import React from "react";
// import { connect } from "react-redux";
// import { userAuth, userLogin } from "../../redux/auth-reducer";
// import Login from "./login";

// class LoginContainer extends React.Component {
//   componentDidMount() {
//     // this.props.userAuth();
//     this.props.userLogin();
//   }

//   render() {
//     return <Login {...this.props} />;
//   }
// }

// let mapStateToProps = (state) => {
//   return {
//     isAuth: state.auth.isAuth,
//     login: state.auth.login,
//     email: state.auth.email,
//     password: state.auth.password,
//   };
// };

// export default connect(mapStateToProps, { userLogin })(LoginContainer);
