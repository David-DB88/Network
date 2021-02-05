import React from "react";
import {Pagination} from "../../Utils/Paginator/Pagination";
import User from "./User";
import {UsersType} from "../../Types/Type";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType ={
  totalCount: number,
  pageSize: number,
  setCurrentPage: (pageNumber: number)=>void,
  users: Array<UsersType>
  fetchingProcessing:  Array<number>
  follow: (userId: number)=> void
  unfollow: (userId: number)=> void
    onChangeFilter: (filter: FilterType)=>void
}

const Users: React.FC<PropsType> = ({totalCount,pageSize,setCurrentPage,onChangeFilter,users, fetchingProcessing,follow, unfollow}) => {




  return (
    <div>
      <UsersSearchForm onChangeFilter={onChangeFilter}/>
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
