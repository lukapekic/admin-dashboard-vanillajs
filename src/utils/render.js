import { Layout } from "../components/layout.js";

export const render = (view) => {
  const children = view() ?? "";

  const mainApplicationWrapper = document.getElementById("app");
  const ActiveLayout = Layout({ children: children });
  mainApplicationWrapper.innerHTML = ActiveLayout;
};
