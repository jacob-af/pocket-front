import { TypedDocumentNode, gql } from "@apollo/client";

import { Profile } from "@/__generated__/graphql";

export const GET_PROFILE_BOOK: TypedDocumentNode<{ getProfile: Profile }> = gql`
  query GetProfile {
    getProfile {
      preferredBook {
        id
        name
        userBuild {
          buildName
          glassware
          ice
          id
          image
          instructions
          notes
          permission
          recipe {
            name
            about
          }
          touch {
            id
            amount
            order
            unit {
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
  }
`;
