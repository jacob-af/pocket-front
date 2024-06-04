import { ALL_INGREDIENTS } from "@/graphql/queries/ingredient";
import { ApolloQueryResult } from "@apollo/client";
import { Ingredient } from "@/__generated__/graphql";
import IngredientDrop from "./IngredientSelect";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/client";

export default async function LoadIngredients() {
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ ingredients: Ingredient[] }> =
      await client.query({
        query: ALL_INGREDIENTS
      });
    const ingredients = data?.ingredients;

    return <IngredientDrop ingredients={ingredients} />;
  } catch (error) {
    console.log(error);
  }
}
