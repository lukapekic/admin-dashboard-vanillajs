import { Sidebar } from "./sidebar.js";
import { Navigation } from "./navigation.js";
import { Header } from "./header.js";

export const Layout = ({ children }) => {
  return `
    ${Sidebar({ children: Navigation() })}

    <section class="flex-1/2 p-5 flex flex-col">
        ${Header({
          loggedInUser: "Luka",
          onLogout: () => console.log("Logged-out"),
        })}

        ${children}
    </section>
  `;
};
