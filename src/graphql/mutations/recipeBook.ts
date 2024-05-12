import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation Mutation($name: String!, $description: String) {
    createRecipeBook(name: $name, description: $description) {
      id
      name
      description
      permission
      build {
        id
      }
    }
  }
`;

export const ADD_BUILD_TO_BOOK = gql`
  mutation AddBuildToRecipeBook(
    $recipeBookId: String!
    $buildId: String!
    $buildPermission: Permission!
    $bookPermission: Permission!
  ) {
    addBuildToRecipeBook(
      recipeBookId: $recipeBookId
      buildId: $buildId
      buildPermission: $buildPermission
      bookPermission: $bookPermission
    ) {
      message
    }
  }
`;

export const REMOVE_BUILD_FROM_BOOK = gql`
  mutation RemoveBuild(
    $recipeBookId: String!
    $buildId: String!
    $bookPermission: Permission!
  ) {
    removeBuildFromRecipeBook(
      recipeBookId: $recipeBookId
      buildId: $buildId
      bookPermission: $bookPermission
    ) {
      message
    }
  }
`;
