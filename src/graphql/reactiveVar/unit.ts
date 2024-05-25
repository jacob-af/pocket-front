import { Unit } from "@/__generated__/graphql";
import { makeVar } from "@apollo/client";

export const unitType = makeVar<string>("");
export const unitList = makeVar<Unit[]>([]);
