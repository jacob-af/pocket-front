import { RecipeBook, UserBookPermission } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const USER_RECIPEBOOKS: TypedDocumentNode<{
  userRecipeBooks: RecipeBook[];
}> = gql`
  query UserRecipeBooks {
    userRecipeBooks {
      id
      name
      description
      permission
      createdBy {
        id
        userName
      }
      build {
        id
        # createdBy {
        #   id
        #   userName
        # }
        buildName
        recipe {
          id
          name
        }
        # instructions
        # ice
        # glassware
        # permission
        # touch {
        #   id
        #   ingredient {
        #     id
        #     name
        #     description
        #   }
        #   amount
        #   unit
        #   order
        # }
      }
    }
  }
`;

export const BOOK_PERMISSIONS: TypedDocumentNode<{
  findFolloweddUsersBookPermission: UserBookPermission[];
}> = gql`
  query bookPermission($recipeBookId: String!) {
    findFolloweddUsersBookPermission(recipeBookId: $recipeBookId) {
      permission
      user {
        id
        userName
      }
    }
  }
`;

export const GET_RECIPE_BOOK = gql`
  query getRecipeBook($name: String) {
    recipeBook(name: $name) {
      id
      name
      description
      permission
      createdBy {
        id
        userName
      }
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
