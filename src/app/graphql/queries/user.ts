import { User, Ingredient } from "@/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const ALL_USERS: TypedDocumentNode<{ allUsers: User[] }> = gql`
  query AllUsers {
    allUsers {
      id
      userName
      email
    }
  }
`;

export const ALL_RELATIONS: TypedDocumentNode<{
  allUsers: User[];
  findFollowers: User[];
  findFollows: User[];
}> = gql`
  query allRelations {
    allUsers {
      id
      userName
      email
    }
    findFollowers {
      userName
      id
      email
    }
    findFollows {
      userName
      id
      email
    }
  }
`;
