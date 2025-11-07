"use client"

import type React from "react"
import { useState } from "react"
import { css, cx } from "@linaria/atomic"
import { IoMenuOutline } from "react-icons/io5"
import Sidebar from "./Sidebar"
import { useRouter } from "next/navigation";

const FlexBetweenCenterStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FlexCenterStyles = css`
  display: flex;
  align-items: center;
`

const FlexColumnStyles = css`
  display: flex;
  flex-direction: column;
`

const layoutContainerStyles = css`
  min-height: 100vh;
  background-color: #F8F3F2;
`

const dashheaderStyles = css`
  padding: 0 1.5rem;
  height: 4rem;
  border-bottom: 1px solid #E3E2E3;
  background-color: #FFFDFE;
`

const menuButtonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  padding: 0;
  color: #4C4A48;
  font-size: 24px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const headerTitleStyles = css`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 24px;
  color: #4C4A48;
`

const mainContentStyles = css`
  display: flex;
  flex: 1;
  position: relative;
`

const sidebarWrapperStyles = css`
  width: 15rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 4rem;
    left: 0;
    height: calc(100vh - 4rem);
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
`

const sidebarVisibleStyles = css`
  @media (max-width: 768px) {
    transform: translateX(0) !important;
  }
`

const pageContentStyles = css`
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const overlayStyles = css`
  display: none;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const overlayVisibleStyles = css`
  @media (max-width: 768px) {
    display: block !important;
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
`

const avatarContainerStyles = css`
  position: relative;
`

const avatarStyles = css`
  font-weight: 500;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  border: none;
  background-color: #64483E;
  color: #FFFDFE;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #4C4A48;
  }
`

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + 0.5rem); 
  right: 0;
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 7.5rem;
  z-index: 50; 
  overflow: hidden;
`

const dropdownMenuItemStyles = css`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4C4A48;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F0EAE5;
  }
`

type LayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDropdownOpen(false)
      router.push("/");
  }

  const handleToggleDropdown = () => setIsDropdownOpen((open) => !open)

  const handleOverlayClick = () => setIsSidebarOpen(false)

  const handleToggleSidebar = () => {
    setIsSidebarOpen((open) => {
      console.log("[v0] Toggling sidebar from", open, "to", !open)
      return !open
    })
  }

  return (
    <div className={cx(layoutContainerStyles, FlexColumnStyles)}>
      <header className={cx(dashheaderStyles, FlexBetweenCenterStyles)}>
        <div className={FlexCenterStyles} style={{ gap: "0.5rem" }}>
          <button className={menuButtonStyles} onClick={handleToggleSidebar} aria-label="Toggle menu">
            <IoMenuOutline size={24} />
          </button>
          <h2 className={headerTitleStyles}>M.J. O&apos;Connor&apos;s</h2>
        </div>
        <div className={avatarContainerStyles}>
          <button className={avatarStyles} onClick={handleToggleDropdown}>
            {"MJC".slice(0, 2).toUpperCase()}
          </button>
          {isDropdownOpen && (
            <div className={dropdownMenuStyles}>
              <button className={dropdownMenuItemStyles} onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={mainContentStyles}>
        <div className={cx(overlayStyles, isSidebarOpen && overlayVisibleStyles)} onClick={handleOverlayClick} />

        <div className={cx(sidebarWrapperStyles, isSidebarOpen && sidebarVisibleStyles)}>
          <Sidebar />
        </div>
        <main className={pageContentStyles}>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
