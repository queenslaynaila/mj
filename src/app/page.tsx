import { css } from '@linaria/core';

const buttonStyles = css`
  padding: 12px 24px;
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Home() {
  return (
    <button className={buttonStyles}>Click me</button>
  );
}
