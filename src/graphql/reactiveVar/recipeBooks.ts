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

export const bookBlank = {
  name: "",
  description: ""
};

export const newBookInfo = makeVar(bookBlank);

export const userRecipeBookList = makeVar<RecipeBook[]>([]);
