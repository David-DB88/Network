import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import { Link } from "react-router-dom";
import { UsersType } from "../../Types/Type";

type PropsType ={
  user: UsersType
  key: number
  fetchingProcessing: Array<number> 
  unfollow: (userId: number)=> void 
  follow: (userId: number)=> void 
}

const User: React.FC<PropsType> = ({ user, key, fetchingProcessing, unfollow, follow }) => {
  return (
    <div>
      <div key={key}>
        <span>
          <div>
            <Link to={"/profile/" + user.id}>
              <img
                src={user.photos.small != null ? user.photos.small : userPhoto}
                className={s.user}
              />
            </Link>
          </div>
          <div>
            {user.followed ? (
              <button
                disabled={fetchingProcessing.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={fetchingProcessing.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              >
                Follow
              </button>

            )}
          </div>
        </span>
        <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
           
          </span>
        </span>
      </div>
      
    </div>
  );
};

export default User;
