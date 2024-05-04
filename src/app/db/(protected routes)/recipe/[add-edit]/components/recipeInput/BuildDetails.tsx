import { touchArray } from "@/app/graphql/reactiveVar/recipes";
import { TouchInput } from "@/__generated__/graphql";
import { SingleTouch } from "./singleTouch/SingleTouch";
import { useReactiveVar } from "@apollo/client";

export function BuildDetails({}) {
  const touches = useReactiveVar(touchArray);

  return (
    <div>
      {touches.map((touch: TouchInput, index: number) => {
        return <SingleTouch touch={touch} key={index} index={index} />;
      })}
    </div>
  );
}
