import BookCover from "@/components/recipeBook/display/BookCover";
import PullToRefresh from "@/components/SharedComponents/PullToRefresh";
import { SkeletonCover } from "./SkeletonCover";
import { useBookshelf } from "@/hooks/useBookShelf";

export function Bookshelf() {
  const itemsPerPage = 6;
  const scrollOffset = 200;

  const { bookList, loading, error, handleRefresh } = useBookshelf(
    itemsPerPage,
    scrollOffset
  );

  const columnConfigurations = [[1], [2, 2]];

  if (error) {
    console.log(error);
    return <div className="fixed inset-0">{error.message}</div>;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="mt-12 box-border grid h-full w-full gap-8 shadow-xl lg:grid-cols-2">
        {columnConfigurations.map((columns, index) =>
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 w-full mb-12 ${
                index === 0 ? "flex flex-col lg:hidden" : ""
              } ${index === 1 ? "hidden lg:flex lg:flex-col" : ""}`}
            >
              {bookList
                .filter((_, i) => i % num === columnIndex)
                .map((book, index) => (
                  <BookCover key={book.id + index} book={book} />
                ))}
              {loading && bookList.length === 0 && <SkeletonCover />}
            </div>
          ))
        )}
      </div>
    </PullToRefresh>
  );
}
