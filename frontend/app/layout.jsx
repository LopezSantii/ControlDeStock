import { Inter } from "next/font/google";
import { DataProvider } from "./context/DataContext";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <DataProvider>{children}</DataProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
