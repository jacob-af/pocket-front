import { ADD_FOLLOW, UN_FOLLOW } from "@/graphql/mutations/user";
import { User, UserRelation } from "@/__generated__/graphql";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userList, userRelations } from "@/graphql/reactiveVar/user";

import { ALL_RELATIONS } from "@/graphql/queries/user";

export const UserList = () => {
  const relations = useReactiveVar(userList);
  const [addFollow, { loading }] = useMutation(ADD_FOLLOW, {
    fetchPolicy: "network-only", // Used for first execution

    refetchQueries: [ALL_RELATIONS]
  });
  const [unFollow, { loading: unloading }] = useMutation(UN_FOLLOW, {
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
  };

  return (
    <div className="content-center">
      {relations.map((rel: UserRelation) => (
        <div
          key={rel.id}
          className="bg-black rounded-md block p-2 align-center"
        >
          {rel.userName}
          {rel.following ? (
            <button
              className="border p-1 float-right"
              onClick={() => unFollowUser(rel.id)}
            >
              unfollow
            </button>
          ) : rel.followedBy ? (
            <button
              className="border p-1 float-right"
              onClick={() => followUser(rel.id)}
            >
              follow back
            </button>
          ) : (
            <button
              className="border p-1 float-right"
              onClick={() => followUser(rel.id)}
            >
              follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
