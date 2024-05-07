"use client";

import { useQuery, useReactiveVar } from "@apollo/client";
import { userList, userRelations } from "@/app/graphql/reactiveVar/user";

import { ALL_RELATIONS } from "@/app/graphql/queries/user";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UserLoader() {
  const { status: sessionStatus } = useSession();
  const { data, loading, error } = useQuery(ALL_RELATIONS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data?.allUsers) {
      const users = data.allUsers;
      userList(users);
    }
    if (data?.findFollowers) {
      const followers = data.findFollowers;
      userRelations({
        ...userRelations(),
        followers
      });
    }
    if (data?.findFollows) {
      const following = data.findFollows;
      userRelations({
        ...userRelations(),
        following
      });
    }
  }, [data]);

  const users = useReactiveVar(userList);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div className="text-center">{`${users.length} Users Loaded`}</div>;
}
