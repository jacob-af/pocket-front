import { Build, UserBuildPermission } from "@/__generated__/graphql";
import {
  CHANGE_BUILD_PERMISSION,
  REMOVE_BUILD_PERMISSION
} from "@/graphql/mutations/recipes";
import { useMutation, useReactiveVar } from "@apollo/client";

import { BUILD_PERMISSIONS } from "@/graphql/queries/recipe";
import { useState } from "react";
import { userBuildPermissions } from "@/graphql/reactiveVar/user";

export const ShareRecipe = ({
  userBuildPermission,
  build
}: {
  userBuildPermission: UserBuildPermission;
  build: Build;
}) => {
  const { user, permission } = userBuildPermission;
  const [value, setValue] = useState(permission || undefined);
  const [changePermission] = useMutation(CHANGE_BUILD_PERMISSION, {
    fetchPolicy: "network-only", // Used for first execution
    refetchQueries: [BUILD_PERMISSIONS]
  });
  const [removePermission] = useMutation(REMOVE_BUILD_PERMISSION, {
    fetchPolicy: "network-only", // Used for first execution
    refetchQueries: [BUILD_PERMISSIONS]
  });

  const handleShare = async (userId: string) => {
    console.log(build.permission, value);
    const message = await changePermission({
      variables: {
        changeBuildPermissionInput: {
          userId: userId,
          buildId: build.id,
          userPermission: build.permission,
          desiredPermission: value
        }
      }
    });
    console.log(message);
  };

  const handleUnshare = async (userId: string) => {
    removePermission({
      variables: {
        changeBuildPermissionInput: {
          userId: userId,
          buildId: build.id,
          userPermission: build.permission,
          desiredPermission: value
        }
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
