import { Icon } from "@/components/icon";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
}

export interface MarketingConfig {
  mainNav: NavItem[];
}

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icon;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

export interface DashboardConfig {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
}
