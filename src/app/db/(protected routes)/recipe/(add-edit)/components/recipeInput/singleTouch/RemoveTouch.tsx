import { removeTouch } from "../../../../components/recipeActions";

export const RemoveTouch = ({ index }: { index: number }) => {
  return <button onClick={() => removeTouch(index)}>X</button>;
};
