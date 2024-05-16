/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
};

export type ArchiveResponse = {
  __typename?: 'ArchiveResponse';
  archivedBuild?: Maybe<ArchivedBuild>;
  build?: Maybe<Build>;
};

export type ArchivedBuild = {
  __typename?: 'ArchivedBuild';
  archivedTouch?: Maybe<Array<Maybe<ArchivedTouch>>>;
  buildId: Scalars['String']['output'];
  buildName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  glassware?: Maybe<Scalars['String']['output']>;
  ice?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type ArchivedTouch = {
  __typename?: 'ArchivedTouch';
  amount?: Maybe<Scalars['Float']['output']>;
  archivedBuild?: Maybe<Build>;
  id: Scalars['ID']['output'];
  ingredient?: Maybe<Ingredient>;
  order?: Maybe<Scalars['Int']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Build = {
  __typename?: 'Build';
  archivedBuild?: Maybe<Array<Maybe<ArchivedBuild>>>;
  buildName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  glassware?: Maybe<Scalars['String']['output']>;
  ice?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Permission>;
  recipe: Recipe;
  touch: Array<Touch>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type BuildConstructor = {
  __typename?: 'BuildConstructor';
  about?: Maybe<Scalars['String']['output']>;
  buildName: Scalars['String']['output'];
  glassware?: Maybe<Scalars['String']['output']>;
  ice?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permission: Permission;
  touchArray: Array<Maybe<CompleteTouch>>;
};

export type BuildPermissionResponse = {
  __typename?: 'BuildPermissionResponse';
  buildUser?: Maybe<BuildUser>;
  status?: Maybe<StatusMessage>;
};

export type BuildUser = {
  __typename?: 'BuildUser';
  build: Build;
  permission?: Maybe<Permission>;
  user: User;
};

export type ChangeBuildPermissionInput = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  desiredPermission?: InputMaybe<Permission>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userPermission?: InputMaybe<Permission>;
};

export type CompleteTouch = {
  __typename?: 'CompleteTouch';
  amount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  ingredientName: Scalars['String']['output'];
  unit: Scalars['String']['output'];
};

export type CreateBuildInput = {
  buildName: Scalars['String']['input'];
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  recipe: RecipeNameInput;
  touchArray: Array<InputMaybe<TouchInput>>;
};

export type CreateFirstBuildInput = {
  buildName: Scalars['String']['input'];
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  touchArray: Array<InputMaybe<TouchInput>>;
};

export type CreateIngredientInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateRecipeInput = {
  about: Scalars['String']['input'];
  build: CreateFirstBuildInput;
  recipeName: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type FollowReturn = {
  __typename?: 'FollowReturn';
  following?: Maybe<Scalars['String']['output']>;
  relationship?: Maybe<Relationship>;
  status?: Maybe<StatusMessage>;
};

export type Follower = {
  __typename?: 'Follower';
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  userName: Scalars['String']['output'];
};

export type Following = {
  __typename?: 'Following';
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  relationship?: Maybe<Relationship>;
  userName: Scalars['String']['output'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ListItem = {
  __typename?: 'ListItem';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  loggedOut: Scalars['Boolean']['output'];
};

export type ManyBuildInput = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  buildName: Scalars['String']['input'];
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  touchArray: Array<InputMaybe<TouchInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBuildToRecipeBook: StatusMessage;
  blockUser?: Maybe<StatusMessage>;
  changeBuildPermission?: Maybe<BuildPermissionResponse>;
  changeRecipeBookPermission: RecipeBookShare;
  createBuild?: Maybe<Build>;
  createIngredient: Ingredient;
  createManyIngredients: StatusMessage;
  createManyRecipes: StatusMessage;
  createRecipe: Recipe;
  createRecipeBook: RecipeBook;
  deleteBuildPermission?: Maybe<BuildPermissionResponse>;
  followUser?: Maybe<StatusMessage>;
  getNewTokens: AuthPayload;
  login: AuthPayload;
  logout: LogoutResponse;
  removeBuild?: Maybe<Build>;
  removeBuildFromRecipeBook: StatusMessage;
  removeIngredient?: Maybe<Ingredient>;
  removeRecipe?: Maybe<Recipe>;
  removeRecipeBook: StatusMessage;
  removeRecipeBookPermission: StatusMessage;
  signup: AuthPayload;
  unFollowUser?: Maybe<StatusMessage>;
  unblockUser?: Maybe<StatusMessage>;
  updateBuild?: Maybe<ArchiveResponse>;
  updateIngredient: Ingredient;
  updateManyBuilds?: Maybe<StatusMessage>;
  updateProfile: Profile;
  updateRecipe: Recipe;
  updateRecipeBook: RecipeBook;
  updateTouch?: Maybe<Array<Maybe<Touch>>>;
};


export type MutationAddBuildToRecipeBookArgs = {
  bookPermission: Permission;
  buildId: Scalars['String']['input'];
  buildPermission: Permission;
  recipeBookId: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  blockId: Scalars['String']['input'];
};


export type MutationChangeBuildPermissionArgs = {
  changeBuildPermissionInput?: InputMaybe<ChangeBuildPermissionInput>;
};


export type MutationChangeRecipeBookPermissionArgs = {
  desiredPermission?: InputMaybe<Permission>;
  recipeBookId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  userPermission?: InputMaybe<Permission>;
};


export type MutationCreateBuildArgs = {
  createBuildInput?: InputMaybe<CreateBuildInput>;
};


export type MutationCreateIngredientArgs = {
  createIngredientInput: CreateIngredientInput;
};


export type MutationCreateManyIngredientsArgs = {
  createManyIngredientInputs: Array<InputMaybe<CreateIngredientInput>>;
};


export type MutationCreateManyRecipesArgs = {
  createManyRecipeInputs: Array<InputMaybe<CreateRecipeInput>>;
};


export type MutationCreateRecipeArgs = {
  createRecipeInput: CreateRecipeInput;
};


export type MutationCreateRecipeBookArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationDeleteBuildPermissionArgs = {
  changeBuildPermissionInput?: InputMaybe<ChangeBuildPermissionInput>;
};


export type MutationFollowUserArgs = {
  followId: Scalars['String']['input'];
  relationship?: InputMaybe<Relationship>;
};


export type MutationGetNewTokensArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationRemoveBuildArgs = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Permission>;
};


export type MutationRemoveBuildFromRecipeBookArgs = {
  bookPermission: Permission;
  buildId: Scalars['String']['input'];
  recipeBookId: Scalars['String']['input'];
};


export type MutationRemoveIngredientArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRecipeBookArgs = {
  id: Scalars['String']['input'];
  permission: Permission;
};


export type MutationRemoveRecipeBookPermissionArgs = {
  permission?: InputMaybe<Permission>;
  recipeBookId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUnFollowUserArgs = {
  unfollowId: Scalars['String']['input'];
};


export type MutationUnblockUserArgs = {
  unblockId: Scalars['String']['input'];
};


export type MutationUpdateBuildArgs = {
  updateBuildInput?: InputMaybe<UpdateBuildInput>;
};


export type MutationUpdateIngredientArgs = {
  updateIngredientInput: UpdateIngredientInput;
};


export type MutationUpdateManyBuildsArgs = {
  updateManyBuildInput: Array<InputMaybe<UpdateManyBuildInput>>;
};


export type MutationUpdateProfileArgs = {
  image?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateRecipeArgs = {
  updateRecipeInput: UpdateRecipeInput;
};


export type MutationUpdateRecipeBookArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permission: Permission;
};


export type MutationUpdateTouchArgs = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  newTouchArray?: InputMaybe<Array<InputMaybe<TouchInput>>>;
  permission?: InputMaybe<Permission>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type NewTokenResponse = {
  __typename?: 'NewTokenResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export enum Permission {
  Blocked = 'BLOCKED',
  Edit = 'EDIT',
  Manager = 'MANAGER',
  Owner = 'OWNER',
  View = 'VIEW'
}

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ProfileInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allRecipeBooks: Array<Maybe<RecipeBook>>;
  allUsers: Array<Maybe<User>>;
  findAllBuilds?: Maybe<Array<Maybe<Build>>>;
  findBuildUsers?: Maybe<Array<Maybe<BuildUser>>>;
  findFolloweddUsersBookPermission?: Maybe<Array<Maybe<UserBookPermission>>>;
  findFolloweddUsersBuildPermission?: Maybe<Array<Maybe<UserBuildPermission>>>;
  findFollowers?: Maybe<Array<Maybe<User>>>;
  findFollows?: Maybe<Array<Maybe<User>>>;
  findOneBuild?: Maybe<Build>;
  getProfile: Profile;
  getUserRelationships?: Maybe<Array<Maybe<UserRelation>>>;
  hello: Scalars['String']['output'];
  ingredient?: Maybe<Ingredient>;
  ingredients: Array<Maybe<Ingredient>>;
  recipe?: Maybe<Recipe>;
  recipeBook?: Maybe<RecipeBook>;
  recipeList: Array<Maybe<ListItem>>;
  recipes: Array<Maybe<Recipe>>;
  userById?: Maybe<User>;
  userRecipe?: Maybe<Array<Maybe<Recipe>>>;
  userRecipeBooks?: Maybe<Array<Maybe<RecipeBook>>>;
  usersBuilds?: Maybe<Array<Maybe<Build>>>;
};


export type QueryFindBuildUsersArgs = {
  buildId: Scalars['String']['input'];
};


export type QueryFindFolloweddUsersBookPermissionArgs = {
  recipeBookId: Scalars['String']['input'];
};


export type QueryFindFolloweddUsersBuildPermissionArgs = {
  buildId: Scalars['String']['input'];
};


export type QueryFindOneBuildArgs = {
  buildName: Scalars['String']['input'];
  recipeName: Scalars['String']['input'];
};


export type QueryGetProfileArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIngredientArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipeArgs = {
  name: Scalars['String']['input'];
};


export type QueryRecipeBookArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  about?: Maybe<Scalars['String']['output']>;
  build?: Maybe<Array<Maybe<Build>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  editeById?: Maybe<Scalars['String']['output']>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  userBuild: Array<Build>;
};

export type RecipeBook = {
  __typename?: 'RecipeBook';
  build: Array<Build>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permission?: Maybe<Permission>;
};

export type RecipeBookShare = {
  __typename?: 'RecipeBookShare';
  recipeBook?: Maybe<RecipeBookUser>;
  status?: Maybe<StatusMessage>;
};

export type RecipeBookUser = {
  __typename?: 'RecipeBookUser';
  permission: Permission;
  recipeBook: RecipeBook;
  user: User;
};

export type RecipeNameInput = {
  name: Scalars['String']['input'];
};

export enum Relationship {
  Blocked = 'Blocked',
  Close = 'Close',
  Favorite = 'Favorite',
  Following = 'Following'
}

export type StatusMessage = {
  __typename?: 'StatusMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type Touch = {
  __typename?: 'Touch';
  amount?: Maybe<Scalars['Float']['output']>;
  build?: Maybe<Build>;
  id: Scalars['ID']['output'];
  ingredient?: Maybe<Ingredient>;
  order?: Maybe<Scalars['Int']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type TouchInput = {
  amount: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  ingredientName: Scalars['String']['input'];
  unit: Scalars['String']['input'];
};

export type UpdateBuildInput = {
  buildId: Scalars['String']['input'];
  buildName?: InputMaybe<Scalars['String']['input']>;
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Permission>;
  recipe: RecipeNameInput;
  touchArray: Array<InputMaybe<TouchInput>>;
};

export type UpdateIngredientInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateManyBuildInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  build: ManyBuildInput;
  name: Scalars['String']['input'];
};

export type UpdateRecipeInput = {
  about: Scalars['String']['input'];
  build: UpdateBuildInput;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  allBuilds?: Maybe<Array<Maybe<Build>>>;
  buildEditedBy?: Maybe<Array<Maybe<Build>>>;
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  followedBy?: Maybe<Array<Maybe<Follower>>>;
  following?: Maybe<Array<Maybe<Following>>>;
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  myBuild?: Maybe<Array<Maybe<Build>>>;
  profile?: Maybe<Profile>;
  userName: Scalars['String']['output'];
};

export type UserBookPermission = {
  __typename?: 'UserBookPermission';
  permission?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type UserBuildPermission = {
  __typename?: 'UserBuildPermission';
  permission?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type UserRelation = {
  __typename?: 'UserRelation';
  followedBy: Scalars['Boolean']['output'];
  following: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, userName: string, email?: any | null, profile?: { __typename?: 'Profile', image?: string | null } | null } } };

export type SignupMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', email?: any | null, id: string, userName: string } } };

export type GetTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type GetTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', email?: any | null, id: string, userName: string, profile?: { __typename?: 'Profile', image?: string | null } | null } } };

export type LogOutMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type LogOutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', loggedOut: boolean } };

export type CreateManyIngredientsMutationVariables = Exact<{
  createManyIngredientInputs: Array<InputMaybe<CreateIngredientInput>> | InputMaybe<CreateIngredientInput>;
}>;


export type CreateManyIngredientsMutation = { __typename?: 'Mutation', createManyIngredients: { __typename?: 'StatusMessage', message?: string | null } };

export type CreateBookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createRecipeBook: { __typename?: 'RecipeBook', id: string, name: string, description: string, permission?: Permission | null, build: Array<{ __typename?: 'Build', id: string }> } };

export type AddBuildToRecipeBookMutationVariables = Exact<{
  recipeBookId: Scalars['String']['input'];
  buildId: Scalars['String']['input'];
  buildPermission: Permission;
  bookPermission: Permission;
}>;


export type AddBuildToRecipeBookMutation = { __typename?: 'Mutation', addBuildToRecipeBook: { __typename?: 'StatusMessage', message?: string | null } };

export type RemoveBuildMutationVariables = Exact<{
  recipeBookId: Scalars['String']['input'];
  buildId: Scalars['String']['input'];
  bookPermission: Permission;
}>;


export type RemoveBuildMutation = { __typename?: 'Mutation', removeBuildFromRecipeBook: { __typename?: 'StatusMessage', message?: string | null } };

export type GetRecipeBookQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRecipeBookQuery = { __typename?: 'Query', recipeBook?: { __typename?: 'RecipeBook', id: string, name: string, description: string, permission?: Permission | null, build: Array<{ __typename?: 'Build', buildName: string, ice?: string | null, id: string, instructions?: string | null, notes?: string | null, permission?: Permission | null, recipe: { __typename?: 'Recipe', name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, order?: number | null, unit?: string | null, version?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> }> } | null };

export type UpdateRecipeBookMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permission: Permission;
}>;


export type UpdateRecipeBookMutation = { __typename?: 'Mutation', updateRecipeBook: { __typename?: 'RecipeBook', build: Array<{ __typename?: 'Build', id: string, buildName: string, recipe: { __typename?: 'Recipe', id: string, name: string }, touch: Array<{ __typename?: 'Touch', id: string }> }>, createdBy?: { __typename?: 'User', id: string, userName: string } | null } };

export type ChangeRecipeBookPermissionMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  recipeBookId: Scalars['String']['input'];
  userPermission?: InputMaybe<Permission>;
  desiredPermission?: InputMaybe<Permission>;
}>;


