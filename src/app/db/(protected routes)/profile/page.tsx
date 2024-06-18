export default function Page() {
  return (
    <div className="mt-20 flex h-full w-full max-w-3xl flex-col items-center justify-center">
      <div className="flex w-full justify-between px-4">
        <div>
          <div className="text-left">User Name</div>
          <div>Work Place</div>
        </div>
        <div className="h-32 w-32 rounded-full bg-red-100"></div>
      </div>
      <div className="bg-contrast m-2 box-border h-44 w-64 p-4">
        <div className="text-center">Recent Recipes</div>
        <div>example1</div>
        <div>example2</div>
        <div>example3</div>
        <div>example4</div>
        <div>example5</div>
      </div>
      <div className="bg-contrast m-2 box-border h-44 w-64 p-4">
        <div className="text-center">Recent Builds</div>

        <div>example1</div>
        <div>example2</div>
        <div>example3</div>
        <div>example4</div>
        <div>example5</div>
      </div>
      <div className="bg-contrast m-2 box-border h-44 w-64 p-4">
        <div className="text-center">Recent Recipe Books</div>
        <div>example1</div>
        <div>example2</div>
        <div>example3</div>
        <div>example4</div>
        <div>example5</div>
      </div>
    </div>
  );
}
