import { PublicNavBar } from "@/components/navigation/PublicNavBar";

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex h-screen min-h-screen w-screen snap-y snap-mandatory flex-col items-center overflow-x-hidden overflow-y-scroll text-xl">
        {children}
        <PublicNavBar />
      </main>
    </>
  );
}
