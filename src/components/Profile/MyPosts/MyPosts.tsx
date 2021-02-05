import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormVulesType} from "./AddPostForm";
import {PostType} from "../../../Types/Type";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType ={
    addPost: (newPostText: string)=> void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  const postsElement = props.posts.map((p) => (
    <Post key={p.id} massage={p.massage} likeCounts={p.likeCounts} />
  ));
  const onAddPost = (value: AddPostFormVulesType) => {
    props.addPost(value.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      My posts
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}/>
      {postsElement}
    </div>
  );
};
const MyPostsMemo = React.memo(MyPosts)
export default MyPostsMemo;
