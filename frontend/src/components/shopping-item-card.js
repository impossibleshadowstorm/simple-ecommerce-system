"use client";
import React from "react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { currencyFormat } from "@/common/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart-actions";

export default function ShoppingItemCard(props) {
  const { id, title, type, price, author, rating, sku } = props;
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state?.cartReducer);

  const handleCartAdd = () => {
    dispatch(addToCart(props));
    enqueueSnackbar("Added to Cart Successfully", { variant: "success" });
  };

  return (
    <div className="w-96 bg-[#1D232A] px-0 rounded-2xl pb-8 shadow-xl">
      <figure>
        <Image
          src={`https://picsum.photos/seed/${title}/384/140`}
          alt={title}
          width={384}
          height={140}
          className="rounded-t-2xl"
        />
      </figure>
      <div className="pt-4 px-4">
        <div className="text-sm text-green-100 leading-5 mb-2">
          {" "}
          {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
        </div>
        <h2 className="card-title text-lg font-semibold text-slate-300 mb-2">
          {title}
        </h2>
        <p className=" text-xs font-medium text-slate-200 mb-2">
          {/* {authors.map((author) => author.author.name).join(`, `)} */}
          {author}
        </p>

        <div className="flex items-center mb-4">
          <svg
            className="w-4 h-4 text-green-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-green-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-green-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-green-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>

        <div className="card-actions justify-end float-left  w-full flex ">
          <button
            className="btn rounded-md	bg-[#191e24] text-[#a6adba] p-3 flex text-sm  font-medium hover:text-green-300"
            onClick={handleCartAdd}
          >
            ${currencyFormat(price)}
            <ShoppingCartIcon
              className="h-6 w-6 ml-2"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
