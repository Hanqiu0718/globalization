import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/providers/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Globalization",
  description: "Discussion about the globalization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <div className="flex flex-col space-y-10 mx-auto items-center pt-10 md:pt-20 container md:max-w-7xl">
            <UserProvider>
              {children}
            </UserProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
