export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-col items-center justify-between lg:px-24">
        {children}
      </main>
    </>
  );
}
