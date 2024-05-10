import { removeTouch } from "../../../../components/recipeActions";

export const RemoveTouch = ({ index }: { index: number }) => {
  return (
    <button
      onClick={() => removeTouch(index)}
      className="text-center align-center w-16 h-16 bg-black"
    >
      X
    </button>
  );
};
