import React, {useEffect} from "react";
import {Pagination} from "../../Utils/Paginator/Pagination";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, getUsersSaga, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsersSelector,
    getCurrentPage, getFetchingProcessing,
    getPageSize,
    getTotalCount, getUsersFilter
} from "../../redux/users-selector";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import {stringify} from "query-string";


export  const Users = () => {
const totalCount = useSelector(getTotalCount)
const users = useSelector(getAllUsersSelector)
const pageSize = useSelector(getPageSize)
const currentPage = useSelector(getCurrentPage)
const fetchingProcessing = useSelector(getFetchingProcessing)
const filter = useSelector(getUsersFilter)

const dispatch = useDispatch()
const history = useHistory()


    const path = history.location.search
    useEffect(()=>{
      const  parsed = queryString.parse(path.substr(1 )) as {term: string, page: string, friend: string};
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        switch (parsed.friend){
            case 'null':
                actualFilter = {...actualFilter, friend: null }
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true }
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false }
                break;

        }
       dispatch(getUsersSaga(actualPage, pageSize, actualFilter));

    },[])
    useEffect(()=>{
        const query ={
            term: filter && filter.term,
            friend: filter.friend !== null && String(filter.friend),
            page: currentPage !==1 && String(currentPage)
        }

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    },[filter, currentPage])

    const    onChangeFilter = (filter: FilterType,) => {
        dispatch(getUsersSaga(1,pageSize, filter));
};
const  setCurrentPage = (currentPage: number) => {
    dispatch(getUsersSaga(currentPage, pageSize, filter));
};

const follows = (userId: number)=> {
    dispatch(follow(userId))
}
const unfollows = (userId: number)=> {
    dispatch(unfollow(userId))
}


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

