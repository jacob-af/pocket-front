import { Ingredient } from "@/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

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
