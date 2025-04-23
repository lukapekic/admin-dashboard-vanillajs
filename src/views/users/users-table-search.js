import { debounce } from "../../utils/helpers.js";
import { onViewMounted } from "../../utils/render.js";

let searchTerm = "";

export const UsersTableSearch = ({ onChange }) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    searchTerm = value;

    onChange?.(value);
  };

  onViewMounted("users-table-search-input", (view) =>
    view.addEventListener("input", debounce(handleSearchChange, 300))
  );

  return `
    <input
      id="users-table-search-input"
      value="${searchTerm}"
      placeholder="Search for a user..."
      class="w-full border border-gray-300 p-3 mb-5 shadow-2xs rounded-md"
    />
  `;
};
