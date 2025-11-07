"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { css, cx } from "@linaria/core"
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa"
import { FlexCenterStyles, FlexColumnStyles } from "@/styles/commonStyles"

const containerStyles = css`
  min-height: 100vh;
  justify-content: center;
  background-color: #F8F3F2;
  padding: 2rem 1rem;
`

const cardStyles = css`
  width: 100%;
  max-width: 26rem;
  padding: 3rem 2rem;
  gap: 2rem;
  background-color: #FFFDFE;
  border-radius: 0.5rem;
  border: 2px solid #E3E2E3;
  position: relative;
`

const brandingStyles = css`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  font-size: 1rem;
  color: #4C4A48;
  font-weight: 500;
  line-height: 1.2;
  text-align: right;
`

const headerStyles = css`
  text-align: left;
  gap: 0.5rem;
  margin-top: 1rem;
`

const titleStyles = css`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4C4A48;
  margin: 0;
  line-height: 1.2;
`

const subtitleStyles = css`
  font-size: 0.875rem;
  color: #DED4D1;
  margin: 0;
  line-height: 1.5;
`

const formStyles = css`
  gap: 1.25rem;
`

const fieldStyles = css`
  gap: 0.5rem;
`

const inputStyles = css`
  width: 100%;
  border: none;
  border-bottom: 1px solid #E3E2E3;
  background-color: transparent;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  color: #4C4A48;
  transition: border-color 0.2s;
  font-family: inherit;
  
  &::placeholder {
    color: #DED4D1;
  }
  
  &:focus {
    outline: none;
    border-bottom-color: #64483E;
  }
`

const passwordContainerStyles = css`
  position: relative;
`

const passwordInputStyles = css`
  width: 100%;
  border: none;
  border-bottom: 1px solid #E3E2E3;
  background-color: transparent;
  padding: 0.75rem 2.5rem 0.75rem 0;
  font-size: 0.875rem;
  color: #4C4A48;
  transition: border-color 0.2s;
  font-family: inherit;
  
  &::placeholder {
    color: #DED4D1;
  }
  
  &:focus {
    outline: none;
    border-bottom-color: #64483E;
  }
`

const passwordToggleStyles = css`
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  justify-content: center;
  color: #DED4D1;
  transition: color 0.2s;
  
  &:hover {
    color: #64483E;
  }

  &:focus-visible {
    outline: 2px solid #64483E;
    outline-offset: 2px;
    border-radius: 0.25rem;
  }
`

const eyeIconStyles = css`
  width: 1rem;
  height: 1rem;
`

const submitButtonStyles = css`
  width: 100%;
  height: 3rem;
  font-size: 0.9375rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: none;
  background-color: #64483E;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: inherit;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #6F4E35;
  }

  &:focus-visible {
    outline: 2px solid #64483E;
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const footerStyles = css`
  text-align: center;
  font-size: 0.875rem;
  color: #4C4A48;
  margin: 0;
`

const linkStyles = css`
  font-weight: 500;
  color: #64483E;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  
  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #64483E;
    outline-offset: 2px;
    border-radius: 0.125rem;
  }
`

const socialButtonsContainerStyles = css`
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const dividerStyles = css`
  position: relative;
  text-align: center;
  margin: 0.2rem 0;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #E3E2E3;
  }
`

const dividerTextStyles = css`
  position: relative;
  display: inline-block;
  background-color: #FFFDFE;
  padding: 0 1rem;
  font-size: 0.875rem;
  color: #DED4D1;
`

const socialButtonStyles = css`
  width: 100%;
  height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #E3E2E3;
  background-color: #FFFDFE;
  color: #4C4A48;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  
  &:hover {
    background-color: #F0EAE5;
    border-color: #DED4D1;
  }

  &:focus-visible {
    outline: 2px solid #64483E;
    outline-offset: 2px;
  }
`

const socialIconStyles = css`
  width: 1.25rem;
  height: 1.25rem;
`

export default function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in with:", { username, password })
    router.push("/admin/menu")
  }
  const handleNavigateToAdmin = () => {
    router.push("/admin/menu")
  }

  return (
    <div className={cx(FlexCenterStyles, containerStyles)}>
      <div className={cx(cardStyles, FlexColumnStyles)}>
        <div className={brandingStyles}>M.J. O&apos;Connor&apos;s</div>

        <div className={cx(headerStyles, FlexColumnStyles)}>
          <h1 className={titleStyles}>Hi ! Welcome</h1>
          <p className={subtitleStyles}>Please enter your data</p>
        </div>

        <form onSubmit={handleSignIn} className={cx(FlexColumnStyles, formStyles)}>
          <div className={cx(FlexColumnStyles, fieldStyles)}>
            <input
              id="username"
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputStyles}
            />
          </div>

          <div className={fieldStyles}>
            <div className={cx(FlexCenterStyles, passwordContainerStyles)}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={passwordInputStyles}
              />
              <button
                type="button"
                className={cx(FlexCenterStyles, passwordToggleStyles)}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className={eyeIconStyles} /> : <FaEye className={eyeIconStyles} />}
              </button>
            </div>
          </div>

          <button type="submit" className={submitButtonStyles}>
            Log In
          </button>
        </form>

        <div className={dividerStyles}>
          <span className={dividerTextStyles}>Or continue with</span>
        </div>

        <div className={cx(FlexColumnStyles, socialButtonsContainerStyles)}>
          <button type="button" className={socialButtonStyles} onClick={handleNavigateToAdmin}>
            <FaGoogle className={socialIconStyles} />
            Continue with Google
          </button>
          <button type="button" className={socialButtonStyles} onClick={handleNavigateToAdmin}>
            <FaApple className={socialIconStyles} />
            Continue with Apple
          </button>
          <button type="button" className={socialButtonStyles} onClick={handleNavigateToAdmin}>
            <FaMicrosoft className={socialIconStyles} />
            Continue with Microsoft
          </button>
        </div>

        <p className={footerStyles}>
          Don&apos;t have an account?{" "}
          <button type="button" className={linkStyles}>
            Contact your administrator
          </button>
        </p>
      </div>
    </div>
  )
}