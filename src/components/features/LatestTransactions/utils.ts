export const formatterPath = (path: string): string => {
  if (path.includes('token')) return '/token';
  return path;
};