export type ChangeRecipeBookPermissionMutation = { __typename?: 'Mutation', changeRecipeBookPermission: { __typename?: 'RecipeBookShare', status?: { __typename?: 'StatusMessage', message?: string | null } | null } };

export type RemoveRecipeBookPermissionMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  recipeBookId: Scalars['String']['input'];
  permission?: InputMaybe<Permission>;
}>;


export type RemoveRecipeBookPermissionMutation = { __typename?: 'Mutation', removeRecipeBookPermission: { __typename?: 'StatusMessage', message?: string | null } };

export type CreateRecipeMutationVariables = Exact<{
  createRecipeInput: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', name: string, createdAt?: any | null, build?: Array<{ __typename?: 'Build', buildName: string, ice?: string | null, id: string, instructions?: string | null, notes?: string | null, permission?: Permission | null, recipe: { __typename?: 'Recipe', name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, order?: number | null, unit?: string | null, version?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> } | null> | null } };

export type AddBuildMutationVariables = Exact<{
  createBuildInput?: InputMaybe<CreateBuildInput>;
}>;


export type AddBuildMutation = { __typename?: 'Mutation', createBuild?: { __typename?: 'Build', id: string, buildName: string, ice?: string | null, instructions?: string | null, notes?: string | null, permission?: Permission | null, recipe: { __typename?: 'Recipe', name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, order?: number | null, unit?: string | null, version?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> } | null };

export type UpdateRecipeMutationVariables = Exact<{
  updateRecipeInput: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe: { __typename?: 'Recipe', id: string, name: string, about?: string | null, build?: Array<{ __typename?: 'Build', id: string, buildName: string, ice?: string | null, glassware?: string | null, instructions?: string | null, recipe: { __typename?: 'Recipe', name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, version?: number | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> } | null> | null } };

export type UpdateBuildMutationVariables = Exact<{
  updateBuildInput?: InputMaybe<UpdateBuildInput>;
}>;


export type UpdateBuildMutation = { __typename?: 'Mutation', updateBuild?: { __typename?: 'ArchiveResponse', build?: { __typename?: 'Build', id: string, buildName: string, glassware?: string | null, ice?: string | null, instructions?: string | null, permission?: Permission | null, recipe: { __typename?: 'Recipe', name: string }, touch: Array<{ __typename?: 'Touch', id: string, order?: number | null, unit?: string | null, amount?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> } | null } | null };

export type DeleteBuildMutationVariables = Exact<{
  buildId?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Permission>;
}>;


export type DeleteBuildMutation = { __typename?: 'Mutation', removeBuild?: { __typename?: 'Build', id: string, buildName: string, instructions?: string | null, permission?: Permission | null, ice?: string | null, glassware?: string | null, recipe: { __typename?: 'Recipe', id: string, name: string, about?: string | null }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', name: string, id: string } | null }> } | null };

export type ChangeBuildPermissionMutationVariables = Exact<{
  changeBuildPermissionInput?: InputMaybe<ChangeBuildPermissionInput>;
}>;


export type ChangeBuildPermissionMutation = { __typename?: 'Mutation', changeBuildPermission?: { __typename?: 'BuildPermissionResponse', status?: { __typename?: 'StatusMessage', message?: string | null } | null } | null };

export type RemoveBuildPermissionMutationVariables = Exact<{
  changeBuildPermissionInput?: InputMaybe<ChangeBuildPermissionInput>;
}>;


export type RemoveBuildPermissionMutation = { __typename?: 'Mutation', deleteBuildPermission?: { __typename?: 'BuildPermissionResponse', status?: { __typename?: 'StatusMessage', message?: string | null } | null } | null };

export type FollowMutationVariables = Exact<{
  followId: Scalars['String']['input'];
  relationship?: InputMaybe<Relationship>;
}>;


export type FollowMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'StatusMessage', message?: string | null } | null };

export type UnFollowMutationVariables = Exact<{
  unfollowId: Scalars['String']['input'];
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollowUser?: { __typename?: 'StatusMessage', message?: string | null } | null };

export type IngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, description?: string | null, name: string } | null> };

export type GetRecipeQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, about?: string | null, userBuild: Array<{ __typename?: 'Build', id: string, buildName: string, instructions?: string | null, ice?: string | null, glassware?: string | null, permission?: Permission | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null, recipe: { __typename?: 'Recipe', id: string, name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string, description?: string | null } | null }> }> } | null };

