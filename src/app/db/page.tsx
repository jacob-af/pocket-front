export default async function Landing() {
  return (
    <div className="max-w-2xl  mb-12">
      <div className="text-center text-4xl my-16">Welcome to Pocket</div>
      <div className="text-center text-xl my-8">
        This is a roadmap to what I have planned for this application. I have a
        long way to go. For now, Please enjoy storing and viewing recipes. be.
      </div>
      <div className="text-justify text-xs my-4">
        The front end for this project is Typescript with Next App Router,
        Apollo Client, Next-Auth, Tailwind, and minimal MUI components. The API
        was made with Nestjs, Prisma, Apollo Server, Passport, and PostgresQL.
      </div>
      <div className="text-2xl text-center py-4">Quality of Life</div>
      <div>[ &#10003; ] End to End typesafety</div>
      <div>[ &#10003; ] Secure login with protected routes</div>
      <div>[ &#10003; ] Refresh Tokens</div>
      <div>[ &#10003; ] Cache Persist</div>
      <div>[ x ] User facing error messages</div>
      <div>[ x ] Image Hosting</div>
      <div>[ x ] Alternate Login methods</div>
      <div>[ x ] Social Feed</div>

      <div className="text-2xl text-center py-4">Recipe Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ &#10003; ] Load users Recipes</div>
      <div>[ &#10003; ][ &#10003; ] Add New Recipe</div>
      <div>[ &#10003; ][ &#10003; ] Add New Build</div>
      <div>[ &#10003; ][ x ] Edit Recipe</div>
      <div>[ &#10003; ][ x ] Edit Build</div>
      <div>[ &#10003; ][ x ] Build Version Control</div>
      <div>[ &#10003; ][ x ] Delete Recipe</div>
      <div>[ &#10003; ][ x ] Delete Build</div>
      <div>[ &#10003; ][ x ] Change Build Permission</div>
      <div>[ &#10003; ][ x ] Remove Build Permission</div>
      <div>[ x ][ x ] Specialized Recipe Search</div>
      <div>[ x ][ x ] Manage Recipe with CSV</div>
      <br />
      <br />
      <div className="text-2xl text-center py-4">Ingredient Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ &#10003; ] Load Ingredients</div>
      <div>[ &#10003; ][ &#10003; ] Manage Ingredient with CSV</div>
      <div>[ &#10003; ][ x ] Add Custom Ingredient</div>
      <div>[ &#10003; ][ x ] Edit Custom Ingredient</div>
      <div>[ &#10003; ][ x ] Connect Ing to Inventory</div>
      <div>[ &#10003; ][ x ] Delete Custom Ingredient</div>
      <div>[ &#10003; ][ x ] Change Recipe Connection</div>
      <div>[ &#10003; ][ x ] Use Build as Recipe</div>
      <div>[ &#10003; ][ x ] Share Custom Ingredient</div>
      <div>[ &#10003; ][ x ] unshare Custom Ingredient</div>
      <br />
      <div className="text-2xl text-center py-4">RecipeBook Operations</div>
      <div>[API][UI]</div>
      <div>[ x ][ x ] Load RecipeBooks</div>
      <div>[ x ][ x ] Edit RecipeBookDetails</div>
      <div>[ x ][ x ] Add Recipe to Recipe Book</div>
      <div>[ x ][ x ] Remove Recipe from Book</div>
      <div>[ x ][ x ] Delete Recipe Book</div>
      <div>[ x ][ x ] Change Recipe Book Permission</div>
      <div>[ x ][ x ] Remove Recipe Book Permission</div>
      <br />
      <div className="text-2xl text-center py-4">User/Crew Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ x ] Edit Profile </div>
      <div>[ &#10003; ][ &#10003; ] Follow User</div>
      <div>[ &#10003; ][ &#10003; ] Unfollow User</div>
      <div>[ &#10003; ][ x ] Block User</div>
      <div>[ x ][ x ] Create Crew</div>
      <div>[ x ][ x ] Add to Crew</div>
      <div>[ x ][ x ] Remove from Crew</div>
      <div>[ x ][ x ] Leave Crew</div>
      <br />
      <div className="text-2xl text-center py-4">Inventory Operations</div>
      <div>[API][UI]</div>
      <div>[ x ][ x ] Load Inventory</div>
      <div>[ x ][ x ] Add Ingredients</div>
      <div>[ x ][ x ] Remove Ingredients</div>
      <div>[ x ][ x ] Edit Ingredient relation</div>
      <div>[ x ][ x ] Change Inventory Permission</div>
      <div>[ x ][ x ] Remove Inventory Permission</div>
      <br />
      <div className="text-2xl text-center pt-4">Storage Operations</div>
      <div>[API][UI]</div>
      <div>[ x ][ x ] Load Storage</div>
      <div>[ x ][ x ] Add Ingredient</div>
      <div>[ x ][ x ] Remove Ingredient</div>
      <div>[ x ][ x ] Count Storage</div>
    </div>
  );
}
