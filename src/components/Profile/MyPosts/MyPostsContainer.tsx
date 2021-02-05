import { actions } from "../../../redux/profile-reducer";
import MyPosts, {MapPropsType, DispatchPropsType} from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStatToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStatToProps, {addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;
