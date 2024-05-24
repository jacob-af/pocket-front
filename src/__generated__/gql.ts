/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Signup($createUserInput: CreateUserInput!) {\n    signup(createUserInput: $createUserInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n      }\n    }\n  }\n": types.SignupDocument,
    "\n  mutation Mutation(\n    $googleUserId: String!\n    $email: String!\n    $name: String!\n    $accessToken: String!\n    $tokenExpiry: DateTime!\n  ) {\n    googleSignIn(\n      googleUserId: $googleUserId\n      email: $email\n      name: $name\n      accessToken: $accessToken\n      tokenExpiry: $tokenExpiry\n    ) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n": types.MutationDocument,
    "\n  mutation GetTokens($refreshToken: String!) {\n    getNewTokens(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n        profile {\n          image\n        }\n      }\n    }\n  }\n": types.GetTokensDocument,
    "\n  mutation LogOut($userId: ID!) {\n    logout(userId: $userId) {\n      loggedOut\n    }\n  }\n": types.LogOutDocument,
    "\n  mutation CreateManyIngredients(\n    $createManyIngredientInputs: [CreateIngredientInput]!\n  ) {\n    createManyIngredients(\n      createManyIngredientInputs: $createManyIngredientInputs\n    ) {\n      message\n    }\n  }\n": types.CreateManyIngredientsDocument,
    "\n  mutation CreateBook($name: String!, $description: String) {\n    createRecipeBook(name: $name, description: $description) {\n      id\n      name\n      description\n      permission\n      build {\n        id\n      }\n    }\n  }\n": types.CreateBookDocument,
    "\n  mutation UpdateRecipeBook(\n    $id: String!\n    $name: String!\n    $permission: Permission!\n  ) {\n    updateRecipeBook(id: $id, name: $name, permission: $permission) {\n      build {\n        recipe {\n          id\n          name\n        }\n        id\n        buildName\n        touch {\n          id\n        }\n      }\n      createdBy {\n        id\n        userName\n      }\n    }\n  }\n": types.UpdateRecipeBookDocument,
    "\n  mutation RemoveRecipeBook($id: String!, $permission: Permission!) {\n    removeRecipeBook(id: $id, permission: $permission) {\n      message\n    }\n  }\n": types.RemoveRecipeBookDocument,
    "\n  mutation AddBuildToRecipeBook(\n    $recipeBookId: String!\n    $buildId: String!\n    $buildPermission: Permission!\n    $bookPermission: Permission!\n  ) {\n    addBuildToRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      buildPermission: $buildPermission\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n": types.AddBuildToRecipeBookDocument,
    "\n  mutation RemoveBuild(\n    $recipeBookId: String!\n    $buildId: String!\n    $bookPermission: Permission!\n  ) {\n    removeBuildFromRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n": types.RemoveBuildDocument,
    "\n  mutation ChangeRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $userPermission: Permission\n    $desiredPermission: Permission\n  ) {\n    changeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      userPermission: $userPermission\n      desiredPermission: $desiredPermission\n    ) {\n      status {\n        message\n      }\n    }\n  }\n": types.ChangeRecipeBookPermissionDocument,
    "\n  mutation RemoveRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $permission: Permission\n  ) {\n    removeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      permission: $permission\n    ) {\n      message\n    }\n  }\n": types.RemoveRecipeBookPermissionDocument,
    "\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      userBuild {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CreateRecipeDocument,
    "\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.AddBuildDocument,
    "\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      userBuild {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n": types.UpdateBuildDocument,
    "\n  mutation DeleteBuild($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n": types.DeleteBuildDocument,
    "\n  mutation ChangeBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    changeBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n": types.ChangeBuildPermissionDocument,
    "\n  mutation RemoveBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    deleteBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n": types.RemoveBuildPermissionDocument,
    "\n  mutation Follow($followId: String!, $relationship: Relationship) {\n    followUser(followId: $followId, relationship: $relationship) {\n      message\n    }\n  }\n": types.FollowDocument,
    "\n  mutation unFollow($unfollowId: String!) {\n    unFollowUser(unfollowId: $unfollowId) {\n      message\n    }\n  }\n": types.UnFollowDocument,
    "\n  query Ingredients {\n    ingredients {\n      id\n      description\n      name\n    }\n  }\n": types.IngredientsDocument,
    "\n  query getRecipe($name: String!) {\n    recipe(name: $name) {\n      id\n      name\n      about\n      userBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.GetRecipeDocument,
    "\n  query publicRecipe($name: String!) {\n    publicRecipe(name: $name) {\n      id\n      name\n      about\n      publicBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.PublicRecipeDocument,
    "\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      createdBy {\n        id\n        userName\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n          description\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n": types.FindOneBuildDocument,
    "\n  query UserRecipeList {\n    userRecipeList {\n      id\n      name\n      userBuild {\n        id\n        buildName\n      }\n    }\n  }\n": types.UserRecipeListDocument,
    "\n  query PublicRecipeList {\n    publicRecipeList {\n      id\n      name\n      publicBuild {\n        id\n        buildName\n      }\n    }\n  }\n": types.PublicRecipeListDocument,
    "\n  query RecipeList {\n    publicRecipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n": types.RecipeListDocument,
    "\n  query userRecipes($skip: Int, $take: Int) {\n    userRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.UserRecipesDocument,
    "\n  query PublicRecipes($skip: Int, $take: Int) {\n    publicRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      publicBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.PublicRecipesDocument,
    "\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n": types.FindFolloweddUsersBuildPermissionDocument,
    "\n  query UserBooks {\n    userBooks {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        id\n        buildName\n        recipe {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.UserBooksDocument,
    "\n  query UserBookList {\n    userBookList {\n      id\n      name\n    }\n  }\n": types.UserBookListDocument,
    "\n  query bookPermission($recipeBookId: String!) {\n    findFolloweddUsersBookPermission(recipeBookId: $recipeBookId) {\n      permission\n      user {\n        id\n        userName\n      }\n    }\n  }\n": types.BookPermissionDocument,
    "\n  query book($name: String) {\n    book(name: $name) {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.BookDocument,
    "\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n": types.AllUsersDocument,
    "\n  query getRelations {\n    getUserRelationships {\n      id\n      userName\n      following\n      followedBy\n    }\n  }\n  #query allRelations {\n  # allUsers {\n  #   id\n  #   userName\n  #   email\n  # }\n  # findFollowers {\n  #   userName\n  #   id\n  #   email\n  # }\n  # findFollows {\n  #   userName\n  #   id\n  #   email\n  # }\n  #}\n": types.GetRelationsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup($createUserInput: CreateUserInput!) {\n    signup(createUserInput: $createUserInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Signup($createUserInput: CreateUserInput!) {\n    signup(createUserInput: $createUserInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation(\n    $googleUserId: String!\n    $email: String!\n    $name: String!\n    $accessToken: String!\n    $tokenExpiry: DateTime!\n  ) {\n    googleSignIn(\n      googleUserId: $googleUserId\n      email: $email\n      name: $name\n      accessToken: $accessToken\n      tokenExpiry: $tokenExpiry\n    ) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation(\n    $googleUserId: String!\n    $email: String!\n    $name: String!\n    $accessToken: String!\n    $tokenExpiry: DateTime!\n  ) {\n    googleSignIn(\n      googleUserId: $googleUserId\n      email: $email\n      name: $name\n      accessToken: $accessToken\n      tokenExpiry: $tokenExpiry\n    ) {\n      accessToken\n      refreshToken\n      user {\n        id\n        userName\n        email\n        profile {\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GetTokens($refreshToken: String!) {\n    getNewTokens(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n        profile {\n          image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation GetTokens($refreshToken: String!) {\n    getNewTokens(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n        profile {\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogOut($userId: ID!) {\n    logout(userId: $userId) {\n      loggedOut\n    }\n  }\n"): (typeof documents)["\n  mutation LogOut($userId: ID!) {\n    logout(userId: $userId) {\n      loggedOut\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateManyIngredients(\n    $createManyIngredientInputs: [CreateIngredientInput]!\n  ) {\n    createManyIngredients(\n      createManyIngredientInputs: $createManyIngredientInputs\n    ) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CreateManyIngredients(\n    $createManyIngredientInputs: [CreateIngredientInput]!\n  ) {\n    createManyIngredients(\n      createManyIngredientInputs: $createManyIngredientInputs\n    ) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBook($name: String!, $description: String) {\n    createRecipeBook(name: $name, description: $description) {\n      id\n      name\n      description\n      permission\n      build {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBook($name: String!, $description: String) {\n    createRecipeBook(name: $name, description: $description) {\n      id\n      name\n      description\n      permission\n      build {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateRecipeBook(\n    $id: String!\n    $name: String!\n    $permission: Permission!\n  ) {\n    updateRecipeBook(id: $id, name: $name, permission: $permission) {\n      build {\n        recipe {\n          id\n          name\n        }\n        id\n        buildName\n        touch {\n          id\n        }\n      }\n      createdBy {\n        id\n        userName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipeBook(\n    $id: String!\n    $name: String!\n    $permission: Permission!\n  ) {\n    updateRecipeBook(id: $id, name: $name, permission: $permission) {\n      build {\n        recipe {\n          id\n          name\n        }\n        id\n        buildName\n        touch {\n          id\n        }\n      }\n      createdBy {\n        id\n        userName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveRecipeBook($id: String!, $permission: Permission!) {\n    removeRecipeBook(id: $id, permission: $permission) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeBook($id: String!, $permission: Permission!) {\n    removeRecipeBook(id: $id, permission: $permission) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBuildToRecipeBook(\n    $recipeBookId: String!\n    $buildId: String!\n    $buildPermission: Permission!\n    $bookPermission: Permission!\n  ) {\n    addBuildToRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      buildPermission: $buildPermission\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation AddBuildToRecipeBook(\n    $recipeBookId: String!\n    $buildId: String!\n    $buildPermission: Permission!\n    $bookPermission: Permission!\n  ) {\n    addBuildToRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      buildPermission: $buildPermission\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveBuild(\n    $recipeBookId: String!\n    $buildId: String!\n    $bookPermission: Permission!\n  ) {\n    removeBuildFromRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveBuild(\n    $recipeBookId: String!\n    $buildId: String!\n    $bookPermission: Permission!\n  ) {\n    removeBuildFromRecipeBook(\n      recipeBookId: $recipeBookId\n      buildId: $buildId\n      bookPermission: $bookPermission\n    ) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $userPermission: Permission\n    $desiredPermission: Permission\n  ) {\n    changeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      userPermission: $userPermission\n      desiredPermission: $desiredPermission\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $userPermission: Permission\n    $desiredPermission: Permission\n  ) {\n    changeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      userPermission: $userPermission\n      desiredPermission: $desiredPermission\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $permission: Permission\n  ) {\n    removeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      permission: $permission\n    ) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeBookPermission(\n    $userId: String!\n    $recipeBookId: String!\n    $permission: Permission\n  ) {\n    removeRecipeBookPermission(\n      userId: $userId\n      recipeBookId: $recipeBookId\n      permission: $permission\n    ) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      userBuild {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      userBuild {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      userBuild {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      userBuild {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteBuild($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBuild($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    changeBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    changeBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    deleteBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    deleteBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Follow($followId: String!, $relationship: Relationship) {\n    followUser(followId: $followId, relationship: $relationship) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Follow($followId: String!, $relationship: Relationship) {\n    followUser(followId: $followId, relationship: $relationship) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unFollow($unfollowId: String!) {\n    unFollowUser(unfollowId: $unfollowId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation unFollow($unfollowId: String!) {\n    unFollowUser(unfollowId: $unfollowId) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Ingredients {\n    ingredients {\n      id\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  query Ingredients {\n    ingredients {\n      id\n      description\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRecipe($name: String!) {\n    recipe(name: $name) {\n      id\n      name\n      about\n      userBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipe($name: String!) {\n    recipe(name: $name) {\n      id\n      name\n      about\n      userBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query publicRecipe($name: String!) {\n    publicRecipe(name: $name) {\n      id\n      name\n      about\n      publicBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query publicRecipe($name: String!) {\n    publicRecipe(name: $name) {\n      id\n      name\n      about\n      publicBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      createdBy {\n        id\n        userName\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n          description\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      createdBy {\n        id\n        userName\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n          description\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserRecipeList {\n    userRecipeList {\n      id\n      name\n      userBuild {\n        id\n        buildName\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserRecipeList {\n    userRecipeList {\n      id\n      name\n      userBuild {\n        id\n        buildName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PublicRecipeList {\n    publicRecipeList {\n      id\n      name\n      publicBuild {\n        id\n        buildName\n      }\n    }\n  }\n"): (typeof documents)["\n  query PublicRecipeList {\n    publicRecipeList {\n      id\n      name\n      publicBuild {\n        id\n        buildName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RecipeList {\n    publicRecipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query RecipeList {\n    publicRecipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userRecipes($skip: Int, $take: Int) {\n    userRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userRecipes($skip: Int, $take: Int) {\n    userRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PublicRecipes($skip: Int, $take: Int) {\n    publicRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      publicBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PublicRecipes($skip: Int, $take: Int) {\n    publicRecipes(skip: $skip, take: $take) {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      publicBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserBooks {\n    userBooks {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        id\n        buildName\n        recipe {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserBooks {\n    userBooks {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        id\n        buildName\n        recipe {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserBookList {\n    userBookList {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query UserBookList {\n    userBookList {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query bookPermission($recipeBookId: String!) {\n    findFolloweddUsersBookPermission(recipeBookId: $recipeBookId) {\n      permission\n      user {\n        id\n        userName\n      }\n    }\n  }\n"): (typeof documents)["\n  query bookPermission($recipeBookId: String!) {\n    findFolloweddUsersBookPermission(recipeBookId: $recipeBookId) {\n      permission\n      user {\n        id\n        userName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query book($name: String) {\n    book(name: $name) {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query book($name: String) {\n    book(name: $name) {\n      id\n      name\n      description\n      permission\n      createdBy {\n        id\n        userName\n      }\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n"): (typeof documents)["\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRelations {\n    getUserRelationships {\n      id\n      userName\n      following\n      followedBy\n    }\n  }\n  #query allRelations {\n  # allUsers {\n  #   id\n  #   userName\n  #   email\n  # }\n  # findFollowers {\n  #   userName\n  #   id\n  #   email\n  # }\n  # findFollows {\n  #   userName\n  #   id\n  #   email\n  # }\n  #}\n"): (typeof documents)["\n  query getRelations {\n    getUserRelationships {\n      id\n      userName\n      following\n      followedBy\n    }\n  }\n  #query allRelations {\n  # allUsers {\n  #   id\n  #   userName\n  #   email\n  # }\n  # findFollowers {\n  #   userName\n  #   id\n  #   email\n  # }\n  # findFollows {\n  #   userName\n  #   id\n  #   email\n  # }\n  #}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;