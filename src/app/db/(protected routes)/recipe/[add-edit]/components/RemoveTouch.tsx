import { removeTouch } from "../../components/recipeHooks";

export const RemoveTouch = ({ index }: { index: number }) => {
  return <button onClick={() => removeTouch(index)}>X</button>;
};
