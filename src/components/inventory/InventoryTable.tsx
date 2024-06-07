"use client";

import { useEffect, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import { FIND_MANY_STOCKS } from "@/graphql/queries/inventory";
import { Stock } from "@/__generated__/graphql";
import { selectedInventory } from "@/graphql/reactiveVar/inventory";

export function InventoryTable() {
  const inventory = useReactiveVar(selectedInventory);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [stockList, setList] = useState<Stock[]>([]);
  const itemsPerPage = 25;

  const [getData, { loading, error }] = useLazyQuery(FIND_MANY_STOCKS, {
    onCompleted: response => {
      const stocks = response.findManyStocks;
      if (stocks.length > 0) {
        setList(stocks);
        setHasMore(stocks.length === itemsPerPage);
      }
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (inventory.id !== "") {
      console.log(inventory.id);
      getData({
        variables: {
          inventoryId: inventory.id,
          skip: 0,
          take: itemsPerPage
        }
      });
    }
  }, [getData, inventory]);

  const handleNextPage = () => {
    const skip = (currentPage + 1) * itemsPerPage - itemsPerPage;
    getData({
      variables: {
        skip,
        take: itemsPerPage
      }
    });
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const skip = (currentPage - 1) * itemsPerPage - itemsPerPage;
      getData({
        variables: {
          skip,
          take: itemsPerPage
        }
      });
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex justify-between">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!hasMore}>
          Next
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border-b py-3 text-left text-xs font-medium uppercase tracking-wider lg:px-6">
                Ingredient Name
              </th>
              <th className="border-b py-3 text-left text-xs font-medium uppercase tracking-wider lg:px-6">
                Price
              </th>
              <th className="border-b py-3 text-left text-xs font-medium uppercase tracking-wider lg:px-6">
                Amount
              </th>
              <th className="border-b py-3 text-left text-xs font-medium uppercase tracking-wider lg:px-6">
                Unit
              </th>
              <th className="border-b py-3 text-right text-xs font-medium uppercase tracking-wider lg:px-6">
                Price Per Ounce
              </th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((stock, index) => (
              <tr key={index}>
                <td className="border-b py-4 text-left lg:px-6">
                  {stock.ingredient?.name}
                </td>
                <td className="border-b py-4 lg:px-6">
                  {stock.price !== null && stock.price !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(stock.price)
                    : ""}
                </td>
                <td className="border-b py-4 text-right lg:px-6">
                  {stock.amount}
                </td>
                <td className="border-b py-4 lg:px-6">
                  {stock.unit?.abbreviation}
                </td>
                <td className="border-b py-4 pr-2 text-right lg:px-6 lg:pr-0">
                  {stock.pricePerOunce !== null &&
                  stock.pricePerOunce !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(stock.pricePerOunce)
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!hasMore}>
          Next
        </button>
      </div>
    </div>
  );
}
