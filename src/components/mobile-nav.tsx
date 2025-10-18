import { siteConfig } from "@/app/config/site";
import { NavItem } from "@/app/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  useLockBodyScroll();
  return (
    <div className="fixed top-16 right-0 bottom-0 left-0 z-50  p-6  md:hidden animate-in slide-in-from-bottom bg-transparent backdrop-blur-sm">
      <div className="grid gap-6 bg-white p-6 text-gray-900 shadow-md">
        <Link href={"/"} className="font-bold">
          {siteConfig.name}
        </Link>
        <nav className="text-sm flex gap-4">
          {items?.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
