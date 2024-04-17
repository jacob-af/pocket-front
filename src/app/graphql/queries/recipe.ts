import { Recipe } from "@/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const USER_RECIPES: TypedDocumentNode<{
  usersBuilds: Recipe[];
}> = gql`
  query userBuilds {
    usersBuilds {
      id
      name
      about
      build {
        buildName
        glassware
        ice
        instructions
        touch {
          id
          amount
          unit
          ingredient {
            id
            name
            description
          }
          order
        }
      }
    }
  }
`;
