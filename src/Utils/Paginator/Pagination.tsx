import React, { useState } from "react";
import s from './Pagination.module.css';
// import s from 'classnames'
type PropType = {
  totalCount:number,
  pageSize: number,
  currentPage?:  number,
  setCurrentPage: (p: number) =>void,
}


export const Pagination: React.FC<PropType> = ({
  totalCount,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  let pagesCounte = Math.ceil(totalCount / pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCounte; i++) {
    pages.push(i);
  }

  let [paginationSize, setPaginationSize] = useState(10);
  let paginationCount = Math.ceil(pagesCounte / paginationSize);
  let [currentPagination, setCurrentPagination] = useState(1);
  let leftBorderPagination = (currentPagination - 1) * paginationSize + 1;
  let rightBorderPagination = currentPagination * paginationSize;

  return (
    <div className={s.pagination}>
      {currentPagination > 1 && (
        <span
          onClick={() => {
            setCurrentPagination(currentPagination - 1);
          }}
        >
          &laquo;
        </span>
      )}
      {pages
        .filter((p) => p >= leftBorderPagination && p <= rightBorderPagination)
        .map((p) => {
          return (
            <span
              onClick={() => {
                setCurrentPage(p);
              }}
              // className ={currentPage === p && "active"}
            >
              {p}
            </span>
          );
        })}
      {paginationCount > currentPagination && (
        <span
          onClick={() => {
            setCurrentPagination(currentPagination + 1);
          }}
        >
          &raquo;
        </span>
      )}
    </div>
  );
};
