"use client";

import { ApolloQueryResult, useQuery } from "@apollo/client";
import { Ingredient } from "@/__generated__/graphql";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import UploadFile from "@/app/SharedComponents/FileUpload";
import UserLoader from "./components/UserLoader";
import { UserList } from "./components/UserList";

export default function Recipe() {
  return (
    <div>
      This is a protected route.
      <br />
      You will see recipes here
      <UploadFile />
      <UserLoader />
      <UserList />
    </div>
  );
}
