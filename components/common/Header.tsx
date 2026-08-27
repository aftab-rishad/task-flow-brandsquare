"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function Header() {
  const pathname = usePathname();
  console.log(pathname.split("/"));
  const page = pathname.split("/")?.[1];

  return (
    <div className="p-2 sticky top-0 bg-[#0A0A0A] rounded-t-2xl border-b flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger />
        <div className="h-4 w-0.5 mx-2 bg-border" />
        <span>
          {pathname === "/"
            ? "Dashboard"
            : page.charAt(0).toUpperCase() + page.slice(1)}
        </span>
      </div>
      <Button
        render={
          <Link
            prefetch
            href="https://www.brandsquare.agency/"
            target="_blank"
          />
        }
        variant="outline"
      >
        Brandsquare Agency <ArrowUpRight />
      </Button>
    </div>
  );
}

export default Header;
