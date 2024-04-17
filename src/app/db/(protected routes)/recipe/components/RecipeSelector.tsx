import { ApolloQueryResult } from "@apollo/client";
import { getClient } from "@/lib/client";
import { USER_RECIPES } from "@/app/graphql/queries/recipe";
import { Recipe } from "@/__generated__/graphql";
import { auth } from "@/app/Apollo/auth";
import DropDown from "./BuildLoader";

export default async function RecipeSelector() {
  const session = await auth();
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ usersBuilds: Recipe[] }> =
      await client.query({
        query: USER_RECIPES,
        context: {
          headers: {
            Authorization: session?.user.accessToken
              ? `Bearer ${session?.user.accessToken}`
              : ""
          }
        }
      });

    const sortedRecipes: Recipe[] = [...data?.usersBuilds].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    return <DropDown recipes={sortedRecipes} />;
  } catch (error) {
    console.log(error);
  }
}
