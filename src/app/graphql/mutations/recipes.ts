import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $createRecipeInput) {
      name
      createdAt
      build {
        buildName
        createdAt
        ice
      }
    }
  }
`;

export const ADD_BUILD = gql`
  mutation Mutation($createBuildInput: CreateBuildInput) {
    createBuild(createBuildInput: $createBuildInput) {
      buildName
      ice
      id
      instructions
      notes
      permission
      recipe {
        name
      }
      touch {
        amount
        order
        unit
        version
        id
        ingredient {
          name
        }
      }
    }
  }
`;
