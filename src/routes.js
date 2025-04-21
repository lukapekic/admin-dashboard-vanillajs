export const routes = [
  {
    id: "home",
    path: "/",
    view: () => {
      return "<div>Users</div>";
    },
  },
  {
    id: "users",
    path: "/users",
    display: "User Management",
    view: () => {
      return "<div>Users</div>";
    },
  },
  {
    id: "analytics",
    path: "/analytics",
    display: "Analytics",
    view: () => {
      return "<div>Charts</div>";
    },
  },
];

export const getActiveRoute = (path) => {
  return routes.find((route) => route.path === path);
};
