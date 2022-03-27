import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {Route, Redirect, NavLink, Link} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import l from "../src/assets/images/gifLoder.module.css";
import ProfaileContainer from "./components/Profile/ProfaileContainer";
import {connect} from "react-redux";
import {initializingApp} from "./redux/app-reducer";
import {compose} from "redux";
import {withSuspense} from "./HOC/withSuspense";
import {AppStateType} from "./redux/redux-store";
import {LoginPage} from "./components/Login/loginPage";
import {UsersPage} from "./components/Users/UsersContainer";
import 'antd/dist/antd.css';

import {Layout, Menu, Breadcrumb, Avatar} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import s from "./components/Navbar/Navbar.module.css";
import Header from "./components/Header/Header";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const DialogsContainer = React.lazy(() =>
    import("./components/Dialogs/DialogsContainer")
);
// const UsersContainer = React.lazy(() =>
//   import("./components/Users/UsersContainer")
// );
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializingApp: () => void
}
const SuspensDialogs = withSuspense(DialogsContainer)

// const SuspensUsers = withSuspense(UsersContainer)
class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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

            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1">
                                        <NavLink to="/profile" activeClassName={s.activeLink}>
                                            Profile
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <NavLink to="/dialogs" activeClassName={s.activeLink}>
                                            Messages
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5">
                                        <Link to="/developers">
                                            Developers
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">

                                    </Menu.Item>
                                    <Menu.Item key="7">

                                    </Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                    <Menu.Item key="9">
                                        <NavLink to="/news" activeClassName={s.activeLink}>
                                            News
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="10">
                                        <NavLink to="/settings" activeClassName={s.activeLink}>
                                            Settings
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="11">
                                        <NavLink to="/music" activeClassName={s.activeLink}>
                                            Music
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="12">
                                        <NavLink
                                            to="/friends"
                                            activeClassName={s.activeLink}
                                            className={s.friend}
                                        >
                                            Friends
                                        </NavLink>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <switch>
                                <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
                                <Route
                                    path="/profile/:userid?"
                                    render={() => <ProfaileContainer/>}
                                />
                                <Route
                                    exact
                                    path="/dialogs"
                                    render={() => <SuspensDialogs/>}/>
                                {/*<Route path="/users" render={() => <SuspensUsers pageTitle={ 'Samurai'}/> } />*/}
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/developers" render={() => <UsersPage pageTitle={'Samurai'}/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/login" render={() => <LoginPage/>}/>
                                <Route path="*" render={() => <div>404 Some error</div>}/>
                            </switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            // <div className="app-wrapper">
            //   <HeaderContainer />
            //   <Navbar />
            //
            //   <div className="app-wrapper-content">

            //   </div>
            // </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
    };
};
let AppContainer = compose(connect(mapStateToProps, {initializingApp})(App));
export default AppContainer;
