export default function Ingredient() {
  return (
    <div>
      <div className="flex w-full flex-col md:grid md:snap-center md:grid-cols-2 md:grid-rows-2">
        <div className="row-span-1 flex h-80 w-full snap-center items-center justify-center md:order-2 md:h-full md:snap-align-none">
          Pocket comes loaded with over 1000 ingredients, helping you keep
          recipes consistent from one bar and user to another.
        </div>
        <div className="bg-contrast row-span-2 flex h-screen w-full snap-center items-center justify-center md:order-1 md:snap-align-none">
          Here will be image of the UI
        </div>
        <div className="bg-secondary text-bg row-span-1 flex h-80 w-full snap-center items-center justify-center md:order-3 md:h-full md:snap-align-none">
          Stock ingredients to your inventory and cost recipes on the fly.
          <br />
        </div>
      </div>
    </div>
  );
}
