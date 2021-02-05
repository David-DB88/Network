import React from "react";
import { connect } from "react-redux";
import l from "../../assets/images/gifLoder.module.css";
import Users from "./Users";
import { follow, unfollow, getUsers } from "../../redux/users-reducer";
import { compose } from "redux";
import {
  getPageSize,
  getTotalCount,
  getCurrentPage,
  getIsFetching,
  getFetchingProcessing,
  getAllUsersSelector,
} from "../../redux/users-selector";
import { UsersType } from "../../Types/Type";
import { AppStateType } from "../../redux/redux-store";

type PropsType=  mapStateToPropsType & mapDispatchToPropsType & ownPropTyps
type ownPropTyps ={
  pageTitle: string
}
type mapStateToPropsType ={
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalCount: number
  users: Array<UsersType>
  fetchingProcessing:  Array<number>
}
type mapDispatchToPropsType ={
  follow: (userId: number)=> void
  unfollow: (userId: number)=> void
  getUsers: (currentPage: number,    pageSize: number)=> void
}
class UsersContainer extends React.Component<PropsType> {
  
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  setCurrentPage = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };
  render() {
    // debugger
    return (
      <>
      <div>
      <h2>{this.props.pageTitle}</h2>
      </div>
        {this.props.isFetching ? (
          <div className={l.loader}>Loading...</div>
        ) : null}
        <Users
        
          // currentPage ={this.props.currentPage}
          totalCount={this.props.totalCount}
          pageSize={this.props.pageSize}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          setCurrentPage={this.setCurrentPage}
          fetchingProcessing={this.props.fetchingProcessing}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    
    users: getAllUsersSelector(state),
    pageSize: getPageSize(state),
    totalCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    fetchingProcessing: getFetchingProcessing(state),
  };
};
export default compose(
  connect<mapStateToPropsType,mapDispatchToPropsType, ownPropTyps, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);
