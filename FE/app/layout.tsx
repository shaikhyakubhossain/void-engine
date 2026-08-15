import { metadata } from "@/config/metadata";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import VoidBackground from "@/components/VoidBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Providers } from "@/components/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VoidBackground />
        <Providers>
          <main className="flex min-h-screen w-full items-center">
            <Sidebar />
            <div className="h-dvh w-full">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
