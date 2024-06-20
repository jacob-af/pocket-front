export default function Recipe() {
  return (
    <div>
      <div className="flex w-full flex-col md:grid md:snap-center md:grid-cols-2 md:grid-rows-2">
        <div className="row-span-1 flex h-80 w-full snap-center items-center justify-center md:h-full md:snap-align-none">
          Recipes contain complete information, and can be modified with
          customsnap-center builds - the measurements you use at each bar or
          restaurant you work.
          <br />
        </div>
        <div className="bg-contrast row-span-2 flex h-screen w-full snap-center items-center justify-center md:snap-align-none">
          Here will be image of the UI
        </div>
        <div className="bg-primary text-bg row-span-1 flex h-80 w-full snap-center items-center justify-center bg-yellow-800 md:h-full md:snap-align-none">
          Recipes can be organized into books for easy sharing and viewing, with
          a collapsed form for easy access while you are on shift.
        </div>
      </div>
    </div>
  );
}
