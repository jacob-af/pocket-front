import { CompleteTouch, Touch, TouchInput } from "@/__generated__/graphql";

import { SingleTouch } from "./SingleTouch";
import { touchArray } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export function BuildDetails({}) {
  const touches = useReactiveVar(touchArray);

  return (
    <div>
      {touches.map((touch: Touch, index: number) => {
        return <SingleTouch touch={touch} key={touch.id} index={index} />;
      })}
    </div>
  );
}
