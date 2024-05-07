"use client";

import UploadFile from "@/app/SharedComponents/FileUpload";

export default function Recipe() {
  return (
    <div>
      Upload a csv of ingredients:
      <UploadFile />
    </div>
  );
}
