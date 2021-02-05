import React from "react";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
export type  MapPropsType = {
    isAuth: boolean
    login: string | null

}
export type DispatchPropsType = {
    userLogOut: () => void
}
const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <img src="https://cs8.pikabu.ru/post_img/big/2017/03/05/11/1488741312164030715.jpg" />
      <div>
        {props.isAuth ? (
          <div>
            {props.login}-<button onClick={props.userLogOut}>Log Out</button>
          </div>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
