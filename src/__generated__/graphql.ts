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
  buildId: Scalars['ID']['output'];
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
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  glassware?: Maybe<Scalars['String']['output']>;
  ice?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Permission>;
  recipe: Recipe;
  touch: Array<Maybe<Touch>>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type BuildPermissionResponse = {
  __typename?: 'BuildPermissionResponse';
  buildUser?: Maybe<BuildUser>;
  permission?: Maybe<Permission>;
};

export type BuildResponse = {
  __typename?: 'BuildResponse';
  build?: Maybe<Build>;
  permission?: Maybe<Permission>;
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

export type CompleteBuild = {
  __typename?: 'CompleteBuild';
  about?: Maybe<Scalars['String']['output']>;
  buildName: Scalars['String']['output'];
  completeTouch?: Maybe<Array<Maybe<CompleteTouch>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  glassware?: Maybe<Scalars['String']['output']>;
  ice?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Permission>;
};

export type CompleteTouch = {
  __typename?: 'CompleteTouch';
  amount?: Maybe<Scalars['Float']['output']>;
  cost?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  ingredientName?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type CreateBuildInput = {
  buildName: Scalars['String']['input'];
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  recipeId: Scalars['ID']['input'];
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
  name: Scalars['String']['input'];
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
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  userName: Scalars['String']['output'];
};

export type Following = {
  __typename?: 'Following';
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  relationship?: Maybe<Relationship>;
  userName: Scalars['String']['output'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  blockUser?: Maybe<StatusMessage>;
  changeBuildPermission?: Maybe<BuildPermissionResponse>;
  createBuild?: Maybe<BuildResponse>;
  createIngredient: Ingredient;
  createManyIngredients: StatusMessage;
  createManyRecipes: StatusMessage;
  createRecipe: Recipe;
  deleteBuildPermission?: Maybe<BuildPermissionResponse>;
  followUser?: Maybe<StatusMessage>;
  getNewTokens: AuthPayload;
  login: AuthPayload;
  logout: LogoutResponse;
  removeBuild?: Maybe<BuildResponse>;
  removeIngredient?: Maybe<Ingredient>;
  removeRecipe?: Maybe<Recipe>;
  signup: AuthPayload;
  unFollowUser?: Maybe<StatusMessage>;
  unblockUser?: Maybe<StatusMessage>;
  updateBuild?: Maybe<ArchiveResponse>;
  updateIngredient: Ingredient;
  updateRecipe: Recipe;
  updateTouch?: Maybe<Array<Maybe<Touch>>>;
};


export type MutationBlockUserArgs = {
  blockId: Scalars['String']['input'];
};


export type MutationChangeBuildPermissionArgs = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  desiredPermission?: InputMaybe<Permission>;
  userId?: InputMaybe<Scalars['String']['input']>;
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


export type MutationDeleteBuildPermissionArgs = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Permission>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userPermission?: InputMaybe<Permission>;
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


export type MutationRemoveIngredientArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateRecipeArgs = {
  updateRecipeInput: UpdateRecipeInput;
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

export type Query = {
  __typename?: 'Query';
  allUsers: Array<Maybe<User>>;
  findAllBuilds?: Maybe<Array<Maybe<Build>>>;
  findOneBuild?: Maybe<Build>;
  hello: Scalars['String']['output'];
  ingredient?: Maybe<Ingredient>;
  ingredients: Array<Maybe<Ingredient>>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Maybe<Recipe>>;
  userById?: Maybe<User>;
  usersBuilds?: Maybe<Array<Maybe<Recipe>>>;
};


export type QueryIngredientArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['Int']['input'];
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
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
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
  amount?: InputMaybe<Scalars['Float']['input']>;
  ingredientName?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBuildInput = {
  buildId: Scalars['String']['input'];
  buildName?: InputMaybe<Scalars['String']['input']>;
  glassware?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Permission>;
  recipeId: Scalars['ID']['input'];
  touchArray: Array<InputMaybe<TouchInput>>;
};

export type UpdateIngredientInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateRecipeInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  email: Scalars['EmailAddress']['output'];
  followedBy?: Maybe<Array<Maybe<Follower>>>;
  following?: Maybe<Array<Maybe<Following>>>;
  id: Scalars['ID']['output'];
  lastEdited?: Maybe<Scalars['DateTime']['output']>;
  myBuild?: Maybe<Array<Maybe<Build>>>;
  userName: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, userName: string, email: any } } };

export type SignupMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: any, id: string, userName: string } } };

export type GetTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type GetTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: any, id: string, userName: string } } };

export type LogOutMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type LogOutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', loggedOut: boolean } };

export type CreateManyIngredientsMutationVariables = Exact<{
  createManyIngredientInputs: Array<InputMaybe<CreateIngredientInput>> | InputMaybe<CreateIngredientInput>;
}>;


export type CreateManyIngredientsMutation = { __typename?: 'Mutation', createManyIngredients: { __typename?: 'StatusMessage', message?: string | null } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, userName: string } | null> };

export type IngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, description: string, name: string } | null> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const GetTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokensMutation, GetTokensMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loggedOut"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const CreateManyIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateManyIngredients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createManyIngredientInputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIngredientInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManyIngredients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createManyIngredientInputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createManyIngredientInputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateManyIngredientsMutation, CreateManyIngredientsMutationVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const IngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<IngredientsQuery, IngredientsQueryVariables>;