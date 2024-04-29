import { gql } from "@apollo/client";

export const ADD_FOLLOW = gql`
  mutation Follow($followId: String!, $relationship: Relationship) {
    followUser(followId: $followId, relationship: $relationship) {
      message
    }
  }
`;

export const UN_FOLLOW = gql`
  mutation unFollow($unfollowId: String!) {
    unFollowUser(unfollowId: $unfollowId) {
      message
    }
  }
`;
