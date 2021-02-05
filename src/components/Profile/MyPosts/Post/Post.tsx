import React from "react";
import s from "./Post.module.css";
type PropsType ={
    massage: string
    likeCounts: number
}
const Post: React.FC<PropsType> =(props)=> {

    return (
      <div className={s.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAul_QJonV108RRTLmYREMKl3NpvBHMqWCTq_vcEhFXgm5s9r&s" />
        <div className={s.massage}>{props.massage}</div>
        <div>
          <span>like {props.likeCounts}</span>
        </div>
      </div>
    );

}

export default Post;
