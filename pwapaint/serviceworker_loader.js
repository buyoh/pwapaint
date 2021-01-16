if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./serviceworker.js", {
      scope: "/pwapaint/",
    })
    .then((reg) => {})
    .catch((error) => {
      // registration failed
      console.warn("Service Worker Registration failed ", error);
    });
}
