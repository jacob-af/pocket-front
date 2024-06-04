import { Inventory, Stock } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const USER_INVENTORIES: TypedDocumentNode<{
  userInventory: Inventory[];
}> = gql`
  query UserInventory {
    userInventory {
      id
      name
      description
    }
  }
`;

export const FIND_MANY_STOCKS: TypedDocumentNode<{
  findManyStocks: Stock[];
}> = gql`
  query FindManyStocks($skip: Int, $take: Int) {
    findManyStocks(skip: $skip, take: $take) {
      ingredient {
        name
      }
      price
      amount
      unit {
        abbreviation
      }
      pricePerOunce
    }
  }
`;
