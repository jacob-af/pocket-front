import { removeTouch } from "@/components/recipe/recipeActions";

export const RemoveTouch = ({ index }: { index: number }) => {
  return (
    <button
      onClick={() => removeTouch(index)}
      className="text-center align-center w-8 h-8 bg-black"
    >
      X
    </button>
  );
};
