import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import CategoryBar from "./(archive)/components/CategoryBar";
import SearchBar from "../components/bars/SearchBar";
import MenuBar from "../components/bars/MenuBar";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "네디플",
  description: "네일아트 디자인 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <main
            className="w-screen h-screen flex py-[20px] px-[25px]
          bg-white dark:bg-themeDark text-textBlack dark:text-white "
          >
            <MenuBar />
            <section className="contentSection flex-1 flex-col px-[20px]">
              <SearchBar /> 
              <CategoryBar />
              {children}
            </section>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}