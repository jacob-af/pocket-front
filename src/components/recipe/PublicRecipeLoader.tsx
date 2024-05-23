import { ApolloQueryResult, useQuery, useReactiveVar } from "@apollo/client";
import { Build, Recipe } from "@/__generated__/graphql";

import { PUBLIC_RECIPE_LIST } from "@/graphql/queries/recipe";
import RecipeDropDown from "./RecipeDropDown";
import { getClient } from "@/lib/client";
import { useEffect } from "react";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export default async function RecipeLoader() {
  const client = await getClient();
  const { data }: ApolloQueryResult<{ publicRecipeList: Recipe[] }> =
    await client.query({
      query: PUBLIC_RECIPE_LIST
    });

  return (
    <div className="fixed top-14 z-30 h-16">
      <div className="flex w-72">
        <RecipeDropDown
          recipes={data.publicRecipeList}
          loading={`Recipe Search`}
        />
      </div>
    </div>
  );
}
