import { Recipe } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const userRecipeList = makeVar<Recipe[]>([]);
