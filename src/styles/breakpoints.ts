const breakpoints = [576, 768, 992, 1200, 640];

export const mqMin = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

export const mqMax = breakpoints.map(bp => `@media (max-width: ${bp}px)`);