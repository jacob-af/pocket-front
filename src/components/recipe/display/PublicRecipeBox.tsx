import {
  ApolloQueryResult,
  useLazyQuery,
  useReactiveVar
} from "@apollo/client";
import { PUBLIC_RECIPES, USER_RECIPES } from "@/graphql/queries/recipe";
import { useCallback, useEffect, useMemo, useState } from "react";

import PublicCard from "@/components/recipe/display/PublicCard";
import { Recipe } from "@/__generated__/graphql";
import { getClient } from "@/lib/client";

export async function PublicRecipeBox() {
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ publicRecipes: Recipe[] }> =
      await client.query({
        query: PUBLIC_RECIPES,
        context: {}
      });
    const columnConfigurations = [[1], [2, 2], [3, 3, 3]];
    return (
      <>
        {columnConfigurations.map((columns, index) =>
          //{/* Create a div for each column configuration */}
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "grid md:hidden" : ""
              } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
                index === 2 ? "hidden xl:grid" : ""
              }`}
            >
              {/* Calculate the starting index for this column's builds */}
              {data.publicRecipes
                .filter((build, i) => build && i % num === columnIndex)
                .map(
                  (recipe, index) =>
                    recipe && (
                      <PublicCard
                        key={recipe.id + index}
                        recipe={recipe}
                        index={index}
                      />
                    )
                )}
            </div>
          ))
        )}
      </>
    );
  } catch (err) {
    console.log(err);
    return <div>Something has gone Wrong</div>;
  }
}
