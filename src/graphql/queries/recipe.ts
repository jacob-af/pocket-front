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

export const GET_ONE_BUILD: TypedDocumentNode<{ findOneBuild: Build }> = gql`
  query FindOneBuild($recipeName: String!, $buildName: String!) {
    findOneBuild(recipeName: $recipeName, buildName: $buildName) {
      id
      buildName
      instructions
      ice
      glassware
      recipe {
        id
        name
        about
      }
      createdBy {
        id
        userName
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
`;

export const USER_RECIPES: TypedDocumentNode<{ recipes: Recipe[] }> = gql`
  query USER_RECIPES {
    recipes {
      id
      name
      userBuild {
        id
        buildName
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

export const LAZY_RECIPES: TypedDocumentNode<{ recipes: Recipe[] }> = gql`
  query Recipes($skip: Int, $take: Int) {
    recipes(skip: $skip, take: $take) {
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
          }
          amount
          unit
          order
        }
      }
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
