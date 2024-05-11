import { Permission, RecipeBook } from "@/__generated__/graphql";

import { makeVar } from "@apollo/client";
import { recipeBlank } from "./recipes";

export const selectedRecipeBook = makeVar<RecipeBook>({
  id: "",
  name: "",
  description: "",
  build: [],
  permission: Permission.View
});

export const userRecipeBookList = makeVar<RecipeBook[]>([]);
