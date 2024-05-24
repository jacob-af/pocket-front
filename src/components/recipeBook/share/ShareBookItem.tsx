import {
  CHANGE_BOOK_PERMISSION,
  REMOVE_BOOK_PERMISSION
} from "@/graphql/mutations/recipeBook";
import { RecipeBook, UserBookPermission } from "@/__generated__/graphql";
import { useMutation, useReactiveVar } from "@apollo/client";

import { BOOK_PERMISSIONS } from "@/graphql/queries/recipeBook";
import { useState } from "react";
import { userBookPermissions } from "@/graphql/reactiveVar/user";

export const ShareBook = ({
  userBookPermission,
  book
}: {
  userBookPermission: UserBookPermission;
  book: RecipeBook;
}) => {
  const { user, permission } = userBookPermission;
  const [value, setValue] = useState(permission || undefined);
  const [changePermission] = useMutation(CHANGE_BOOK_PERMISSION, {
    fetchPolicy: "network-only", // Used for first execution
    refetchQueries: [BOOK_PERMISSIONS]
  });
  const [removePermission] = useMutation(REMOVE_BOOK_PERMISSION, {
    fetchPolicy: "network-only", // Used for first execution
    refetchQueries: [BOOK_PERMISSIONS]
  });

  const handleShare = async (userId: string) => {
    console.log(book.permission, value);
    console.log("userId", userId, book.id);
    const message = await changePermission({
      variables: {
        userId: userId,
        recipeBookId: book.id,
        userPermission: book.permission,
        desiredPermission: value
      }
    });
    console.log(message);
  };

  const handleUnshare = async (userId: string) => {
    removePermission({
      variables: {
        userId: userId,
        recipeBookId: book.id,
        permission: book.permission
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div key={user.id} className="flex items-center justify-center space-x-4">
      <div className="block text-center md:flex">
        <div className="ml-3 text-center">{user.userName}</div>
        <select
          value={value}
          onChange={handleChange}
          className="bg-contrast max-w-40 rounded-md border border-gray-300 px-4"
        >
          <option value="">-- Select Option --</option>
          <option value="BLOCKED">Block</option>
          <option value="VIEW">View</option>
          <option value="EDIT">Edit</option>
          <option value="MANAGER">Manager</option>
          <option value="OWNER">Owner</option>
        </select>
      </div>
      {permission ? (
        <div className="flex flex-col md:flex-row-reverse">
          <button
            onClick={() => handleUnshare(user.id)}
            className="rounded-md bg-gray-600 px-4 py-2 text-xxs"
          >
            Remove
          </button>
          <button
            onClick={() => handleShare(user.id)}
            className="rounded-md bg-gray-400 px-4 py-2 text-xxs"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleShare(user.id)}
          className="rounded-md px-4 py-2 text-xxs"
        >
          Share
        </button>
      )}
    </div>
  );
};
