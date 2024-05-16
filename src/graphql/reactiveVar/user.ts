import { ReactiveVar, makeVar } from "@apollo/client";
import {
  User,
  UserBookPermission,
  UserBuildPermission,
  UserRelation
} from "@/__generated__/graphql";

import { v4 as uuidv4 } from "uuid";

export const userList = makeVar<UserRelation[]>([
  {
    id: uuidv4(),
    userName: "test",
    following: false,
    followedBy: false
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
export const userBookPermissions = makeVar<UserBookPermission[]>([]);
