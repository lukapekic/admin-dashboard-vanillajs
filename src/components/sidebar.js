export const Sidebar = ({ children }) => {
  return `
    <aside id="sidebar" class="w-48 h-full bg-gray-200 p-5">
        <h2 class="text-2xl text-gray-600 font-bold">Dashboard</h2>
        ${children}
    </aside>
  `;
};
