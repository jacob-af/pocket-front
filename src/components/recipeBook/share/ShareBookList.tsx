import { RecipeBook, User, UserBookPermission } from "@/__generated__/graphql";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { BOOK_PERMISSIONS } from "@/graphql/queries/recipeBook";
import { ShareBook } from "./ShareBookItem";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userBookPermissions } from "@/graphql/reactiveVar/user";

export const ShareBookList = ({ book }: { book: RecipeBook }) => {
  const { status: sessionStatus } = useSession();

  const { data, loading, error } = useQuery(BOOK_PERMISSIONS, {
    variables: {
      recipeBookId: book.id
    },
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (data && data.findFolloweddUsersBookPermission)
      userBookPermissions(data.findFolloweddUsersBookPermission);
  }, [data]);

  const bookPermissions = useReactiveVar(userBookPermissions);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {bookPermissions.map((bookPermission: UserBookPermission) => {
        return (
          <ShareBook
            key={bookPermission.user.id}
            book={book}
            userBookPermission={bookPermission}
          />
        );
      })}
    </div>
  );
};
