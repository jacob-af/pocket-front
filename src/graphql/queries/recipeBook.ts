import { RecipeBook, UserBookPermission } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const USER_BOOKS: TypedDocumentNode<{
  userBooks: RecipeBook[];
}> = gql`
  query UserBooks {
    userBooks {
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
        buildName
        recipe {
          id
          name
        }
      }
    }
  }
`;

export const USER_BOOK_LIST: TypedDocumentNode<{
  userBookList: RecipeBook[];
}> = gql`
  query UserBookList {
    userBookList {
      id
      name
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

export const GET_RECIPE_BOOK: TypedDocumentNode<{
  book: RecipeBook;
}> = gql`
  query book($name: String) {
    book(name: $name) {
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
          Unit {
            id
            abbreviation
          }
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
