import { ColorContextProvider } from "./components/Provider/ColorContextProvider";
import { InViewContextProvider } from "./components/Provider/InViewContextProvider";
import { CurrentUserContextProvider } from "./components/Provider/CurrentUserProvider";
import { getUser } from "../../lib/utilities";
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
  const user = await getUser("");

  return (
    <html lang="en">
      <body>
        <ColorContextProvider>
          <CurrentUserContextProvider>
            <Navbar currentUser={user} />
          </CurrentUserContextProvider>
          <InViewContextProvider>{children}</InViewContextProvider>
        </ColorContextProvider>
      </body>
    </html>
  );
}
