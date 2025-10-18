import { siteConfig } from "@/app/config/site";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="container py-10 md:py-10 md:h-20">
      <p className="text-center text-sm md:text-left">
        Built by {""}
        <Link
          href={siteConfig.links.x}
          className="underline underline-offset-4 font-medium"
        >
          TomikawaCode
        </Link>
        . Hosted on {""}
        <Link
          href={"https://google.com"}
          className="underline underline-offset-4 font-medium"
          target="_blank"
          rel="noreferrer"
        >
          google
        </Link>
      </p>
    </footer>
  );
}
