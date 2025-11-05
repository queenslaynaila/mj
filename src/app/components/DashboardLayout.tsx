"use client"

import React, { useState } from "react";
import { css, cx } from "@linaria/atomic";
import { IoMenuOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { mqMax } from "@/styles/breakpoints";
import { 
  FlexBetweenCenterStyles, 
  FlexCenterStyles, 
  FlexColumnStyles 
} from "@/styles/commonStyles";
import { 
  BG_CARD_COLOR, 
  BORDER_COLOR, 
  SHADOW_MEDIUM, 
  TEXT_PRIMARY 
} from "@/styles/colors";

const layoutContainerStyles = css`
  min-height: 100vh;
  background-color: #F9FAFB;
`

const dashheaderStyles = css`
  padding: 0 1.5rem;
  height: 4rem;
  border-bottom: 1px solid #E5E7EB;
  background-color: #fff;
`

const menuButtonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  padding: 0;
  color: #111827;
  
  ${mqMax[1]} {
    display: flex;
  }
`

const headerTitleStyles = css`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 24px;

`

const mainContentStyles = css`
  display: flex;
  flex: 1;
  position: relative;
`

const sidebarWrapperStyles = css`
  width: 15rem;
  
  ${mqMax[1]} {
    position: fixed;
    top: 4rem;
    left: -15rem;
    height: calc(100vh - 4rem);
    z-index: 50;
    transition: left 0.3s ease;
  }
`

const sidebarVisibleStyles = css`
  left: 0;
`

const pageContentStyles = css`
  flex: 1;
  overflow-y: auto;
  
  ${mqMax[1]} {
    width: 100%;
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
  border:none;
`

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + 0.5rem); 
  right: 0;
  background-color: ${BG_CARD_COLOR};
  border: 1px solid ${BORDER_COLOR};
  border-radius: 0.5rem;
  box-shadow: ${SHADOW_MEDIUM};
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
  color: ${TEXT_PRIMARY};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`

type LayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = "USER";

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);

    
  };

  const handleToggleDropdown = () => setIsDropdownOpen((open) => !open);

  return (
    <div className={cx(layoutContainerStyles, FlexColumnStyles)}>
      <header className={cx(dashheaderStyles, FlexBetweenCenterStyles)}>
        <div className={FlexCenterStyles} style={{ gap: "0.5rem" }}>
          <button
            className={menuButtonStyles}
            onClick={() => setIsSidebarOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <IoMenuOutline size={24} />
          </button>
          <h2 className={headerTitleStyles}>Admin Dashboard</h2>
        </div>
        <div className={avatarContainerStyles}>
          <button className={avatarStyles} onClick={handleToggleDropdown}>
            {(userName || "").slice(0, 2).toUpperCase()}
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
        <div className={cx(sidebarWrapperStyles, isSidebarOpen && sidebarVisibleStyles)}>
          <Sidebar />
        </div>
        <main className={pageContentStyles}>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;