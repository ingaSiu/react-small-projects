export type Route = {
  path: '/' | '/login' | 'register';
  Component: () => JSX.Element;
};
