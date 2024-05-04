import { ALL_INGREDIENTS } from "@/app/graphql/queries/ingredient";
import { ApolloQueryResult } from "@apollo/client";
import AutoDrop from "./IngredientSelect";
import { Ingredient } from "@/__generated__/graphql";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/client";

export default async function LoadIngredients() {
  const session = await auth();
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ ingredients: Ingredient[] }> =
      await client.query({
        query: ALL_INGREDIENTS,
        context: {
          headers: {
            Authorization: session?.user.accessToken
              ? `Bearer ${session?.user.accessToken}`
              : ""
          }
        }
      });

    const sortedIngredients: Ingredient[] = [...data?.ingredients].sort(
      (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB);
      }
    );

    return <AutoDrop ingredients={sortedIngredients} />;
  } catch (error) {
    console.log(error);
  }
}
