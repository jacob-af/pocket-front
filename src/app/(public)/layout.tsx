import { PublicNavBar } from "@/components/navigation/PublicNavBar";

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
