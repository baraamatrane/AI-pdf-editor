import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`antialiased relative bg-gradient-to-br from-blue-100 to-white h-screen w-full`}
    >
      <Sidebar />
      {children}
    </div>
  );
}
