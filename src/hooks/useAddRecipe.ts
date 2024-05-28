import { ADD_BUILD, ADD_RECIPE } from "@/graphql/mutations/recipes";
import {
  newRecipeInfo,
  recipeBlank,
  touchArray
} from "@/graphql/reactiveVar/recipes";
import { useMutation, useReactiveVar } from "@apollo/client";

import { RECIPES_AND_INGREDIENTS } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";
import { useRouter } from "next/navigation";

export default function useSubmitRecipe() {
  const [newRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const [newBuild] = useMutation(ADD_BUILD, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const touches = useReactiveVar(touchArray);
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const alerts = useReactiveVar(alertList);
  const router = useRouter();

  const submitRecipe = async () => {
    try {
      let response;
      if (recipeInfo.newRecipe) {
        response = await newRecipe({
          variables: {
            createRecipeInput: {
              recipeName: recipeInfo.name,
              about: recipeInfo.about,
              build: {
                buildName: recipeInfo.buildName,
                instructions: recipeInfo.instructions,
                glassware: recipeInfo.glassware,
                ice: recipeInfo.ice,
                isPublic: true,
                touchArray: [...touches]
              }
            }
          }
        });
      } else {
        response = await newBuild({
          variables: {
            createBuildInput: {
              recipe: { name: recipeInfo.name },
              buildName: recipeInfo.buildName,
              instructions: recipeInfo.instructions,
              glassware: recipeInfo.glassware,
              ice: recipeInfo.ice,
              isPublic: true,
              touchArray: [...touches]
            }
          }
        });
      }
      console.log(response.data);
      newRecipeInfo(recipeBlank);
      router.push("/db/recipe");
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alertList([...alerts, { code: "error", message: errorMessage }]);
      console.log(error);
    }
  };

  return submitRecipe;
}
