import { Build, UserBuildPermission } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import { BUILD_PERMISSIONS } from "@/graphql/queries/recipe";
import { ShareRecipe } from "./ShareRecipeItem";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userBuildPermissions } from "@/graphql/reactiveVar/user";

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
