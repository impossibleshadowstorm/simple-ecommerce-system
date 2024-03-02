"use client";
import React, { useState } from "react";
import Head from "next/head";
import CommonLayout from "@layout";
import BookList from "@components/shopping-item-card-list";
import ProtectedRoute from "@utils/protected-route";
import { useGetAllBooksQuery } from "@redux/services/books-api";

const Home = () => {
  const [filters, setFilters] = useState("all");
  const {
    data: books,
    error,
    isLoading,
  } = useGetAllBooksQuery(filters == "all" ? {} : { type: filters });

  const handleFilters = (item) => {
    console.log(item);
    setFilters(item);
  };

  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name="description" content="Bookstore Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        {/* Create filter component here */}
        <div className="flex">
          {["all", "Science", "magazine", "sports"].map((item, index) => {
            return (
              <div
                className={`px-8 rounded-lg py-1 cursor-pointer ${
                  filters === item ? "bg-green-300" : "bg-transparent"
                }`}
                key={index}
                onClick={() => handleFilters(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <BookList booksList={books} error={error} isLoading={isLoading} />
      </CommonLayout>
    </>
  );
};

export default ProtectedRoute(Home);
