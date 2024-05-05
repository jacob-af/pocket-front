import { Build, UserBuildPermission } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

import { ListItem } from "@/types/util";

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
