import { ADD_FOLLOW, UN_FOLLOW } from "@/app/graphql/mutations/user";
import { ALL_RELATIONS, ALL_USERS } from "@/app/graphql/queries/user";
import { Build, User, UserBuildPermission } from "@/__generated__/graphql";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  userBuildPermissions,
  userList,
  userRelations
} from "@/app/graphql/reactiveVar/user";

import { BUILD_PERMISSIONS } from "@/app/graphql/queries/recipe";
import { ShareRecipe } from "./ShareRecipeItem";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const ShareRecipeList = ({ build }: { build: Build }) => {
  const { status: sessionStatus } = useSession();

  const { data, loading, error } = useQuery(BUILD_PERMISSIONS, {
    variables: {
      buildId: build.id
    },
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (data && data.findFolloweddUsersBuildPermission)
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
    </div>
  );
};
