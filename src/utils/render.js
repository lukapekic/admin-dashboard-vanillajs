import { Layout } from "../components/layout.js";

export const render = (view) => {
  const children = view() ?? "";

  const mainApplicationWrapper = document.getElementById("app");
  const ActiveLayout = Layout({ children: children });
  mainApplicationWrapper.innerHTML = ActiveLayout;
};

export const onViewMounted = (viewId, callback) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const view = document.getElementById(viewId);

      if (view) {
        callback(view);
        observer.disconnect();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
