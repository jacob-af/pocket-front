import { Build, UserBuildPermission } from "@/__generated__/graphql";
import {
  CHANGE_BUILD_PERMISSION,
  REMOVE_BUILD_PERMISSION
} from "@/app/graphql/mutations/recipes";
import { BUILD_PERMISSIONS } from "@/app/graphql/queries/recipe";
import { userBuildPermissions } from "@/app/graphql/reactiveVar/user";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useState } from "react";

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
    <div key={user.id} className="flex items-center space-x-4">
      <span>{user.userName}</span>
      <select
        value={value}
        onChange={handleChange}
        className="border border-gray-300 bg-black max-w-40 px-4 py-2 rounded-md"
      >
        <option value="">-- Select Option --</option>
        <option value="BLOCKED">Block</option>
        <option value="VIEW">View</option>
        <option value="EDIT">Edit</option>
        <option value="MANAGER">Manager</option>
        <option value="OWNER">Owner</option>
      </select>
      {permission ? (
        <>
          <button
            onClick={() => handleUnshare(user.id)}
            className="bg-red-500 text-xxs px-4 py-2 rounded-md"
          >
            Remove
          </button>
          <button
            onClick={() => handleShare(user.id)}
            className="bg-red-500 text-xxs px-4 py-2 rounded-md"
          >
            Change
          </button>
        </>
      ) : (
        <button
          onClick={() => handleShare(user.id)}
          className=" text-xxs px-4 py-2 rounded-md"
        >
          Share
        </button>
      )}
    </div>
  );
};
