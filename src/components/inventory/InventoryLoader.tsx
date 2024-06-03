import { ApolloQueryResult } from "@apollo/client";
import { Inventory } from "@/__generated__/graphql";
import InventoryDrop from "./InvetorySelect";
import { USER_INVENTORIES } from "@/graphql/queries/inventory";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/client";

export default async function LoadInventories() {
  const client = await getClient();
  try {
    const { data }: ApolloQueryResult<{ userInventory: Inventory[] }> =
      await client.query({
        query: USER_INVENTORIES
      });

    return <InventoryDrop inventories={data.userInventory} />;
  } catch (error) {
    console.log(error);
  }
}
