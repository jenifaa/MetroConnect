export const generateRoutes = (sidebarItems) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    })),
  );
};
