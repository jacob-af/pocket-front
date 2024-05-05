import { Alert } from "@/types/util";
import { makeVar } from "@apollo/client";

export const alertList = makeVar<Alert[]>([]);
