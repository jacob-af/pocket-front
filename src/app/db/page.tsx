export default async function Landing() {
  return (
    <div className="mb-12 max-w-2xl overflow-auto">
      <div className="my-16 text-center text-4xl">Welcome to Pocket</div>
      <div className="my-8 text-justify text-xl">
        Welcome to Pocket Bar Book, a bar management tool designed by a
        bartender, for bartenders. Current capabilites are storing and editing
        recipes. Recipes can be organized into recipe books. Recipes, specific
        builds, and recipe books can be visited at specific URLs. The next goal
        will be making recipe books shareable before adding inventory and
        costing capabilities.
      </div>
      <div className="my-4 text-justify">
        The front-end architecture employs Typescript along with Next App
        Router, Apollo Client, Next-Auth, Tailwind, and a sparing use of MUI
        components. On the other hand, the backend was crafted using NestJS,
        Prisma, Apollo Server, Passport, and PostgreSQL.
      </div>
    </div>
  );
}
