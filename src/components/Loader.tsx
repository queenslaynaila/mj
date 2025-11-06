"use client";

import { css } from "@linaria/core";
import { FaSpinner } from "react-icons/fa";
import React from "react";

interface LoaderProps {
  message?: string;
}

const loadingContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
`;

const loadingSpinnerStyles = css`
  font-size: 3rem;
  color: black;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const loadingTextStyles = css`
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 500;
`;

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div className={loadingContainerStyles}>
      <FaSpinner className={loadingSpinnerStyles} />
      <p className={loadingTextStyles}>{message}</p>
    </div>
  );
}
