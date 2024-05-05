export type ListItem = {
  __typename?: "ListItem";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  [key: string]: any;
};

export type Alert = {
  __typename?: "Alert";
  message: Scalars["String"]["output"];
  code: Scalars["String"]["output"];
};
