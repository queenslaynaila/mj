import { css } from '@linaria/core';

export const globals = css`
  :global() {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      background-color: #fff;
      color: #000;
    }
  }
`;