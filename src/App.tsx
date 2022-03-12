import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Redirect } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import l from "../src/assets/images/gifLoder.module.css";
import ProfaileContainer from "./components/Profile/ProfaileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect } from "react-redux";
import { initializingApp } from "./redux/app-reducer";
import { compose } from "redux";
import { withSuspense } from "./HOC/withSuspense";
import {AppStateType} from "./redux/redux-store";
import {LoginPage} from "./components/Login/loginPage";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializingApp: () => void
}
const SuspensDialogs = withSuspense(DialogsContainer)
const SuspensUsers = withSuspense(UsersContainer)
class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent)=>{
        alert("Some error occured")
    }
  componentDidMount() {
    this.props.initializingApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
       }
       componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
       }

    render() {
    if (!this.props.initialized) {
      return <div className={l.loader}>Loading...</div>;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />

        <div className="app-wrapper-content">
          <switch>
            <Route exact path ="/" render ={()=><Redirect to ="/profile"/>}/>
          <Route
            path="/profile/:userid?"
            render={() => <ProfaileContainer />}
          />
          <Route
            exact
            path="/dialogs"
            render={() => <SuspensDialogs/>}/>
          <Route path="/users" render={() => <SuspensUsers pageTitle={ 'Samurai'}/> } />
          <Route path="/news" render={() => <News/>} />
          <Route path="/music" render={() => <Music/>} />
          <Route path="/settings" render={() => <Settings/>} />
          <Route path="/login" render={() => <LoginPage/>} />
          <Route path= "*" render= {()=><div>404 Some error</div>}/>
          </switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};
let AppContainer = compose(connect(mapStateToProps, { initializingApp })(App));
export default AppContainer;
