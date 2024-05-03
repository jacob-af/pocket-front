import { Build, User, UserBuildPermission } from "@/__generated__/graphql";
import { ADD_FOLLOW, UN_FOLLOW } from "@/app/graphql/mutations/user";
import { BUILD_PERMISSIONS } from "@/app/graphql/queries/recipe";
import { ALL_RELATIONS, ALL_USERS } from "@/app/graphql/queries/user";
import {
  userBuildPermissions,
  userList,
  userRelations
} from "@/app/graphql/reactiveVar/user";
import { ShareRecipe } from "./ShareRecipeItem";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const ShareRecipeList = ({ build }: { build: Build }) => {
  const { status: sessionStatus } = useSession();
  console.log("list", build.permission);
  const { data, loading, error } = useQuery(BUILD_PERMISSIONS, {
    variables: {
      buildId: build.id
    },
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data?.findFolloweddUsersBuildPermission)
      userBuildPermissions(data.findFolloweddUsersBuildPermission);
  }, [data]);

  const buildPermissions = useReactiveVar(userBuildPermissions);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {buildPermissions.map((buildPermission: UserBuildPermission) => {
        return (
          <ShareRecipe
            key={buildPermission.user.id}
            build={build}
            userBuildPermission={buildPermission}
          />
        );
      })}
      {buildPermissions.length}
    </div>
  );
};
