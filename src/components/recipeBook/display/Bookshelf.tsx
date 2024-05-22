import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import BookCover from "@/components/recipeBook/display/BookCover";
import { RecipeBook } from "@/__generated__/graphql";
import { USER_BOOKS } from "@/graphql/queries/recipeBook";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export function Bookshelf() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [bookList, setList] = useState<RecipeBook[]>([]);
  const itemsPerPage = 3;
  const scrollOffset = 200;

  const [getData, { loading, error }] = useLazyQuery(USER_BOOKS, {
    onCompleted: response => {
      console.log("Data fetched");
      const newBooks = response.userRecipeBooks;
      if (newBooks.length > 0) {
        setList(value => [...value, ...newBooks]);
        setHasMore(newBooks.length === itemsPerPage);
      }
    }
  });

  useEffect(() => {
    console.log("Fetching initial data");
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  }, [getData]);

  type CallbackFunction = () => void;

  const handleScroll = useMemo(() => {
    const debounce = (
      func: CallbackFunction,
      wait: number
    ): CallbackFunction => {
      let timeout: NodeJS.Timeout;
      return function executedFunction() {
        const later = () => {
          clearTimeout(timeout);
          func();
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    return debounce(() => {
      const scrollTop = document.documentElement.scrollTop;
      if (
        window.innerHeight + scrollTop + scrollOffset >=
          document.documentElement.offsetHeight &&
        hasMore
      ) {
        console.log("Fetching more data");
        getData({
          variables: {
            skip: currentPage * itemsPerPage,
            take: itemsPerPage
          }
        });
        setCurrentPage((prevPage: number) => prevPage + 1);
      }
    }, 50);
  }, [hasMore, getData, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="z-0 mt-12 box-border grid w-full gap-8 overflow-auto shadow-xl md:grid-cols-2 xl:grid-cols-3">
      {columnConfigurations.map((columns, index) =>
        // Create a div for each column configuration
        columns.map((num, columnIndex) => (
          <div
            key={`${index}-${columnIndex}`}
            //
            className={`col-span-1 justify-items-center w-full ${
              index === 0 ? "grid md:hidden" : ""
            } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
              index === 2 ? "hidden xl:grid" : ""
            }`}
          >
            {bookList
              .filter((_, i) => i % num === columnIndex)
              .map(book => (
                <BookCover key={book.id} book={book} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}
