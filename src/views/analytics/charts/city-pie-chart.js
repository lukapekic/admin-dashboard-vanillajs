import { Chart } from "chart.js";
import { chartColors } from "./constants";

export const renderCityPieChart = ({ data, chartWrapper }) => {
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

  return new Chart(chartWrapper, {
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
