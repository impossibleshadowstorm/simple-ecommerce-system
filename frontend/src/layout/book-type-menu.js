"use client"
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { SORT_VALUE } from "@/common/consts";
import { upperCaseEachWord } from "@/common/utils";
import { fetchBookTypes } from "@/common/https";
import clsx from "clsx";

export default function BookTypeMenu() {
  const [loadingBookType, setLoadingBookType] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const bookTypeList = [];

  // useEffect(() => {
  //   const fetchBookTypeData = async () => {
  //     setLoadingBookType(true);
  //     const res = await fetchBookTypes();
  //     const { error, content } = res;
  //     if (error) {
  //       setLoadingBookType(false);
  //       enqueueSnackbar(`Error: Fetch Book Types`, {
  //         variant: "error",
  //       });
  //       return;
  //     }
  //     setBookTypeList(content);
  //     setLoadingBookType(false);
  //   };

  //   if (bookTypeList.length === 0) {
  //     fetchBookTypeData();
  //   }
  // }, [bookTypeList.length, enqueueSnackbar, setBookTypeList]);

  return (
    <>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <div className="menu-title">Book Type</div>
          <ul>
            {bookTypeList.map((bookType) => (
              <li
                key={bookType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    type: bookType,
                  });
                }}
              >
                <span
                  className={clsx({
                    // active: homePageQueryData.type === bookType,
                  })}
                >
                  {bookType.replaceAll("_nbsp_", " ").replaceAll("_amp_", "&")}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <div className="menu-title">Order by</div>
          <ul>
            {SORT_VALUE.map((sortType) => (
              <li
                key={sortType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    sort: sortType,
                  });
                }}
              >
                <span
                  className={clsx({
                    // active: homePageQueryData?.sort === sortType,
                  })}
                >
                  {upperCaseEachWord(sortType.replaceAll("_", " "))}
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
