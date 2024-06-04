"use client";

import { ChangeEvent, useEffect } from "react";
import { unitList, unitType } from "@/graphql/reactiveVar/unit";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import { Recipe } from "@/__generated__/graphql";
import ShortCard from "@/components/recipe/display/ShortCard";
import { UNIT_TYPES } from "@/graphql/queries/unit";
import { USER_RECIPES } from "@/graphql/queries/recipe";

export default function UnitSelector() {
  const type = useReactiveVar(unitType);
  const [fetchUnits, { data, loading, error }] = useLazyQuery(UNIT_TYPES, {
    onCompleted: response => {
      unitList(response?.findSomeUnits);
    }
  });

  useEffect(() => {
    fetchUnits({ variables: { unitType: type } });
    console.log(unitList());
  }, [type, fetchUnits]);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    unitType(event.target.value);
  };

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <div className="">
      <select
        onChange={onChange}
        name="unit-options"
        className="focus:shadow-outline bg-contrast col-span-3 text-white"
        id="unit"
        value={type}
      >
        <option value="imperial">Imperial Units</option>
        <option value="metric">Metric Units</option>
        <option value="freepour">Free Pour</option>
        <option value="">All Units</option>
      </select>
    </div>
  );
}
