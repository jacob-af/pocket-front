import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

import { RecipeBook } from "@/__generated__/graphql";
import { USER_BOOKS } from "@/graphql/queries/recipeBook";

export function useBookshelf(itemsPerPage: number, scrollOffset: number) {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [bookList, setList] = useState<RecipeBook[]>([]);

  const [getData, { loading, error }] = useLazyQuery(USER_BOOKS, {
    onCompleted: response => {
      const newBooks = response.userBooks;
      if (newBooks.length > 0) {
        setList(prevList => {
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
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  }, [getData, itemsPerPage]);

  const handleScroll = useMemo(() => {
    const debounce = (func: () => void, wait: number): (() => void) => {
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
        getData({
          variables: {
            skip: currentPage * itemsPerPage,
            take: itemsPerPage
          }
        });
        setCurrentPage(prevPage => prevPage + 1);
      }
    }, 50);
  }, [hasMore, getData, currentPage, loading, scrollOffset, itemsPerPage]);

  const handleRefresh = () => {
    console.log("handleRefresh");
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    bookList,
    loading,
    error,
    handleScroll,
    handleRefresh
  };
}
