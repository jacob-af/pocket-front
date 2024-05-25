import { TypedDocumentNode, gql } from "@apollo/client";

import { Unit } from "@/__generated__/graphql";

export const UNIT_TYPES: TypedDocumentNode<{ findSomeUnits: Unit[] }> = gql`
  query Query($unitType: String) {
    findSomeUnits(unitType: $unitType) {
      name
      abbreviation
      id
    }
  }
`;
