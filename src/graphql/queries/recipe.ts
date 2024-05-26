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
        image
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
          #unit
          Unit {
            id
            abbreviation
          }
          order
        }
      }
    }
  }
`;

export const PUBLIC_RECIPE: TypedDocumentNode<{
  publicRecipe: Recipe;
}> = gql`
  query publicRecipe($name: String!) {
    publicRecipe(name: $name) {
      id
      name
      about
      publicBuild {
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
        image
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
          #unit
          Unit {
            id
            abbreviation
          }
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
      glassware
      ice
      image
      permission
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
        #unit
        Unit {
          id
          abbreviation
        }
        order
      }
    }
  }
`;

export const USER_RECIPE_LIST: TypedDocumentNode<{
  userRecipeList: Recipe[];
}> = gql`
  query UserRecipeList {
    userRecipeList {
      id
      name
      userBuild {
        id
        buildName
        permission
      }
    }
  }
`;
export const PUBLIC_RECIPE_LIST: TypedDocumentNode<{
  publicRecipeList: Recipe[];
}> = gql`
  query PublicRecipeList {
    publicRecipeList {
      id
      name
      publicBuild {
        id
        buildName
      }
    }
  }
`;

export const RECIPES_AND_INGREDIENTS: TypedDocumentNode<{
  publicRecipeList: ListItem[];
  ingredients: ListItem[];
}> = gql`
  query RecipeList {
    publicRecipeList {
      id
      name
    }
    ingredients {
      id
      name
    }
  }
`;

export const USER_RECIPES: TypedDocumentNode<{ userRecipes: Recipe[] }> = gql`
  query userRecipes($skip: Int, $take: Int) {
    userRecipes(skip: $skip, take: $take) {
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
        image
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
          #unit
          Unit {
            id
            abbreviation
          }
          order
        }
      }
    }
  }
`;
export const PUBLIC_RECIPES: TypedDocumentNode<{
  publicRecipes: Recipe[];
}> = gql`
  query PublicRecipes($skip: Int, $take: Int) {
    publicRecipes(skip: $skip, take: $take) {
      id
      name
      about
      createdBy {
        id
        userName
      }
      publicBuild {
        id
        buildName
        instructions
        ice
        image
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
          #unit
          Unit {
            id
            abbreviation
          }
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
