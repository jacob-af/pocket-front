import { Build, ListItem } from "@/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

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
      recipe {
        id
        name
        about
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