export type UserBuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBuildsQuery = { __typename?: 'Query', usersBuilds?: Array<{ __typename?: 'Build', id: string, buildName: string, glassware?: string | null, ice?: string | null, instructions?: string | null, permission?: Permission | null, recipe: { __typename?: 'Recipe', id: string, name: string, about?: string | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string, description?: string | null } | null }> } | null> | null };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', userRecipe?: Array<{ __typename?: 'Recipe', id: string, name: string, about?: string | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null, userBuild: Array<{ __typename?: 'Build', id: string, buildName: string, instructions?: string | null, ice?: string | null, glassware?: string | null, permission?: Permission | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null, recipe: { __typename?: 'Recipe', id: string, name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string, description?: string | null } | null }> }> } | null> | null };

export type RecipeListQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeListQuery = { __typename?: 'Query', recipeList: Array<{ __typename?: 'ListItem', id: string, name: string } | null>, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string } | null> };

export type FindFolloweddUsersBuildPermissionQueryVariables = Exact<{
  buildId: Scalars['String']['input'];
}>;


export type FindFolloweddUsersBuildPermissionQuery = { __typename?: 'Query', findFolloweddUsersBuildPermission?: Array<{ __typename?: 'UserBuildPermission', permission?: string | null, user: { __typename?: 'User', userName: string, id: string } } | null> | null };

