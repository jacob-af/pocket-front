export default async function Landing() {
  return (
    <div className="max-w-2xl">
      <div className="text-center">
        This is a roadmap to what I believe the full potential of this app could
        be.{" "}
      </div>
      <div className="text-2xl text-center">Quality of Life</div>
      <div>[ &#10003; ] End to End typesafety</div>
      <div>[ &#10003; ] Secure login with protected routes</div>
      <div>[ &#10003; ] Refresh Tokens</div>
      <div>[ &#10003; ] Cache Persist</div>
      <div>[ - ] Image Hosting</div>
      <div>[ - ] Alternate Login methods</div>
      <div>[ - ] Social Feed</div>

      <div className="text-2xl text-center">Recipe Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ &#10003; ] Load users Recipes</div>
      <div>[ &#10003; ][ &#10003; ] Add New Recipe</div>
      <div>[ &#10003; ][ &#10003; ] Add New Build</div>
      <div>[ &#10003; ][ - ] Edit Recipe</div>
      <div>[ &#10003; ][ - ] Edit Build</div>
      <div>[ &#10003; ][ - ] Delete Recipe</div>
      <div>[ &#10003; ][ - ] Delete Build</div>
      <div>[ &#10003; ][ - ] Change Build Permission</div>
      <div>[ &#10003; ][ - ] Remove Build Permission</div>
      <div>[ - ][ - ] Specialized Recipe Search</div>
      <div>[ - ][ - ] Manage Recipe with CSV</div>
      <br />
      <br />
      <div className="text-2xl">Ingredient Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ &#10003; ] Load Ingredients</div>
      <div>[ &#10003; ][ &#10003; ] Manage Ingredient with CSV</div>
      <div>[ &#10003; ][ - ] Add Custom Ingredient</div>
      <div>[ &#10003; ][ - ] Edit Custom Ingredient</div>
      <div>[ &#10003; ][ - ] Connect Ing to Inventory</div>
      <div>[ &#10003; ][ - ] Delete Custom Ingredient</div>
      <div>[ &#10003; ][ - ] Change Recipe Connection</div>
      <div>[ &#10003; ][ - ] Use Build as Recipe</div>
      <div>[ &#10003; ][ - ] Share Custom Ingredient</div>
      <div>[ &#10003; ][ - ] unshare Custom Ingredient</div>
      <br />
      <div className="text-2xl">RecipeBook Operations</div>
      <div>[API][UI]</div>
      <div>[ - ][ - ] Load RecipeBooks</div>
      <div>[ - ][ - ] Edit RecipeBookDetails</div>
      <div>[ - ][ - ] Add Recipe to Recipe Book</div>
      <div>[ - ][ - ] Remove Recipe from Book</div>
      <div>[ - ][ - ] Delete Recipe Book</div>
      <div>[ - ][ - ] Change Recipe Book Permission</div>
      <div>[ - ][ - ] Remove Recipe Book Permission</div>
      <br />
      <div className="text-2xl">User/Crew Operations</div>
      <div>[API][UI]</div>
      <div>[ &#10003; ][ - ] Edit Profile </div>
      <div>[ &#10003; ][ - ] Follow User</div>
      <div>[ &#10003; ][ - ] Unfollow User</div>
      <div>[ &#10003; ][ - ] Block User</div>
      <div>[ - ][ - ] Create Crew</div>
      <div>[ - ][ - ] Add to Crew</div>
      <div>[ - ][ - ] Remove from Crew</div>
      <div>[ - ][ - ] Leave Crew</div>
      <br />
      <div className="text-2xl">Inventory Operations</div>
      <div>[API][UI]</div>
      <div>[ - ][ - ] Load Inventory</div>
      <div>[ - ][ - ] Add Ingredients</div>
      <div>[ - ][ - ] Remove Ingredients</div>
      <div>[ - ][ - ] Edit Ingredient relation</div>
      <div>[ - ][ - ] Change Inventory Permission</div>
      <div>[ - ][ - ] Remove Inventory Permission</div>
      <br />
      <div className="text-2xl">Storage Operations</div>
      <div>[API][UI]</div>
      <div>[ - ][ - ] Load Storage</div>
      <div>[ - ][ - ] Add Ingredient</div>
      <div>[ - ][ - ] Remove Ingredient</div>
      <div>[ - ][ - ] Count Storage</div>
    </div>
  );
}
