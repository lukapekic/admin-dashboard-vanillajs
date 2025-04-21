import { getActiveRoute } from "./routes.js";
import { NAVIGATION_EVENT_NAME } from "./utils/navigation.js";
import { render } from "./utils/render.js";

/* SETUP ROUTING */
window.addEventListener(NAVIGATION_EVENT_NAME, (event) => {
  event.preventDefault();

  const URL = event.detail.url;

  const activeView = getActiveRoute(URL);

  if (!activeView) return;

  render(() => activeView.view());
});

const renderInitialRoute = () => {
  const { pathname } = window.location;
  const activeView = getActiveRoute(pathname);

  render(() => activeView.view());
};

renderInitialRoute();
