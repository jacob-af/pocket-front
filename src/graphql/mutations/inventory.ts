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
