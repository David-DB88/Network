import React from "react";
import s from "./Header.module.css";
import {Link} from "react-router-dom";
import {Avatar, Menu, Row, Col, Layout, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {DefaultRootState, useDispatch, useSelector} from "react-redux";
import {userLogOut} from "../../redux/auth-reducer";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selector";


const Header: React.FC = (props) => {
    const {Header} = Layout;
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(userLogOut())
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/developers">
                                Developers
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={1}>
                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                </Col>
                <Col>
                    {isAuth ? (
                        <div>
                            {login}
                            <Button onClick={logoutCallback}>Log Out</Button>
                        </div>
                    ) : (
                        <Link to={"/login"}>Login</Link>
                    )}
                </Col>
            </Row>
        </Header>
    )
        ;
};

export default Header;
