"use client";

import UploadFile from "@/app/SharedComponents/FileUpload";
import { UserList } from "./components/UserList";
import UserLoader from "./components/UserLoader";

export default function Recipe() {
  return (
    <div className="flex flex-col content-center align-middle max-w-md min-w-sm m-20 box-border">
      Here are all of the users registered and your relationship:
      <UserLoader />
      <UserList />
    </div>
  );
}
