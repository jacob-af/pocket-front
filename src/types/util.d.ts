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

export type UseBookshelf = (
  itemsPerPage: number,
  scrollOffset: number
) => {
  __typename?: "UseBookshelf";
  bookList: RecipeBook[];
  loading: boolean;
  error?: ApolloError | undefined;
  handleScroll: () => void;
  handleRefresh: () => void;
};
