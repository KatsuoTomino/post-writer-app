import MainNav from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { marketingConfig } from "../config/marketing";
import SiteFooter from "@/components/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="container z-40 bg-background">
        <div className="h-20 py-10 px-10 flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "px-4"
              )}
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>

      <footer className="container z-40 bg-background">
        <div className="h-20 py-10 px-10 flex items-center justify-between">
          <SiteFooter />
        </div>
      </footer>
    </div>
  );
}
