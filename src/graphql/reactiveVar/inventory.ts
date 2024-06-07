import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const userInventoryList = makeVar([{ id: "", name: "loading" }]);

export const selectedInventory = makeVar<ListItem>({
  id: "",
  name: ""
});
