import { usersStore } from "../../store/users.js";
import { fetchGetUsers } from "../../api/users.js";
import { Table } from "../../components/table.js";

import {
  renderCompanyBarChart,
  renderCityPieChart,
  BAR_CHART_ID,
  PIE_CHART_ID,
} from "./charts/index.js";

import { onViewMounted } from "../../utils/render.js";

export const Analytics = () => {
  const users = usersStore.users;
  usersStore.subscribe((data) => renderContent({ data }));

  if (users.length === 0) {
    fetchGetUsers({
      select: (users) => users.map((user) => ({ ...user, active: true })),
      onSuccess: (data) => {
        usersStore.setUsers(() => data);
      },
    });
  } else {
    onViewMounted("analytics-view-wrapper", () =>
      renderContent({ data: users })
    );
  }

  return `
    <div id="analytics-view-wrapper" >
       <div class="flex max-h-96">
          <div class="w-1/2"><canvas id="${BAR_CHART_ID}"></canvas></div>
          <div class="w-1/2"><canvas id="${PIE_CHART_ID}"></canvas></div>
       </div>
    </div>
  `;
};

const renderContent = ({ data }) => {
  const companyBarChartWrapper = document.getElementById(BAR_CHART_ID);
  const cityPieChartWrapper = document.getElementById(PIE_CHART_ID);

  renderCompanyBarChart({ data, chartWrapper: companyBarChartWrapper });
  renderCityPieChart({ data, chartWrapper: cityPieChartWrapper });

  renderSummary({ data });
};

const renderSummary = ({ data }) => {
  const activeUsers = data.filter((user) => user.active);

  const wrapper = document.getElementById("analytics-view-wrapper");
  const summaryWrapper = document.createElement("div");

  const usersTable = generateUsersTable(data.filter((user) => user.active));

  summaryWrapper.innerHTML = `
    <section>
      <div class="flex flex-col gap-3">
        <p class="font-bold text-black">Number of active users: <span class="font-light">${
          activeUsers.length
        }</span></p>
        <p class="font-bold text-black">Number of inactive users: <span class="font-light">${
          data.length - activeUsers.length
        }</span></p>
      </div>

      <div id="summary-users-table" class="mt-15">${usersTable}</div>
    </section>
  `;

  wrapper.appendChild(summaryWrapper);
};

const generateUsersTable = (users) => {
  return Table({
    columns: [
      {
        name: "Name",
        render: (row) => row.name,
      },
      {
        name: "Company",
        render: (row) => row.company.name,
      },
      {
        name: "City",
        render: (row) => row.address.city,
      },
    ],
    data: users,
  });
};
