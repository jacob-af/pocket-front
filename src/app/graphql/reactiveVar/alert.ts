import { Alert } from "@/types/util";
import { makeVar } from "@apollo/client";

export const alertList = makeVar<Alert[]>([
  { message: "hello bubby", code: "success" },
  { message: "no thanks, nathaniel", code: "error" }
]);
