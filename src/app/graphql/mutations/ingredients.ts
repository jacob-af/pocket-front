import { gql } from "@apollo/client";

export const ADD_MANY_INGREDIENTS = gql`
  mutation CreateManyIngredients(
    $createManyIngredientInputs: [CreateIngredientInput]!
  ) {
    createManyIngredients(
      createManyIngredientInputs: $createManyIngredientInputs
    ) {
      message
    }
  }
`;
