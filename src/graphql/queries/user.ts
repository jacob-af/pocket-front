import { Ingredient, User, UserRelation } from "@/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

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
  getUserRelationships: UserRelation[];
}> = gql`
  query getRelations {
    getUserRelationships {
      id
      userName
      following
      followedBy
    }
  }
  #query allRelations {
  # allUsers {
  #   id
  #   userName
  #   email
  # }
  # findFollowers {
  #   userName
  #   id
  #   email
  # }
  # findFollows {
  #   userName
  #   id
  #   email
  # }
  #}
`;
