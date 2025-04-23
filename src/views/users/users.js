import { fetchGetUsers } from "../../api/users.js";
import { Table } from "../../components/table.js";
import { UserPreviewEditModal } from "../../components/modals/user-preview-edit-modal.js";
import { handleModalState } from "../../utils/modal.js";
import { usersStore } from "../../store/users.js";
import { UsersTableSearch } from "./users-table-search.js";

const getUsersProps = {
  onSuccess: (users) => {
    usersStore.setUsers(() => users);
    usersStore.setInitialUsers(users);
    renderUsersTable(users);
  },
  onError: () => renderErrorFallbackUsersView(),
  select: (users) => users.map((user) => ({ ...user, active: true })),
};

export const Users = () => {
  fetchGetUsers(getUsersProps);
  usersStore.subscribe(renderUsersTable);

  const handleSearchChange = (value) => {
    if (value === "")
      return usersStore.setUsers((_, initialUsers) => initialUsers);

    usersStore.setUsers((previousValue) => {
      return previousValue.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  return `
    <div id="users-view-wrapper" class="flex flex-col flex-1">
        <h2 class="mb-10">User Managment</h2>
        <div id="users-table-wrapper">
          <div>${UsersTableSearch({
            onChange: handleSearchChange,
          })}</div>
          <div id="users-table" class="flex-1">Loading...</div>
        </div>
    </div>
    `;
};

const renderUsersTable = (users) => {
  const tableContainer = document.getElementById("users-table");

  const { openModal, closeModal } = handleModalState();

  const handleDeactivateUser = (userId) => {
    usersStore.deactivateUser(userId);
  };

  document.addEventListener("click", (event) => {
    if (event.target.matches("button[data-user]")) {
      const userId = event.target.getAttribute("data-user");
      handleDeactivateUser(userId);
    }

    if (event.target.matches("div[data-user]")) {
      const userId = event.target.getAttribute("data-user");
      const user = usersStore.getUser(userId);

      openModal({
        content: UserPreviewEditModal({
          user,
          onClose: closeModal,
        }),
      });
    }
  });

  const render = () => {
    const usersTable = generateUsersTable(users.filter((user) => user.active));
    tableContainer.innerHTML = usersTable;
  };

  render();
};

const generateUsersTable = (users) => {
  return Table({
    columns: [
      {
        name: "Name",
        render: (row) => `<div data-user="${row.id}">
          ${row.name}
        </div>`,
      },
      {
        name: "Email",
        render: (row) => row.email,
      },
      {
        name: "Company Name",
        render: (row) => row.company.name,
      },
      {
        name: "",
        render: (row) =>
          `<button data-user="${row.id}" class='border border-black cursor-pointer p-2 rounded-sm'>Deactivate</button>`,
      },
    ],
    data: users,
  });
};

const renderErrorFallbackUsersView = () => {
  const tableContainer = document.getElementById("users-table");
  tableContainer.innerHTML = `<div class="flex gap-3 items-center">An error occured while loading the data. Please try again later.<button id="users-view-retry-request" class='border border-black cursor-pointer p-2 rounded-sm'>Try again.</button></div>`;

  const retryRequestButton = document.getElementById(
    "users-view-retry-request"
  );

  retryRequestButton.addEventListener("click", () =>
    fetchGetUsers(getUsersProps)
  );
};
