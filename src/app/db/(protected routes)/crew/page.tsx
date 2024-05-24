"use client";

import { UserList } from "@/components/crew/UserList";
import UserLoader from "@/components/crew/UserLoader";

export default function Recipe() {
  return (
    <div className="min-w-sm m-20 box-border flex max-w-md flex-col content-center align-middle">
      Here are all of the users registered and your relationship:
      <UserLoader />
      <UserList />
    </div>
  );
}
