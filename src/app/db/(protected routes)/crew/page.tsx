"use client";

import UploadFile from "@/app/SharedComponents/FileUpload";
import UserLoader from "./components/UserLoader";
import { UserList } from "./components/UserList";

export default function Recipe() {
  return (
    <div>
      Upload a csv of ingredients:
      <UploadFile />
      <br />
      Here are all of the users registered and your relationship:
      <UserLoader />
      <UserList />
    </div>
  );
}
