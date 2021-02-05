import React from "react";
import {Pagination} from "../../Utils/Paginator/Pagination";
import User from "./User";
import {UsersType} from "../../Types/Type";
import {UsersSearchForm} from "./UsersSearchForm";

type PropsType ={
  totalCount: number,
  pageSize: number,
  setCurrentPage: (p: number)=>void,
  users: Array<UsersType>
  fetchingProcessing:  Array<number>
  follow: (userId: number)=> void
  unfollow: (userId: number)=> void
}

const Users: React.FC<PropsType> = ({totalCount,pageSize,setCurrentPage,users, fetchingProcessing,follow, unfollow}) => {




  return (
    <div>
      <UsersSearchForm/>
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
      />
      {users.map((u) => {
 

        return (
          <User
            user={u}
            key={u.id}
            fetchingProcessing={fetchingProcessing}
            unfollow={unfollow}
            follow={follow}
          />
        );
      })}
    </div>
  );
};

export default Users;
