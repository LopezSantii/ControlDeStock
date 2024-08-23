import { Inter } from "next/font/google";
import SideNav from "./ui/SlideNav";
import { DataProvider } from "./context/DataContext";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextUIProvider>
          <DataProvider>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>
          </DataProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
