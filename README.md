Pocket Bar Book is a full stack Typescript application built with Next.js, Tailwind CSS, Apollo Graphql, Nest.js, Prisma, and Postgresql.  It also makes use of Next-Auth, BCrypt, LocalForage, D3, and UploadThing. 

Current functionality allows users to create, edit, and view cocktails recipes, add them to recipe books, and share individual recipes and books to 

Basics
- [ &#10003; ] End to End typesafety
- [ &#10003; ] Secure login with protected routes
- [ &#10003; ] Refresh Tokens
- [ &#10003; ] Cache Persist
- [ &#10003; ] User facing error messages
- [ &#10003; ] Image Hosting
- [ &#10003; ] Alternate Login methods
- [ x ] Social Feed

Recipe Operations
[API][UI]
- [ &#10003; ][ &#10003; ] Load users Recipes
- [ &#10003; ][ &#10003; ] Add New Recipe
- [ &#10003; ][ &#10003; ] Add New Build
- [ &#10003; ][ &#10003; ] Edit Recipe
- [ &#10003; ][ &#10003; ] Edit Build
- [ &#10003; ][ x ] Build Version Control
- [ &#10003; ][ &#10003; ] Delete Recipe
- [ &#10003; ][ &#10003; ] Delete Build
- [ &#10003; ][ &#10003; ] Change Build Permission
- [ &#10003; ][ &#10003; ] Remove Build Permission
- [ x ][ x ] Specialized Recipe Search
- [ x ][ x ] Manage Recipe with CSV

Ingredient Operations
[API][UI]
- [ &#10003; ][ &#10003; ] Load Ingredients
- [ &#10003; ][ &#10003; ] Manage Ingredient with CSV
- [ x ][ x ] Add Custom Ingredient
- [ x ][ x ] Edit Custom Ingredient
- [ &#10003; ][ x ] Connect Ing to Inventory
- [ x ][ x ] Delete Custom Ingredient
- [ x ][ x ] Change Recipe Connection
- [ &#10003; ][ x ] Use Build as Recipe
- [ x ][ x ] Share Custom Ingredient
- [ x ][ x ] unshare Custom Ingredient

RecipeBook Operations
[API][UI]
- [ &#10003; ][ &#10003; ] Load RecipeBooks
- [ &#10003; ][ &#10003; ] Edit RecipeBookDetails
- [ &#10003; ][ &#10003; ] Add Recipe to Recipe Book
- [ &#10003; ][ &#10003; ] Remove Recipe from Book
- [ &#10003; ][ &#10003; ] Delete Recipe Book
- [ &#10003; ][ &#10003; ] Change Recipe Book Permission
- [ &#10003; ][ &#10003; ] Remove Recipe Book Permission

User/Crew Operations
[API][UI]
- [ &#10003; ][ x ] Edit Profile 
- [ &#10003; ][ &#10003; ] Follow User
- [ &#10003; ][ &#10003; ] Unfollow User
- [ &#10003; ][ x ] Block User
- [ x ][ x ] Create Crew
- [ x ][ x ] Add to Crew
- [ x ][ x ] Remove from Crew
- [ x ][ x ] Leave Crew

Inventory Operations
[API][UI]
- [ &#10003; ][ x ] Load Inventory
- [ &#10003; ][ x ] Add Ingredients
- [ x ][ x ] Remove Ingredients
- [ x ][ x ] Edit Ingredient relation
- [ x ][ x ] Change Inventory Permission
- [ x ][ x ] Remove Inventory Permission

Storage Operations
[API][UI]
- [ x ][ x ] Load Storage
- [ x ][ x ] Add Ingredient
- [ x ][ x ] Remove Ingredient
- [ x ][ x ] Count Storage
