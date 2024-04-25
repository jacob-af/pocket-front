import { ApolloQueryResult } from "@apollo/client";
import { getClient } from "@/lib/client";
import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { Build, Recipe } from "@/__generated__/graphql";
import { auth } from "@/app/Apollo/auth";
import DropDown from "./BuildLoader";

export default async function RecipeSelector() {
  const session = await auth();
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ usersBuilds: Build[] }> =
      await client.query({
        query: USER_BUILDS,
        context: {
          headers: {
            Authorization: session?.user.accessToken
              ? `Bearer ${session?.user.accessToken}`
              : ""
          }
        }
      });
    console.log(data.usersBuilds);
    const recipes: Recipe[] = [];
    data.usersBuilds.forEach(userBuild => {
      const { recipe } = userBuild;
      const index = recipes.findIndex(rec => rec.name === recipe.name);
      if (index === -1) {
        recipes.push({
          ...recipe,
          build: [userBuild]
        });
      } else {
        recipes[index] = {
          ...recipes[index],
          build: [
            ...recipes[index].build,
            {
              ...userBuild
            }
          ]
        };
      }
    });
    // const sortedRecipes: Recipe[] = [...data?.usersBuilds].sort((a, b) => {
    //   const nameA = a.name.toUpperCase();
    //   const nameB = b.name.toUpperCase();
    //   return nameA.localeCompare(nameB);
    // });        include: {

    return <DropDown recipes={recipes} />;
  } catch (error) {
    console.log(error);
  }
}
