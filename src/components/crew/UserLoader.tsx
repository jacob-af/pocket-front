"use client";

import { useQuery, useReactiveVar } from "@apollo/client";
import { userList, userRelations } from "@/graphql/reactiveVar/user";

import { ALL_RELATIONS } from "@/graphql/queries/user";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UserLoader() {
  const { status: sessionStatus } = useSession();
  const users = useReactiveVar(userList);
  const { data, loading, error } = useQuery(ALL_RELATIONS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    console.log(data);
    if (data?.getUserRelationships) {
      userList(data.getUserRelationships);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div className="text-center">{`${users.length} Users Loaded`}</div>;
}
