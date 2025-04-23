import { onViewMounted } from "../utils/render";

export const Header = ({ loggedInUser, onLogout }) => {
  onViewMounted("header-logout-button", (view) =>
    view.addEventListener("click", onLogout)
  );

  return `
    <header id="header" class="flex justify-end items-center gap-3">
        <p class="text-lg text-black">${loggedInUser}</p>
        <button id="header-logout-button" class="bg-neutral-50 border border-blue-600 text-gray-600 outline-0 rounded-sm p-1 cursor-pointer">Logout</button>
    </header>
  `;
};
