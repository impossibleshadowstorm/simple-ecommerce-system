"use client";
import React from "react";
import NextLink from "next/link";
import {
  ShoppingCartIcon,
  BookOpenIcon,
  PowerIcon,
  // PlusIcon,
} from "@heroicons/react/24/outline";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useSelector((state) => state?.cart);

  // const role = localStorage.getItem("role");

  return (
    <div className="mx-auto max-w-7xl min-h-[64px] shadow-xl flex items-center justify-between bg-[#1D232A] px-8 mt-8 rounded-lg">
      <div className="navbar-center">
        <NextLink
          href="/"
          className="flex items-center btn text-xl text-green-300 hover:text-green-200"
        >
          <BookOpenIcon className="w-6 h-6" />
          <div className="pl-2">Bookstore</div>
        </NextLink>
      </div>
      <div className="navbar-end flex">
        {/* {role === "owner" && (
          <div className="indicator flex" onClick={() => {}}>
            <PlusIcon className="w-6 h-6 hover:text-green-300 mr-2 cursor-pointer" />
          </div>
        )} */}
        <NextLink href="/auth" className="btn">
          <div className="indicator flex">
            <PowerIcon
              className="w-6 h-6 hover:text-green-300 mr-2"
              onClick={() => {
                localStorage.clear();
                enqueueSnackbar("Logged Out Successfully", {
                  variant: "success",
                });
              }}
            />
          </div>
        </NextLink>
        <NextLink href="/cart" className="btn">
          <div className="indicator flex relative">
            <ShoppingCartIcon className="w-6 h-6 hover:text-green-300" />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
              {cartItems?.items?.length}
            </span>
            {/* <span className="badge badge-sm indicator-item">
              {calcCartItemSum(shoppingCart)}
            </span> */}
          </div>
        </NextLink>
      </div>
    </div>
  );
};

export default Header;
