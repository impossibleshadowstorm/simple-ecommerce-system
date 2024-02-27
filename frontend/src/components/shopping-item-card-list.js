import React from "react";
import ShoppingItemCard from "@/components/shopping-item-card";

export default function BookList(props) {
  const { booksList, error, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <div className="min-h-[80vh] flex items-center font-bold text-green-300 justify-center w-100">
          Loading...
        </div>
      ) : error ? (
        <div className="min-h-[80vh] flex items-center font-bold text-green-300 justify-center w-100">
          Error Fetching Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 my-12">
          {booksList?.books?.map((book, index) => {
            return <ShoppingItemCard key={index} {...book} />;
          })}
        </div>
      )}
    </>
  );
}
