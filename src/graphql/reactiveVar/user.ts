import { ReactiveVar, makeVar } from "@apollo/client";
import { User, UserBuildPermission } from "@/__generated__/graphql";

import { v4 as uuidv4 } from "uuid";

export const userList = makeVar<User[]>([
  {
    id: uuidv4(),
    userName: "",
    email: ""
  }
]);

export const userRelations = makeVar<{ followers: User[]; following: User[] }>({
  followers: [
    {
      id: uuidv4(),
      userName: "",
      email: ""
    }
  ],
  following: [
    {
      id: uuidv4(),
      userName: "",
      email: ""
    }
  ]
});

export const userBuildPermissions = makeVar<UserBuildPermission[]>([]);