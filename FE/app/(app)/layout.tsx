import Sidebar from "@/components/Sidebar/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full items-center">
      <Sidebar />

      <div className="h-dvh w-full">
        {children}
      </div>
    </main>
  );
}