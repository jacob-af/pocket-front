import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $createRecipeInput) {
      name
      createdAt
      build {
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
  }
`;

export const ADD_BUILD = gql`
  mutation AddBuild($createBuildInput: CreateBuildInput) {
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

export const CHANGE_BUILD_PERMISSION = gql`
  mutation ChangeBuildPermission(
    $changeBuildPermissionInput: ChangeBuildPermissionInput
  ) {
    changeBuildPermission(
      changeBuildPermissionInput: $changeBuildPermissionInput
    ) {
      status {
        message
      }
    }
  }
`;

export const REMOVE_BUILD_PERMISSION = gql`
  mutation RemoveBuildPermission(
    $changeBuildPermissionInput: ChangeBuildPermissionInput
  ) {
    deleteBuildPermission(
      changeBuildPermissionInput: $changeBuildPermissionInput
    ) {
      status {
        message
      }
    }
  }
`;
