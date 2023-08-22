import { ColorContextProvider } from "./components/Provider/ColorContextProvider";
import { InViewContextProvider } from "./components/Provider/InViewContextProvider";
import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Products",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorContextProvider>
          <Navbar />
          <InViewContextProvider>{children}</InViewContextProvider>
        </ColorContextProvider>
      </body>
    </html>
  );
}
