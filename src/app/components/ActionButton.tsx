import { css, cx } from "@linaria/atomic"
import type { ReactNode } from "react"
import type { IconType } from "react-icons"

const baseButtonStyles = css`
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  outline: none;
  border: none;
`;

const iconOnlyButtonStyles = css`
  transition: all 0.2s ease-in-out;
  outline: none;
  border: none;
`;

const primaryButtonStyles = css`
  background-color: #000000;
  color: white;
  &:hover {
    background-color: #374151;
  }
`;

const secondaryButtonStyles = css`
  background-color: #6b7280;
  color: white;
  &:hover {
    background-color: #4b5563;
  }
`;

const successButtonStyles = css`
  background-color: #059669;
  color: white;
  &:hover {
    background-color: #047857;
  }
`;

const dangerButtonStyles = css`
  background-color: #dc2626;
  color: white;
  &:hover {
    background-color: #b91c1c;
  }
`;

const iconButtonStyles = css`
  color: #6b7280;
  padding: 0.25rem;
  &:hover {
    color: #2563eb;
  }
`;

const smallSizeStyles = css`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
`;

const mediumSizeStyles = css`
  padding: 0.5rem 1rem;
`;

const buttonContentStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const iconStyles = css`
  width: 1.25rem;
  height: 1.25rem;
`;

interface ActionButtonProps {
  onClick: () => void
  children?: ReactNode
  variant?: "primary" | "secondary" | "success" | "danger" | "icon"
  size?: "sm" | "md"
  className?: string
  icon?: IconType
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = "secondary",
  size = "md",
  className = "",
  icon: Icon,
}: ActionButtonProps) => (
    <button
      onClick={onClick}
      className={cx(
        baseButtonStyles,
        variant === "icon" ? iconOnlyButtonStyles && iconButtonStyles : baseButtonStyles,
        variant === "primary" && primaryButtonStyles,
        variant === "secondary" && secondaryButtonStyles,
        variant === "success" && successButtonStyles,
        variant === "danger" && dangerButtonStyles,
        variant !== "icon" && (size === "sm" ? smallSizeStyles : mediumSizeStyles),
        className
      )}
    >
      <div className={buttonContentStyles}>
        {Icon && <Icon className={iconStyles} />}
        {children}
      </div>
    </button>
);

export default ActionButton;

