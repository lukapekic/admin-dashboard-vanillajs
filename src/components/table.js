export const Table = ({ columns, data }) => {
  const headerCells = columns
    .map(
      (cell) =>
        `<div class="bg-gray-300 p-3 text-black font-bold text-sm">${cell.name}</div>`
    )
    .join("");

  const rows = data
    .map((row) => {
      return columns
        .map((column) => {
          const cellContent = column.render(row);

          return `<div class="p-3 text-black font-light text-sm">${cellContent}</div>`;
        })
        .join("");
    })
    .join("");

  return `<div class="grid grid-cols-${columns.length} grid-flow-row gap-y-3">
    ${headerCells}
    ${rows}
  </div>`;
};
