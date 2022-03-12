import React from "react";
import { useSelector} from "react-redux";
import l from "../../assets/images/gifLoder.module.css";
import {
  getIsFetching,
} from "../../redux/users-selector";
import {Users} from "./Users";

type UsersPageType ={
  pageTitle: string
}
const UsersPage: React.FC<UsersPageType> = (props) => {
  const isFetching = useSelector(getIsFetching)
  return<>
    <div>
      <h2>{props.pageTitle}</h2>
    </div>
    {isFetching ? (
        <div className={l.loader}>Loading...</div>
    ) : null}
    <Users/>
  </>
}
export default UsersPage