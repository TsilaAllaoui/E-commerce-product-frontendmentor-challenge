import { ColorContextProvider } from "./components/Provider/ColorContextProvider";
import { InViewContextProvider } from "./components/Provider/InViewContextProvider";
import { CurrentUserContextProvider } from "./components/Provider/CurrentUserProvider";
import { getFirstUser, getUser } from "../../db/utilities";
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
  const user = await getFirstUser();

  return (
    <html lang="en">
      <body>
        <CurrentUserContextProvider>
          <ColorContextProvider>
            <Navbar currentUser={user} />
            <InViewContextProvider>{children}</InViewContextProvider>
          </ColorContextProvider>
        </CurrentUserContextProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
