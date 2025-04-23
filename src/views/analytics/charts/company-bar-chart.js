import { Chart } from "chart.js";
import { chartColors } from "./constants";

export const renderCompanyBarChart = ({ data, chartWrapper }) => {
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

  return new Chart(chartWrapper, {
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
