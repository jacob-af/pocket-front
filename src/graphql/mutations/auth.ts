import { TypedDocumentNode, gql } from "@apollo/client";

import { AuthPayload } from "@/__generated__/graphql";

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
      user {
        id
        userName
        email
        profile {
          image
        }
      }
    }
  }
`;

export const SIGNUP: TypedDocumentNode<AuthPayload> = gql`
  mutation Signup($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      accessToken
      refreshToken
      user {
        email
        id
        userName
      }
    }
  }
`;

export const GOOGLE_SIGNIN = gql`
  mutation GoogleSignIn(
    $googleUserId: String!
    $email: String!
    $name: String!
    $accessToken: String!
    $tokenExpiry: DateTime!
  ) {
    googleSignIn(
      googleUserId: $googleUserId
      email: $email
      name: $name
      accessToken: $accessToken
      tokenExpiry: $tokenExpiry
    ) {
      accessToken
      refreshToken
      user {
        id
        userName
        email
        profile {
          image
        }
      }
    }
  }
`;

export const NEW_TOKENS: TypedDocumentNode<{ getNewTokens: AuthPayload }> = gql`
  mutation GetTokens($refreshToken: String!) {
    getNewTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      user {
        email
        id
        userName
        profile {
          image
        }
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation LogOut($userId: ID!) {
    logout(userId: $userId) {
      loggedOut
    }
  }
`;
