export function SkeletonCover() {
  return (
    <div className="h-140 bg-contrast relative my-2 flex w-full max-w-lg animate-pulse flex-col rounded-lg p-4">
      <div className="h-8 w-full rounded bg-gray-700"></div>{" "}
      {/* Simulated title bar */}
      <div className="mt-4 flex h-40 max-w-md rounded bg-gray-700"></div>{" "}
      {/* Simulated image */}
      <div className="mt-4 h-20 rounded bg-gray-700"></div>{" "}
      {/* Simulated description */}
      <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
      <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
      <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
      <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
      {/* Simulated build list */}
      <div className="absolute bottom-4 right-4 h-10 w-10 rounded bg-gray-700"></div>{" "}
      {/* Simulated button */}
    </div>
  );
}
