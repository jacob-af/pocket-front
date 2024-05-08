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
          id
          amount
          order
          unit
          version
          ingredient {
            id
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
      id
      buildName
      ice
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
        unit
        version
        ingredient {
          id
          name
        }
      }
    }
  }
`;

export const EDIT_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {
    updateRecipe(updateRecipeInput: $updateRecipeInput) {
      id
      name
      about
      build {
        id
        buildName
        ice
        glassware
        instructions
        recipe {
          name
        }
        touch {
          id
          amount
          unit
          version
          ingredient {
            id
            name
          }
          order
        }
      }
    }
  }
`;

export const EDIT_BUILD = gql`
  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {
    updateBuild(updateBuildInput: $updateBuildInput) {
      build {
        id
        buildName
        glassware
        ice
        instructions
        permission
        recipe {
          name
        }
        touch {
          id
          ingredient {
            id
            name
          }
          order
          unit
          amount
        }
      }
    }
  }
`;

export const DELETE_BUILD = gql`
  mutation Mutation($buildId: String, $permission: Permission) {
    removeBuild(buildId: $buildId, permission: $permission) {
      id
      buildName
      instructions
      recipe {
        id
        name
        about
      }
      touch {
        id
        amount
        unit
        ingredient {
          name
          id
        }
        order
      }
      permission
      ice
      glassware
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
