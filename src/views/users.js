import { fetchGetUsers } from "../api/users.js";
import { Table } from "../components/table.js";
import { usersStore } from "../store/users.js";

const getUsersProps = {
  onSuccess: (users) => {
    usersStore.setUsers(users);
    renderUsersTable(users);
  },
  onError: () => renderErrorFallbackUsersView(),
  select: (users) => users.map((user) => ({ ...user, active: true })),
};

export const Users = () => {
  fetchGetUsers(getUsersProps);
  usersStore.subscribe(renderUsersTable);

  return `
    <div id="users-view-wrapper" class="flex flex-col flex-1">
        <h2 class="mb-10">User Managment</h2>
        <div id="users-table" class="flex-1">Loading...</div>
    </div>
    `;
};

const renderUsersTable = (users) => {
  const tableContainer = document.getElementById("users-table");

  const handleDeactivateUser = (userId) => {
    usersStore.deactivateUser(userId);
  };

  document.addEventListener("click", (event) => {
    if (event.target.matches("button[data-user]")) {
      const userId = event.target.getAttribute("data-user");
      handleDeactivateUser(userId);
    }
  });

  const usersToRender = users.filter((user) => user.active);

  const usersTable = Table({
    columns: [
      {
        name: "Name",
        render: (row) => row.name,
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
    data: usersToRender,
  });

  tableContainer.innerHTML = usersTable;
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