export type FindOneBuildQueryVariables = Exact<{
  recipeName: Scalars['String']['input'];
  buildName: Scalars['String']['input'];
}>;


export type FindOneBuildQuery = { __typename?: 'Query', findOneBuild?: { __typename?: 'Build', id: string, buildName: string, instructions?: string | null, ice?: string | null, glassware?: string | null, recipe: { __typename?: 'Recipe', id: string, name: string, about?: string | null }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string } | null }> } | null };

export type UserRecipeBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRecipeBooksQuery = { __typename?: 'Query', userRecipeBooks?: Array<{ __typename?: 'RecipeBook', id: string, name: string, description: string, permission?: Permission | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null, build: Array<{ __typename?: 'Build', id: string, buildName: string, instructions?: string | null, ice?: string | null, glassware?: string | null, permission?: Permission | null, createdBy?: { __typename?: 'User', id: string, userName: string } | null, recipe: { __typename?: 'Recipe', id: string, name: string }, touch: Array<{ __typename?: 'Touch', id: string, amount?: number | null, unit?: string | null, order?: number | null, ingredient?: { __typename?: 'Ingredient', id: string, name: string, description?: string | null } | null }> }> } | null> | null };

export type BookPermissionQueryVariables = Exact<{
  recipeBookId: Scalars['String']['input'];
}>;


