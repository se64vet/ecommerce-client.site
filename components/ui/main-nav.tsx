'use client'
import  Link  from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/utils";
import { Category } from "@/global-types";

interface MainNavProps  {
  categories : Category[] 
}

export const MainNav = ({categories}: MainNavProps) => {
  const pathname = usePathname()
  const categoryLinks = categories.map((item) => (
    {
      href: `/category/${item.id}`,
      label: item.name,
      active: pathname === `/category/${item.id}`
    }
  ))
  return (
    <div>
      <nav className="flex flex-row space-x-4">
          {categoryLinks.map((link) => (
              <Link 
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                link.active? "text-black" : "text-neutral-500")}
              >
               {link.label}
              </Link>    
          ))}
      </nav>
    </div>
  )
}