import { Users, Analytics } from "./views/index.js";

export const routes = [
  {
    id: "home",
    path: "/",
    view: Users,
  },
  {
    id: "users",
    path: "/users",
    display: "User Management",
    view: Users,
  },
  {
    id: "analytics",
    path: "/analytics",
    display: "Analytics",
    view: Analytics,
  },
];

export const getActiveRoute = (path) => {
  return routes.find((route) => route.path === path);
};
