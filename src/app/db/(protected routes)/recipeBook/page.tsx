"use client";

export default function Recipe() {
  return (
    <div>
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
      {/* {ingredients?.ingredients?.map((ingredient: any) => {
        return <div key={ingredient?.id}>{ingredient.name}</div>;
      })} */}
    </div>
  );
}
