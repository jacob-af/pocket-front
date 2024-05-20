"use client";

import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_DATA = gql`
  query GetData($skip: Int, $take: Int) {
    recipes(skip: $skip, take: $take) {
      id
      name
    }
  }
`;

interface Recipe {
  id: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [data, setData] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [uniqueItems, setUniqueItems] = useState(new Set());

  const [getData, { loading, error }] = useLazyQuery(GET_DATA, {
    onCompleted: response => {
      const newItems = response.recipes.filter(
        (item: Recipe) => !uniqueItems.has(item.id)
      );
      setData(prevData => [...prevData, ...newItems]);
      newItems.forEach((item: Recipe) => uniqueItems.add(item.id));
      setHasMore(response.recipes.length === itemsPerPage);
    }
  });

  useEffect(() => {
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  }, [getData, itemsPerPage]);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        if (
          window.innerHeight + scrollTop >=
          document.documentElement.offsetHeight
        ) {
          if (hasMore) {
            getData({
              variables: {
                skip: currentPage * itemsPerPage,
                take: itemsPerPage
              }
            });
            setCurrentPage(prevPage => prevPage + 1);
          }
        }
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, getData, currentPage, itemsPerPage]);

  return (
    <div className="mr-40 mt-40 overflow-y-scroll">
      place
      {data.map((item, index) => (
        <div className="h-20" key={item.id + index}>
          {item.name}
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
    </div>
  );
}
