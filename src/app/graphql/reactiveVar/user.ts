import { User, UserBuildPermission } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const userList = makeVar<User[]>([
  {
    id: "",
    userName: "",
    email: ""
  }
]);

export const userRelations = makeVar<{ followers: User[]; following: User[] }>({
  followers: [
    {
      id: "",
      userName: "",
      email: ""
    }
  ],
  following: [
    {
      id: "",
      userName: "",
      email: ""
    }
  ]
});

export const userBuildPermissions = makeVar<UserBuildPermission[]>([]);
