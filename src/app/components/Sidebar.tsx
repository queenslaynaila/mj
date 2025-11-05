"use client"

import type { ComponentType, ReactElement } from "react";
import { css, cx } from "@linaria/atomic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAllergies } from "react-icons/fa";
import { RiAwardLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoIosStats } from "react-icons/io";

const sidebarContainerStyles = css`
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #E5E7EB;
  padding: 16px 0;
  height: 100%;
`

const navListStyles = css`
  list-style: none;
  padding: 0;
  margin: 0;
`

const navItemStyles = css`
  margin: 4px 0;
`

const activeNavItemStyles = css`
  a {
    background-color: #F3F4F6;
    font-weight: 500;
  }
`

const navLinkStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #111827;
  text-decoration: none;
  border-radius: 6px;
  margin: 0 8px;
  
  &:hover {
    background-color: #F3F4F6;
  }
  
  svg {
    color: #6B7280;
  }
`

type SidebarNavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
};

const sidebarNavItems: SidebarNavItem[] = [
  { href: "/admin/categories", label: "Categories", icon: MdCategory },
  { href: "/admin/allergens", label: "Allergens", icon: FaAllergies },
  { href: "/admin/products", label: "Products", icon: MdOutlineMenuBook},
  { href: "/admin/stats", label: "Stats", icon: IoIosStats }
];

const Sidebar = (): ReactElement => {
  const pathname = usePathname() || "/";

  const isNavItemActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <aside className={sidebarContainerStyles}>
      <ul className={navListStyles}>
        {sidebarNavItems.map((item) => (
          <li
            key={item.href}
            className={cx(
              navItemStyles,
              isNavItemActive(item.href) && activeNavItemStyles
            )}
          >
            <Link href={item.href} className={navLinkStyles}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
