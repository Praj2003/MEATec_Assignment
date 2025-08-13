import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

if (import.meta.env.DEV) {
  import("./mocks/browser")
    .then(({ worker }) => worker.start())
    .then(renderApp)
    .catch((err) => {
      console.error("Failed to start MSW:", err);
      renderApp();
    });
} else {
  renderApp();
}
