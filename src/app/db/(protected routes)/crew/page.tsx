"use client";

import UploadFile from "@/components/SharedComponents/FileUpload";
import { UserList } from "@/components/crew/UserList";
import UserLoader from "@/components/crew/UserLoader";

export default function Recipe() {
  return (
    <div className="flex flex-col content-center align-middle max-w-md min-w-sm m-20 box-border">
      Here are all of the users registered and your relationship:
      <UserLoader />
      <UserList />
    </div>
  );
}
