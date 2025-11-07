import { css } from "@linaria/core";

const errorContainerStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f3f2; 
  border: 1.5px solid #d6b4ab; 
  border-radius: 0.75rem;
  text-align: center;
`;

const errorTitleStyles = css`
  font-size: 1.5rem;
  font-weight: 600;
  color: #64483e; 
  margin-bottom: 0.5rem;
`;

const errorMessageStyles = css`
  font-size: 1rem;
  color: #7a7471;  
`;

type ErrorMessageProps = {
  message?: string;
};

export default function ErrorMessage({
  message = "Unable to load data. Something went wrong.",
}: ErrorMessageProps) {
  return (
    <div className={errorContainerStyles}>
      <h2 className={errorTitleStyles}>Error</h2>
      <p className={errorMessageStyles}>{message}</p>
    </div>
  );
}
