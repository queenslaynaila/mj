import { css, cx } from "@linaria/atomic"
import type React from "react"
import { 
  FlexBetweenCenterStyles, 
  FlexCenterStyles,
  FlexColumnStyles
} from "../styles/commonStyles"

const dashBoardHeaderStyles = css`
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
`

const headerTitleStyles = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000000;
`

const headerTextStyles = css`
  color: #272b33;
`

const actionBtnStyles = css`
  gap: 8px;
  background-color: #111827;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #1F2937;
  }
`

interface DashboardHeaderProps {
  heading: string
  description?: string
  actionLabel?: string
  actionIcon?: React.ReactNode
  onAction?: () => void
  children?: React.ReactNode
}


const Header: React.FC<DashboardHeaderProps> = ({
  heading,
  description,
  actionLabel,
  actionIcon,
  onAction,
  children
}) => (
    <div className={cx(dashBoardHeaderStyles, FlexBetweenCenterStyles)}>
      <div className={FlexColumnStyles}>
        <h2 className={headerTitleStyles}>{heading}</h2>
        {description && <p className={headerTextStyles}>{description}</p>}
      </div>

      {actionLabel && onAction && (
        <button
          className={cx(actionBtnStyles, FlexCenterStyles)}
          onClick={onAction}
        >
          {actionIcon}
          {actionLabel}
        </button>
      )}

      {children}
    </div>
  )



export default Header;