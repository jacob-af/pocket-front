import LoadIngredients from "../../components/LoadIngredients";
import Csr from "./csr";
import UploadFile from "@/app/SharedComponents/FileUpload";

export default function ClientSideIngredients() {
  return (
    <div>
      {/* <Csr /> */}
      <LoadIngredients />
      {/* <UploadFile /> */}
    </div>
  );
}
