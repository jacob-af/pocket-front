import { EDIT_BUILD, EDIT_RECIPE } from "@/graphql/mutations/recipes";
import {
  RECIPES_AND_INGREDIENTS,
  USER_RECIPES
} from "@/graphql/queries/recipe";
import {
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/graphql/reactiveVar/recipes";
import { useMutation, useReactiveVar } from "@apollo/client";

import { alertList } from "@/graphql/reactiveVar/alert";
import { useRouter } from "next/navigation";

const useSubmitRecipe = () => {
  const router = useRouter();
  const [updateRecipe] = useMutation(EDIT_RECIPE, {
    refetchQueries: [RECIPES_AND_INGREDIENTS, USER_RECIPES]
  });
  const [updateBuild] = useMutation(EDIT_BUILD, {
    refetchQueries: [RECIPES_AND_INGREDIENTS, USER_RECIPES]
  });

  const recipeInfo = useReactiveVar(newRecipeInfo);
  const touches = useReactiveVar(touchArray);
  const alerts = useReactiveVar(alertList);

  const submitRecipe = async () => {
    try {
      const updateInput = {
        buildName: recipeInfo.buildName,
        instructions: recipeInfo.instructions,
        glassware: recipeInfo.glassware,
        ice: recipeInfo.ice,
        image: recipeInfo.image,
        isPublic: true,
        touchArray: touches.map(({ amount, id, ingredient, unit }) => ({
          amount,
          id,
          ingredient: {
            id: ingredient.id,
            name: ingredient.name
          },
          unit: {
            id: unit.id,
            abbreviation: unit.abbreviation
          }
        })),
        permission: recipeInfo.permission
      };

      let response;
      if (recipeInfo.newRecipe) {
        response = await updateRecipe({
          variables: {
            updateRecipeInput: {
              ...updateInput,
              id: recipeInfo.id,
              name: recipeInfo.name,
              about: recipeInfo.about
            }
          }
        });
      } else {
        response = await updateBuild({
          variables: {
            updateBuildInput: {
              buildId: recipeInfo.id,
              recipe: {
                name: recipeInfo.name
              },
              ...updateInput
            }
          }
        });
      }

      console.log(response.data);
      const message = recipeInfo.newRecipe
        ? `${recipeInfo.name} successfully updated`
        : `Build "${recipeInfo.buildName}" successfully updated for ${recipeInfo.name}`;
      alertList([
        ...alerts,
        {
          code: "success",
          message
        }
      ]);

      selectedRecipe({
        id: "",
        name: "",
        about: "",
        publicBuild: [],
        userBuild: []
      });
      router.push(`/db/recipe/${recipeInfo.name}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alertList([
        ...alerts,
        {
          code: "error",
          message: errorMessage
        }
      ]);
      console.log(error);
    }
  };

  return submitRecipe;
};

export default useSubmitRecipe;
