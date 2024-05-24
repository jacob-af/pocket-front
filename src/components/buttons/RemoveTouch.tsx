import { removeTouch } from "@/components/recipe/recipeActions";

export const RemoveTouch = ({ index }: { index: number }) => {
  return (
    <button
      onClick={() => removeTouch(index)}
      className="align-center bg-contrast h-8 w-8 text-center"
    >
      X
    </button>
  );
};