export type BookPermissionQuery = { __typename?: 'Query', findFolloweddUsersBookPermission?: Array<{ __typename?: 'UserBookPermission', permission?: string | null, user: { __typename?: 'User', id: string, userName: string } } | null> | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, userName: string, email?: any | null } | null> };

export type GetRelationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRelationsQuery = { __typename?: 'Query', getUserRelationships?: Array<{ __typename?: 'UserRelation', id: string, userName: string, following: boolean, followedBy: boolean } | null> | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const GetTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTokensMutation, GetTokensMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loggedOut"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const CreateManyIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateManyIngredients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createManyIngredientInputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIngredientInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManyIngredients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createManyIngredientInputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createManyIngredientInputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateManyIngredientsMutation, CreateManyIngredientsMutationVariables>;
export const CreateBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookMutation, CreateBookMutationVariables>;
export const AddBuildToRecipeBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBuildToRecipeBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildPermission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookPermission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBuildToRecipeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipeBookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildPermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildPermission"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookPermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookPermission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AddBuildToRecipeBookMutation, AddBuildToRecipeBookMutationVariables>;
export const RemoveBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookPermission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBuildFromRecipeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipeBookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookPermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookPermission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveBuildMutation, RemoveBuildMutationVariables>;
export const GetRecipeBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipeBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeBookQuery, GetRecipeBookQueryVariables>;
export const UpdateRecipeBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipeBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeBookMutation, UpdateRecipeBookMutationVariables>;
export const ChangeRecipeBookPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeRecipeBookPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPermission"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"desiredPermission"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeRecipeBookPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recipeBookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userPermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPermission"}}},{"kind":"Argument","name":{"kind":"Name","value":"desiredPermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"desiredPermission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeRecipeBookPermissionMutation, ChangeRecipeBookPermissionMutationVariables>;
export const RemoveRecipeBookPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeBookPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeBookPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recipeBookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveRecipeBookPermissionMutation, RemoveRecipeBookPermissionMutationVariables>;
export const CreateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRecipeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRecipeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRecipeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const AddBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBuildInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBuildInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBuild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBuildInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBuildInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBuildMutation, AddBuildMutationVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRecipeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateRecipeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRecipeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const UpdateBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBuildInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBuildInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBuild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBuildInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBuildInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBuildMutation, UpdateBuildMutationVariables>;
export const DeleteBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBuild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}}]}}]}}]} as unknown as DocumentNode<DeleteBuildMutation, DeleteBuildMutationVariables>;
export const ChangeBuildPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeBuildPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeBuildPermissionInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeBuildPermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeBuildPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changeBuildPermissionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeBuildPermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeBuildPermissionMutation, ChangeBuildPermissionMutationVariables>;
export const RemoveBuildPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBuildPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeBuildPermissionInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeBuildPermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBuildPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changeBuildPermissionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeBuildPermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveBuildPermissionMutation, RemoveBuildPermissionMutationVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"relationship"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Relationship"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followId"}}},{"kind":"Argument","name":{"kind":"Name","value":"relationship"},"value":{"kind":"Variable","name":{"kind":"Name","value":"relationship"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const UnFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unfollowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"unfollowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unfollowId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UnFollowMutation, UnFollowMutationVariables>;
export const IngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<IngredientsQuery, IngredientsQueryVariables>;
export const GetRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"userBuild"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeQuery, GetRecipeQueryVariables>;
export const UserBuildsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userBuilds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersBuilds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserBuildsQuery, UserBuildsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRecipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userBuild"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const RecipeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecipeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RecipeListQuery, RecipeListQueryVariables>;
export const FindFolloweddUsersBuildPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindFolloweddUsersBuildPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findFolloweddUsersBuildPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<FindFolloweddUsersBuildPermissionQuery, FindFolloweddUsersBuildPermissionQueryVariables>;
export const FindOneBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneBuild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipeName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeName"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"about"}}]}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<FindOneBuildQuery, FindOneBuildQueryVariables>;
export const UserRecipeBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRecipeBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRecipeBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"build"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildName"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ice"}},{"kind":"Field","name":{"kind":"Name","value":"glassware"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"touch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserRecipeBooksQuery, UserRecipeBooksQueryVariables>;
export const BookPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bookPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findFolloweddUsersBookPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipeBookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeBookId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<BookPermissionQuery, BookPermissionQueryVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const GetRelationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRelations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserRelationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}}]}}]}}]} as unknown as DocumentNode<GetRelationsQuery, GetRelationsQueryVariables>;