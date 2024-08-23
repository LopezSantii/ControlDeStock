"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StockIcon, MovementIcon, DashboardIcon } from "./Icons";

export default function SideNav() {
  const pathName = usePathname();

  return (
    <div className="bg-navbar text-white flex h-full flex-col">
      <Link
        className={`flex flex-row items-center gap-4 p-3 ${
          pathName === "/dashboard" ? "bg-white text-secondary-500" : ""
        }`}
        href={"/dashboard"}
      >
        <DashboardIcon />
        <p>Dashboard</p>
      </Link>
      <Link
        className={`flex flex-row items-center gap-4 p-3 ${
          pathName === "/stock" ? "bg-white text-secondary-500" : ""
        }`}
        href={"/stock"}
      >
        <StockIcon />
        <p>Stock</p>
      </Link>
      <Link
        className={`flex flex-row items-center gap-4 p-3 ${
          pathName === "/movimientos" ? "bg-white text-secondary-500" : ""
        }`}
        href={"/movimientos"}
      >
        <MovementIcon />
        <p>Movimientos</p>
      </Link>
    </div>
  );
}
