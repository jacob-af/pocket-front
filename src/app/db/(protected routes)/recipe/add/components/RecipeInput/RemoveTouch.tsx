import { removeTouch } from "../recipeHooks";

export const RemoveTouch = ({ index }: { index: number }) => {
  return <button onClick={() => removeTouch(index)}>X</button>;
};
