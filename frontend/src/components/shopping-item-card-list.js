import React from "react";
import ShoppingItemCard from "@/components/shopping-item-card";

export default function BookList(props) {
  const { booksList, error, isLoading } = props;

  // const bookList = [
  //   {
  //     id: 1,
  //     title: " Dreatest Love of All",
  //     type: "Education & Refrence",
  //     price: "22",
  //     averageRating: 0,
  //     authors: [{ author: { name: "Dianne Ondricka" } }],
  //     ratings: 4,
  //     stock: 34,
  //   },
  //   {
  //     id: 2,
  //     title: "The Power of Love",
  //     type: "Novel",
  //     price: "69.02",
  //     averageRating: 0,
  //     authors: [{ author: { name: "Micheal Tromp" } }],
  //     ratings: 4,
  //     stock: 34,
  //   },
  //   {
  //     id: 3,
  //     title: "Unchained Melody",
  //     type: "Science & Technology",
  //     price: "13",
  //     averageRating: 0,
  //     authors: [{ author: { name: "Lynn Gulgowski" } }],
  //     ratings: 4,
  //     stock: 34,
  //   },
  //   {
  //     id: 4,
  //     title: "Higher Love",
  //     type: "Humanities & Social Sciences",
  //     price: "1",
  //     averageRating: 0,
  //     authors: [{ author: { name: "Dr. Lindsey Welch II" } }],
  //     ratings: 4,
  //     stock: 34,
  //   },
  // ];

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

  // switch (bookListLoadable.state) {
  //   case "hasValue":
  //     setHomePageBookSum(bookListLoadable.contents.total);
  //     return (
  //       <>
  //         {!!homePageBookSum && (
  //           <div className="text-sm text-gray-500 pb-4">{`${
  //             pageSize * (page - 1) + 1
  //           } ~ ${
  //             pageSize * page > homePageBookSum
  //               ? homePageBookSum
  //               : pageSize * page
  //           } of over ${homePageBookSum} results`}</div>
  //         )}
  //         <div className="grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
  //           {bookListLoadable.contents.content.map((book) => (

  //           ))}
  //         </div>
  //       </>
  //     );
  //   case "loading":
  //     return (
  //       <div className="flex items-center justify-center">
  //         <span className="loading loading-bars loading-lg"></span>
  //       </div>
  //     );
  //   case "hasError":
  //     throw bookListLoadable.contents;
  //   default:
  //     return null;
  // }
}
