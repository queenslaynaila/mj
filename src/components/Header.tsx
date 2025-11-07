import { css, cx } from "@linaria/atomic"
import type React from "react"
import { 
  FlexBetweenCenterStyles, 
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
  color: black;
`

const headerTextStyles = css`
  color: #383635;
`

interface DashboardHeaderProps {
  heading: string
  description?: string
}

const Header: React.FC<DashboardHeaderProps> = ({ heading, description }) => (
  <div className={cx(dashBoardHeaderStyles, FlexBetweenCenterStyles)}>
    <div className={FlexColumnStyles}>
      <h2 className={headerTitleStyles}>{heading}</h2>
      {description && <p className={headerTextStyles}>{description}</p>}
    </div>
  </div>
)

export default Header