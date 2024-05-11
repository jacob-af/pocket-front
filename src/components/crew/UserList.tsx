import { ADD_FOLLOW, UN_FOLLOW } from "@/graphql/mutations/user";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userList, userRelations } from "@/graphql/reactiveVar/user";

import { ALL_RELATIONS } from "@/graphql/queries/user";
import { User } from "@/__generated__/graphql";

export const UserList = () => {
  const users = useReactiveVar(userList);
  const relations = useReactiveVar(userRelations);
  const [addFollow] = useMutation(ADD_FOLLOW, {
    fetchPolicy: "network-only", // Used for first execution

    refetchQueries: [ALL_RELATIONS]
  });
  const [unFollow] = useMutation(UN_FOLLOW, {
    fetchPolicy: "network-only", // Change fetchPolicy to "network-only"
    refetchQueries: [ALL_RELATIONS]
  });

  const followUser = (userId: string) => {
    const { data }: any = addFollow({
      variables: {
        followId: userId,
        relationship: "Following"
      }
    });
    console.log(data);
  };

  const unFollowUser = (userId: string) => {
    const { data }: any = unFollow({
      variables: {
        unfollowId: userId
      }
    });
    console.log(data);
  };

  return (
    <div className="content-center">
      {users.map((user: User) => {
        if (
          relations.following.some((relation: User) => relation.id === user.id)
        ) {
          return (
            <div key={user.id}>
              {user.userName}:{" "}
              <button onClick={() => unFollowUser(user.id)}>unfollow</button>
            </div>
          );
        } else if (
          relations.followers.some((relation: User) => relation.id === user.id)
        ) {
          return (
            <div key={user.id}>
              {user.userName}:{" "}
              <button onClick={() => followUser(user.id)}>follow back</button>
            </div>
          );
        } else {
          return (
            <div key={user.id}>
              {user.userName}:{" "}
              <button onClick={() => followUser(user.id)}>follow</button>
            </div>
          );
        }
      })}
    </div>
  );
};
