import { BookBorder } from "@/components/images/CardBorder";
import { BookCoverImage } from "@/components/images/BookCoverImage";

export function SkeletonCover() {
  return (
    <div className="h-140 bg-contrast relative my-2 box-border flex w-full max-w-sm flex-col rounded-lg p-4">
      <div className="absolute inset-0 z-0 h-full w-full">
        <BookBorder />
      </div>
      <div className="relative z-10 flex h-full animate-pulse flex-col items-center">
        {/* Simulated title bar */}
        <div className="mx-12 mt-4 h-8 w-60 rounded bg-gray-700"></div>{" "}
        {/* Simulated image */}
        <div className="flex h-36 w-64 flex-col justify-center"></div>
        {/* Simulated description */}
        <div className="box-border h-20 w-96 flex-col p-4 text-center text-sm"></div>
        <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
        <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
        <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
        <div className="mt-4 h-4 w-3/4 self-center rounded bg-gray-700"></div>{" "}
        {/* Simulated build list */}
        <div className="absolute bottom-4 h-10 w-40 bg-gray-700"></div>{" "}
        {/* Simulated button */}
      </div>
    </div>
  );
}
