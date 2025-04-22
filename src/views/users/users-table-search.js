import { debounce } from "../../utils/helpers.js";

let searchTerm = "";

export const UsersTableSearch = ({ onChange }) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    searchTerm = value;

    onChange?.(value);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const searchUsersInput = document.getElementById(
        "users-table-search-input"
      );

      if (searchUsersInput) {
        searchUsersInput.addEventListener(
          "input",
          debounce(handleSearchChange, 300)
        );

        observer.disconnect();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return `
    <input
      id="users-table-search-input"
      value="${searchTerm}"
      placeholder="Search for a user..."
      class="w-full border border-gray-300 p-3 mb-5 shadow-2xs rounded-md"
    />
  `;
};
