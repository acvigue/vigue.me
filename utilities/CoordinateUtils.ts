export const polarToCartesian = (r: number, theta: number) => {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return { x, y };
};
