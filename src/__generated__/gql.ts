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
    "\n  mutation GetTokens($refreshToken: String!) {\n    getNewTokens(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n      user {\n        email\n        id\n        userName\n        profile {\n          image\n        }\n      }\n    }\n  }\n": types.GetTokensDocument,
    "\n  mutation LogOut($userId: ID!) {\n    logout(userId: $userId) {\n      loggedOut\n    }\n  }\n": types.LogOutDocument,
    "\n  mutation CreateManyIngredients(\n    $createManyIngredientInputs: [CreateIngredientInput]!\n  ) {\n    createManyIngredients(\n      createManyIngredientInputs: $createManyIngredientInputs\n    ) {\n      message\n    }\n  }\n": types.CreateManyIngredientsDocument,
    "\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CreateRecipeDocument,
    "\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.AddBuildDocument,
    "\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      build {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n": types.UpdateBuildDocument,
    "\n  mutation Mutation($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n": types.MutationDocument,
    "\n  mutation ChangeBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    changeBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n": types.ChangeBuildPermissionDocument,
    "\n  mutation RemoveBuildPermission(\n    $changeBuildPermissionInput: ChangeBuildPermissionInput\n  ) {\n    deleteBuildPermission(\n      changeBuildPermissionInput: $changeBuildPermissionInput\n    ) {\n      status {\n        message\n      }\n    }\n  }\n": types.RemoveBuildPermissionDocument,
    "\n  mutation Follow($followId: String!, $relationship: Relationship) {\n    followUser(followId: $followId, relationship: $relationship) {\n      message\n    }\n  }\n": types.FollowDocument,
    "\n  mutation unFollow($unfollowId: String!) {\n    unFollowUser(unfollowId: $unfollowId) {\n      message\n    }\n  }\n": types.UnFollowDocument,
    "\n  query Ingredients {\n    ingredients {\n      id\n      description\n      name\n    }\n  }\n": types.IngredientsDocument,
    "\n  query getRecipe($name: String!) {\n    recipe(name: $name) {\n      id\n      name\n      about\n      userBuild {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.GetRecipeDocument,
    "\n  query userBuilds {\n    usersBuilds {\n      id\n      buildName\n      glassware\n      ice\n      instructions\n      permission\n      recipe {\n        id\n        name\n        about\n        createdBy {\n          id\n          userName\n        }\n      }\n      touch {\n        id\n        amount\n        unit\n        order\n        ingredient {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n": types.UserBuildsDocument,
    "\n  query Query {\n    userRecipe {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        permission\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.QueryDocument,
    "\n  query RecipeList {\n    recipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n": types.RecipeListDocument,
    "\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n": types.FindFolloweddUsersBuildPermissionDocument,
    "\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n": types.FindOneBuildDocument,
    "\n  query UserRecipeBooks {\n    userRecipeBooks {\n      id\n      name\n      description\n      permission\n      build {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n": types.UserRecipeBooksDocument,
    "\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n": types.AllUsersDocument,
    "\n  query allRelations {\n    allUsers {\n      id\n      userName\n      email\n    }\n    findFollowers {\n      userName\n      id\n      email\n    }\n    findFollows {\n      userName\n      id\n      email\n    }\n  }\n": types.AllRelationsDocument,
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
export function gql(source: "\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n      createdAt\n      build {\n        buildName\n        ice\n        id\n        instructions\n        notes\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          order\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddBuild($createBuildInput: CreateBuildInput) {\n    createBuild(createBuildInput: $createBuildInput) {\n      id\n      buildName\n      ice\n      instructions\n      notes\n      permission\n      recipe {\n        name\n      }\n      touch {\n        id\n        amount\n        order\n        unit\n        version\n        ingredient {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      build {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {\n    updateRecipe(updateRecipeInput: $updateRecipeInput) {\n      id\n      name\n      about\n      build {\n        id\n        buildName\n        ice\n        glassware\n        instructions\n        recipe {\n          name\n        }\n        touch {\n          id\n          amount\n          unit\n          version\n          ingredient {\n            id\n            name\n          }\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBuild($updateBuildInput: UpdateBuildInput) {\n    updateBuild(updateBuildInput: $updateBuildInput) {\n      build {\n        id\n        buildName\n        glassware\n        ice\n        instructions\n        permission\n        recipe {\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n          }\n          order\n          unit\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($buildId: String, $permission: Permission) {\n    removeBuild(buildId: $buildId, permission: $permission) {\n      id\n      buildName\n      instructions\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        amount\n        unit\n        ingredient {\n          name\n          id\n        }\n        order\n      }\n      permission\n      ice\n      glassware\n    }\n  }\n"];
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
export function gql(source: "\n  query userBuilds {\n    usersBuilds {\n      id\n      buildName\n      glassware\n      ice\n      instructions\n      permission\n      recipe {\n        id\n        name\n        about\n        createdBy {\n          id\n          userName\n        }\n      }\n      touch {\n        id\n        amount\n        unit\n        order\n        ingredient {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userBuilds {\n    usersBuilds {\n      id\n      buildName\n      glassware\n      ice\n      instructions\n      permission\n      recipe {\n        id\n        name\n        about\n        createdBy {\n          id\n          userName\n        }\n      }\n      touch {\n        id\n        amount\n        unit\n        order\n        ingredient {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query {\n    userRecipe {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        permission\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    userRecipe {\n      id\n      name\n      about\n      createdBy {\n        id\n        userName\n      }\n      userBuild {\n        id\n        buildName\n        instructions\n        ice\n        glassware\n        permission\n        createdBy {\n          id\n          userName\n        }\n        recipe {\n          id\n          name\n        }\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RecipeList {\n    recipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query RecipeList {\n    recipeList {\n      id\n      name\n    }\n    ingredients {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindFolloweddUsersBuildPermission($buildId: String!) {\n    findFolloweddUsersBuildPermission(buildId: $buildId) {\n      permission\n      user {\n        userName\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindOneBuild($recipeName: String!, $buildName: String!) {\n    findOneBuild(recipeName: $recipeName, buildName: $buildName) {\n      id\n      buildName\n      instructions\n      ice\n      glassware\n      recipe {\n        id\n        name\n        about\n      }\n      touch {\n        id\n        ingredient {\n          id\n          name\n        }\n        amount\n        unit\n        order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserRecipeBooks {\n    userRecipeBooks {\n      id\n      name\n      description\n      permission\n      build {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserRecipeBooks {\n    userRecipeBooks {\n      id\n      name\n      description\n      permission\n      build {\n        id\n        createdBy {\n          id\n          userName\n        }\n        buildName\n        recipe {\n          id\n          name\n        }\n        instructions\n        ice\n        glassware\n        permission\n        touch {\n          id\n          ingredient {\n            id\n            name\n            description\n          }\n          amount\n          unit\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n"): (typeof documents)["\n  query AllUsers {\n    allUsers {\n      id\n      userName\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query allRelations {\n    allUsers {\n      id\n      userName\n      email\n    }\n    findFollowers {\n      userName\n      id\n      email\n    }\n    findFollows {\n      userName\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query allRelations {\n    allUsers {\n      id\n      userName\n      email\n    }\n    findFollowers {\n      userName\n      id\n      email\n    }\n    findFollows {\n      userName\n      id\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;