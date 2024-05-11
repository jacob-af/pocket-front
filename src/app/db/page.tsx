export default async function Landing() {
  return (
    <div className="max-w-2xl  mb-12 overflow-auto">
      <div className="text-center text-4xl my-16">Welcome to Pocket</div>
      <div className="text-justify text-xl my-8">
        Below, I have provided an outline of my plans for this particular
        application. There remains a considerable journey ahead, and progress
        will take time. For now, you may take pleasure in exploring the
        functionality related to the storing and viewing of recipes.
      </div>
      <div className="text-justify text-xs my-4">
        The front-end architecture employs Typescript along with Next App
        Router, Apollo Client, Next-Auth, Tailwind, and a sparing use of MUI
        components. On the other hand, the backend was crafted using NestJS,
        Prisma, Apollo Server, Passport, and PostgreSQL.
      </div>
      <div className="text-2xl text-center py-4">Quality of Life</div>
      <div>[ &#10003; ] End to End typesafety</div>
      <div>[ &#10003; ] Secure login with protected routes</div>
      <div>[ &#10003; ] Refresh Tokens</div>
      <div>[ &#10003; ] Cache Persist</div>
      <div>[ &#10003; ] User facing error messages</div>
      <div>[ x ] Image Hosting</div>
      <div>[ x ] Alternate Login methods</div>
      <div>[ x ] Social Feed</div>

      <div className="text-2xl text-center py-4">Recipe Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ &#10003; ] Load users Recipes</div>
      <div>[ &#10003; ][ &#10003; ] Add New Recipe</div>
      <div>[ &#10003; ][ &#10003; ] Add New Build</div>
      <div>[ &#10003; ][ &#10003; ] Edit Recipe</div>
      <div>[ &#10003; ][ &#10003; ] Edit Build</div>
      <div>[ &#10003; ][ x ] Build Version Control</div>
      <div>[ &#10003; ][ &#10003; ] Delete Recipe</div>
      <div>[ &#10003; ][ &#10003; ] Delete Build</div>
      <div>[ &#10003; ][ &#10003; ] Change Build Permission</div>
      <div>[ &#10003; ][ &#10003; ] Remove Build Permission</div>
      <div>[ x ][ x ] Specialized Recipe Search</div>
      <div>[ x ][ x ] Manage Recipe with CSV</div>
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
      <div>[ &#10003; ][ x ] Load RecipeBooks</div>
      <div>[ &#10003; ][ x ] Edit RecipeBookDetails</div>
      <div>[ &#10003; ][ x ] Add Recipe to Recipe Book</div>
      <div>[ &#10003; ][ x ] Remove Recipe from Book</div>
      <div>[ &#10003; ][ x ] Delete Recipe Book</div>
      <div>[ &#10003; ][ x ] Change Recipe Book Permission</div>
      <div>[ &#10003; ][ x ] Remove Recipe Book Permission</div>
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
