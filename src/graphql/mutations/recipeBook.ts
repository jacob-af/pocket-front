import { TypedDocumentNode, gql } from "@apollo/client";

import { Build } from "@/__generated__/graphql";

export const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $description: String) {
    createRecipeBook(name: $name, description: $description) {
      id
      name
      description
      permission
      userBuild {
        id
      }
    }
  }
`;

export const EDIT_BOOK = gql`
  mutation UpdateRecipeBook(
    $id: String!
    $name: String!
    $permission: Permission!
  ) {
    updateRecipeBook(id: $id, name: $name, permission: $permission) {
      userBuild {
        recipe {
          id
          name
        }
        id
        buildName
        touch {
          id
        }
      }
      createdBy {
        id
        userName
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation RemoveRecipeBook($id: String!, $permission: Permission!) {
    removeRecipeBook(id: $id, permission: $permission) {
      message
    }
  }
`;

export const ADD_BUILD_TO_BOOK: TypedDocumentNode<{
  addBuildToRecipeBook: Build;
}> = gql`
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
      buildName
      ice
      id
      image
      instructions
      notes
      permission
      recipe {
        name
      }
      touch {
        id
        amount
        order
        #unit
        unit {
          id
          abbreviation
        }
        version
        ingredient {
          id
          name
        }
      }
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

export const CHANGE_BOOK_PERMISSION = gql`
  mutation ChangeRecipeBookPermission(
    $userId: String!
    $recipeBookId: String!
    $userPermission: Permission
    $desiredPermission: Permission
  ) {
    changeRecipeBookPermission(
      userId: $userId
      recipeBookId: $recipeBookId
      userPermission: $userPermission
      desiredPermission: $desiredPermission
    ) {
      status {
        message
      }
    }
  }
`;

export const REMOVE_BOOK_PERMISSION = gql`
  mutation RemoveRecipeBookPermission(
    $userId: String!
    $recipeBookId: String!
    $permission: Permission
  ) {
    removeRecipeBookPermission(
      userId: $userId
      recipeBookId: $recipeBookId
      permission: $permission
    ) {
      message
    }
  }
`;

export const UPLOAD_BOOK = gql`
  mutation uploadBook(
    $bookId: String!
    $updateManyBuildInput: [UpdateBuildInput]!
  ) {
    uploadBook(bookId: $bookId, updateManyBuildInput: $updateManyBuildInput) {
      message
    }
  }
`;
