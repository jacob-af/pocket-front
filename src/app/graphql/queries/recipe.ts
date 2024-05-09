import { Build, Recipe, UserBuildPermission } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

import { ListItem } from "@/types/util";

export const GET_RECIPE: TypedDocumentNode<{
  recipe: Recipe;
}> = gql`
  query getRecipe($name: String!) {
    recipe(name: $name) {
      id
      name
      about
      userBuild {
        id
        createdBy {
          id
          userName
        }
        buildName
        recipe {
          id
          name
        }
        instructions
        ice
        glassware
        permission
        touch {
          id
          ingredient {
            id
            name
            description
          }
          amount
          unit
          order
        }
      }
    }
  }
`;

export const USER_BUILDS: TypedDocumentNode<{
  usersBuilds: Build[];
}> = gql`
  query userBuilds {
    usersBuilds {
      id
      buildName
      glassware
      ice
      instructions
      permission
      recipe {
        id
        name
        about
        createdBy {
          id
          userName
        }
      }
      touch {
        id
        amount
        unit
        order
        ingredient {
          id
          name
          description
        }
      }
    }
  }
`;

export const USER_RECIPES: TypedDocumentNode<{ userRecipe: Recipe[] }> = gql`
  query Query {
    userRecipe {
      id
      name
      about
      createdBy {
        id
        userName
      }
      userBuild {
        id
        buildName
        instructions
        ice
        glassware
        permission
        createdBy {
          id
          userName
        }
        recipe {
          id
          name
        }
        touch {
          id
          ingredient {
            id
            name
            description
          }
          amount
          unit
          order
        }
      }
    }
  }
`;

export const RECIPES_AND_INGREDIENTS: TypedDocumentNode<{
  recipeList: ListItem[];
  ingredients: ListItem[];
}> = gql`
  query RecipeList {
    recipeList {
      id
      name
    }
    ingredients {
      id
      name
    }
  }
`;

export const BUILD_PERMISSIONS: TypedDocumentNode<{
  findFolloweddUsersBuildPermission: UserBuildPermission[];
}> = gql`
  query FindFolloweddUsersBuildPermission($buildId: String!) {
    findFolloweddUsersBuildPermission(buildId: $buildId) {
      permission
      user {
        userName
        id
      }
    }
  }
`;
