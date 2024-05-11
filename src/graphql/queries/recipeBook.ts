import { TypedDocumentNode, gql } from "@apollo/client";

import { RecipeBook } from "@/__generated__/graphql";

export const USER_RECIPEBOOKS: TypedDocumentNode<{
  userRecipeBooks: RecipeBook[];
}> = gql`
  query UserRecipeBooks {
    userRecipeBooks {
      id
      name
      description
      permission
      build {
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
