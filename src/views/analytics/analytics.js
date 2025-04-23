import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip,
} from "chart.js";
import { usersStore } from "../../store/users.js";
import { fetchGetUsers } from "../../api/users.js";
import { onViewMounted } from "../../utils/render.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip
);

export const Analytics = () => {
  const users = usersStore.users;

  if (users.length === 0) {
    fetchGetUsers({
      onSuccess: (data) => {
        usersStore.setUsers(() => data);
        renderBarChart({ data });
        renderPieChart({ data });
      },
    });
  } else {
    onViewMounted("analytics-view-wrapper", () => {
      renderBarChart({ data: users });
      renderPieChart({ data: users });
    });
  }

  return `
    <div id="analytics-view-wrapper" class="flex max-h-96">
       <div class="w-1/2"><canvas id="bar-chart"></canvas></div>
       <div class="w-1/2"><canvas id="pie-chart"></canvas></div>
      <div></div>
    </div>
  `;
};

const chartColors = [
  "#5035ba",
  "#ebf673",
  "#e121c0",
  "#350e46",
  "#d8103a",
  "#2bcae1",
  "#6efcad",
  "#c11640",
  "#e05bf1",
  "#673b9a",
  "#be7bb1",
];

const renderBarChart = ({ data }) => {
  const chartWrapper = document.getElementById("bar-chart");

  const datasets = data.reduce((result, currentValue) => {
    const company = currentValue.company.name;
    const currentCount = result[company]?.count ?? 0;
    const users = result[company]?.users ?? [];

    return {
      ...result,
      [company]: {
        count: currentCount + 1,
        users: [...users, currentValue.name],
      },
    };
  }, {});

  new Chart(chartWrapper, {
    type: "bar",
    data: {
      labels: Object.keys(datasets),
      datasets: [
        {
          label: "Users per Company",
          data: Object.values(datasets).map((value) => value.count),
          backgroundColor: chartColors,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const company = context.label;
              const users = datasets[company].users;
              return `Users: ${users.join(", ")}`;
            },
          },
        },
      },
    },
  });
};

const renderPieChart = ({ data }) => {
  const chartWrapper = document.getElementById("pie-chart");

  const datasets = data.reduce((result, currentValue) => {
    const city = currentValue.address.city;
    const currentCount = result[city]?.count ?? 0;
    const users = result[city]?.users ?? [];

    return {
      ...result,
      [city]: {
        count: currentCount + 1,
        users: [...users, currentValue.name],
      },
    };
  }, {});

  new Chart(chartWrapper, {
    type: "pie",
    data: {
      labels: Object.keys(datasets),
      datasets: [
        {
          label: "Users per City",
          data: Object.values(datasets).map((value) => value.count),
          backgroundColor: chartColors,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const company = context.label;
              const users = datasets[company].users;
              return `Users: ${users.join(", ")}`;
            },
          },
        },
      },
    },
  });
};
