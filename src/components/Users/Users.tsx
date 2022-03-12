import React, {useEffect} from "react";
import {Pagination} from "../../Utils/Paginator/Pagination";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsersSelector,
    getCurrentPage, getFetchingProcessing,
    getPageSize,
    getTotalCount, getUsersFilter
} from "../../redux/users-selector";


export  const Users = () => {

const totalCount = useSelector(getTotalCount)
const users = useSelector(getAllUsersSelector)
const pageSize = useSelector(getPageSize)
const currentPage = useSelector(getCurrentPage)
const fetchingProcessing = useSelector(getFetchingProcessing)
const filter = useSelector(getUsersFilter)

const dispatch = useDispatch()


 const    onChangeFilter = (filter: FilterType,) => {
        dispatch(getUsers(1,pageSize, filter));
};
const  setCurrentPage = (currentPage: number) => {
    dispatch(getUsers(currentPage, pageSize, filter));
};

const follows = (userId: number)=> {
    dispatch(follow(userId))
}
const unfollows = (userId: number)=> {
    dispatch(unfollow(userId))
}

useEffect(()=>{
    getUsers(currentPage, pageSize, filter);

},[])

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
            unfollow={unfollows}
            follow={follows}
          />
        );
      })}
    </div>
  );
};

