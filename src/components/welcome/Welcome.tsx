import { BreakPoint } from "@/components/images/CardBorder";

export default function Welcome() {
  return (
    <div className="box-border flex min-h-screen w-screen max-w-2xl snap-center flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold">Welcome</h1>
      <h2 className="text-2xl font-bold"> to the </h2>
      <h1 className="text-8xl font-bold">Pocket Bar Book</h1>
      <p className="my-4">
        A recipe management app designed for working bartenders. Keep track of
        different builds, version control for recipe development. Share with
        your team. Manage inventory and run cost. Put it all in your Pocket.
      </p>
    </div>
  );
}
