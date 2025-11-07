"use client"

import type { ComponentType, ReactElement } from "react"
import { css, cx } from "@linaria/atomic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaAllergies } from "react-icons/fa"
import { MdCategory } from "react-icons/md"
import { MdOutlineMenuBook } from "react-icons/md"
import { IoIosStats } from "react-icons/io"

const sidebarContainerStyles = css`
  width: 100%;
  height: 100%;
  background-color: #F0EAE5;
  border-right: 1px solid #E3E2E3;
  padding: 16px 0;
  overflow-y: auto;
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
    background-color: #FFFDFE;
    font-weight: 500;
    color: #64483E;
    
    svg {
      color: #64483E;
    }
  }
`

const navLinkStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #4C4A48;
  text-decoration: none;
  border-radius: 6px;
  margin: 0 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #DED4D1;
  }
  
  svg {
    color: #64483E;
  }
`

type SidebarNavItem = {
  href: string
  label: string
  icon: ComponentType<{ size?: number }>
}

const sidebarNavItems: SidebarNavItem[] = [
  { href: "/admin/categories", label: "Categories", icon: MdCategory },
  { href: "/admin/allergens", label: "Allergens", icon: FaAllergies },
  { href: "/admin/menu", label: "Menu", icon: MdOutlineMenuBook },
  { href: "/admin/orders", label: "Orders", icon: IoIosStats },
]

const Sidebar = (): ReactElement => {
  const pathname = usePathname() || "/"

  const isNavItemActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <aside className={sidebarContainerStyles}>
      <ul className={navListStyles}>
        {sidebarNavItems.map((item) => (
          <li key={item.href} className={cx(navItemStyles, isNavItemActive(item.href) && activeNavItemStyles)}>
            <Link href={item.href} className={navLinkStyles}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
