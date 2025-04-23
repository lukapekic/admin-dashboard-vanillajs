import { usersStore } from "../../store/users.js";
import { fetchGetUsers } from "../../api/users.js";

import {
  renderCompanyBarChart,
  renderCityPieChart,
  BAR_CHART_ID,
  PIE_CHART_ID,
} from "./charts/index.js";

export const Analytics = () => {
  const users = usersStore.users;
  usersStore.subscribe((data) => renderContent({ data }));

  if (users.length === 0) {
    fetchGetUsers({
      onSuccess: (data) => {
        usersStore.setUsers(() => data);
        renderContent({ data });
      },
    });
  }

  return `
    <div id="analytics-view-wrapper" class="flex max-h-96">
       <div class="w-1/2"><canvas id="${BAR_CHART_ID}"></canvas></div>
       <div class="w-1/2"><canvas id="${PIE_CHART_ID}"></canvas></div>
      <div></div>
    </div>
  `;
};

const renderContent = ({ data }) => {
  const companyBarChartWrapper = document.getElementById(BAR_CHART_ID);
  const cityPieChartWrapper = document.getElementById(PIE_CHART_ID);

  renderCompanyBarChart({ data, chartWrapper: companyBarChartWrapper });
  renderCityPieChart({ data, chartWrapper: cityPieChartWrapper });
};
