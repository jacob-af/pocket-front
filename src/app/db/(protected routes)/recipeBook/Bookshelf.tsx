import BookCover from "@/components/recipeBook/display/BookCover";
import { useReactiveVar } from "@apollo/client";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export function Bookshelf() {
  const bookList = useReactiveVar(userRecipeBookList);
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="z-0 mt-12 box-border grid w-full gap-8 overflow-scroll shadow-xl md:grid-cols-2 xl:grid-cols-3">
      {columnConfigurations.map((columns, index) =>
        // Create a div for each column configuration
        columns.map((num, columnIndex) => (
          <div
            key={`${index}-${columnIndex}`}
            //
            className={`col-span-1 justify-items-center w-full ${
              index === 0 ? "grid md:hidden" : ""
            } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
              index === 2 ? "hidden xl:grid" : ""
            }`}
          >
            {bookList
              .filter((_, i) => i % num === columnIndex)
              .map(book => (
                <BookCover key={book.id} book={book} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}
