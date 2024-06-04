import { TypedDocumentNode, gql } from "@apollo/client";

import { Ingredient } from "@/__generated__/graphql";

export const ALL_INGREDIENTS: TypedDocumentNode<{
  ingredients: Ingredient[];
}> = gql`
  query Ingredients {
    ingredients {
      id
      description
      name
    }
  }
`;

export const STOCK_LIST: TypedDocumentNode<{ stockList: Ingredient[] }> = gql`
  query stockList($inventoryId: String) {
    stockList(inventoryId: $inventoryId) {
      id
      description
      name
      pricePerOunce
    }
  }
`;
