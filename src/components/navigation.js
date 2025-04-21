import { routes } from "../routes.js";
import { navigate } from "../utils/navigation.js";

export const Navigation = () => {
  window.addEventListener("click", (event) => {
    if (event.target.matches("a[href]")) {
      event.preventDefault();
      const url = event.target.getAttribute("href");
      navigate(url);
    }
  });

  const routesList = routes
    .map((route) => {
      if (route.display) {
        return `<a id="${route.id}" class="cursor-pointer" href="${route.path}">${route.display}</a>`;
      }
    })
    .filter((route) => Boolean(route))
    .join("");

  return `
    <nav class="mt-16">
        <ul class="list-none flex flex-col">
            ${routesList}
        </ul>
    </nav>
  `;
};
