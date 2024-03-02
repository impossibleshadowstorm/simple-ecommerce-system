"use client";
import CommonLayout from "@/layout";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  checkoutCart,
  deleteFromCart,
} from "@/redux/features/cart-actions";
import { useSnackbar } from "notistack";
import ProtectedRoute from "@/utils/protected-route";

const Page = () => {
  const cartItems = useSelector((state) => {
    return state?.cart;
  });
  const { enqueueSnackbar } = useSnackbar();

  const renderSingleProduct = (item, index) => {
    return (
      <div key={index} className="shadow-xl flex flex-col gap-4 py-4">
        <div className="div bg-[#1D232A] flex rounded-2xl">
          <div className="img w-[230px] h-[304px] relative">
            <Image
              src={`https://picsum.photos/seed/${item?.item?.title}/200/350`}
              alt="book"
              fill
              className="rounded-l-2xl"
            />
          </div>

          <div className="card-body p-8 w-[100%]">
            <div className="details">
              <p className="text-[#adadba] text-sm">
                <span className="text-lg font-bold pr-4 mb-1">Title:</span>
                {item?.item?.title}
              </p>
              <p className="text-[#adadba] text-sm">
                <span className="text-lg font-bold pr-4 mb-1">Type:</span>
                {item?.item?.type}
              </p>
              <p className="text-[#adadba] text-sm">
                <span className="text-lg font-bold pr-4 mb-1">Price:</span>${" "}
                {item?.item?.price}
              </p>
              <p className="text-[#adadba] text-sm">
                <span className="text-lg font-bold pr-4 mb-1">In stock:</span>
                {item?.item?.sku}
              </p>
              <div />
              <div className="flex justify-between items-center mt-3 ">
                <div className="join rounded-md bg-[#191e24] p-1 flex justify-around items-center w-28">
                  <div
                    className="btn btn-sm join-item h-5 w-5 text-[#adadba] cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToCart(item?.item));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                  <input
                    className="input input-sm input-bordered join-item w-8 px-3 bg-[#191e24] text-[#adadba]"
                    disabled
                    value={item?.count.toString()}
                  />
                  <div
                    className="btn btn-sm join-item text-[#adadba] cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(item?.item?._id);
                      dispatch(deleteFromCart(item?.item?._id));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="stroke-current shrink-0 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <div className="font-bold">
                    <span className="pr-1">$</span>
                    {item?.item?.price * item?.count}
                  </div>
                </div>
              </div>
            </div>
            <div className="btns"></div>
          </div>
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(checkoutCart());
    enqueueSnackbar("Purchase Successful", { variant: "success" });
  };
  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name="description" content="Bookstore Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className="py-4">
          <div className="title font-bold text-4xl text-[#a6adba] mb-4">
            <h1>Shopping Cart</h1>
          </div>
          {cartItems?.items?.map((item, index) => {
            return renderSingleProduct(item, index);
          })}

          {cartItems?.items?.length > 0 ? (
            <div className="flex flex-col justify-center items-end gap-4 mr-4 mt-8">
              <div className="flex w-[15%] justify-between text-green-300 font-semibold text-md">
                <span className="">Total: </span>
                {cartItems?.items?.reduce((prev, item) => {
                  const qty = item?.count;
                  const unitPrice = parseFloat(item?.item?.price);
                  const total = qty * unitPrice;
                  return prev + total;
                }, 0)}
              </div>
              <div className="btn-purchase hover:bg-green-200 bg-green-300 px-3 py-2 rounded-md text-[#002b3d] w-fit">
                <button
                  className="btn btn-sm btn-info text-sm font-medium"
                  onClick={handleCheckout}
                >
                  PROCEED TO PURCHASE{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[80vh] flex item-center justify-center">
              Please Add items to cart
            </div>
          )}
        </div>
      </CommonLayout>
    </>
  );
};

export default ProtectedRoute(Page);
