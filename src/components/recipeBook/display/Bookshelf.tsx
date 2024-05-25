import { useEffect, useMemo, useState } from "react";

import BookCover from "@/components/recipeBook/display/BookCover";
import { RecipeBook } from "@/__generated__/graphql";
import { SkeletonCover } from "./SkeletonCover";
import { USER_BOOKS } from "@/graphql/queries/recipeBook";
import { useLazyQuery } from "@apollo/client";

export function Bookshelf() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [bookList, setList] = useState<RecipeBook[]>([]);
  const itemsPerPage = 6;
  const scrollOffset = 200;

  const [getData, { loading, error }] = useLazyQuery(USER_BOOKS, {
    onCompleted: response => {
      console.log(response);
      const newBooks = response.userBooks;
      if (newBooks.length > 0) {
        setList(prevList => {
          // Create a Set to filter out duplicates based on the book id
          const uniqueBooks = new Set(prevList.map(book => book.id));
          const filteredNewBooks = newBooks.filter(
            book => !uniqueBooks.has(book.id)
          );
          return [...prevList, ...filteredNewBooks];
        });
        setHasMore(newBooks.length === itemsPerPage);
      } else {
        setHasMore(false);
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
        hasMore &&
        !loading
      ) {
        console.log("Fetching more data");
        getData({
          variables: {
            skip: currentPage * itemsPerPage,
            take: itemsPerPage
          }
        });
        setCurrentPage(prevPage => prevPage + 1);
      }
    }, 50);
  }, [hasMore, getData, currentPage, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const columnConfigurations = [[1], [2, 2]];

  if (error) {
    console.log(error);
    return <div className="fixed inset-0">{error.message}</div>;
  }

  if (loading && bookList.length === 0) {
    return <SkeletonCover />;
  }

  console.log(bookList);

  return (
    <div className="z-0 mt-12 box-border grid w-full gap-8 overflow-auto shadow-xl lg:grid-cols-2">
      {columnConfigurations.map((columns, index) =>
        columns.map((num, columnIndex) => (
          <div
            key={`${index}-${columnIndex}`}
            className={`col-span-1 justify-items-center w-full ${
              index === 0 ? "grid lg:hidden" : ""
            } ${index === 1 ? "hidden lg:grid" : ""}`}
          >
            {bookList
              .filter((_, i) => i % num === columnIndex)
              .map((book, index) => (
                <BookCover key={book.id + index} book={book} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}
