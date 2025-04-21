export const NAVIGATION_EVENT_NAME = "history-location-change";

const dispatchNavigationEvent = (url) => {
  window.dispatchEvent(
    new CustomEvent(NAVIGATION_EVENT_NAME, {
      detail: {
        url,
      },
    })
  );
};

export const navigate = (url) => {
  if (!url) return;

  dispatchNavigationEvent(url);
  history.pushState({}, "", url);
};
