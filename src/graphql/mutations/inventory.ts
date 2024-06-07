import { gql } from "@apollo/client";

export const CREATE_MANY_STOCKS = gql`
  mutation CreateManyStocks(
    $createManyStocks: [CreateStockInput]
    $inventoryId: String
  ) {
    createManyStocks(
      createManyStocks: $createManyStocks
      inventoryId: $inventoryId
    ) {
      message
    }
  }
`;

export const CREATE_STOCK = gql`
  mutation createStock($createStock: CreateStockInput, $inventoryId: String) {
    createStock(createStock: $createStock, inventoryId: $inventoryId) {
      amount
    }
  }
`;
