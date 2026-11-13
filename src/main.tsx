import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ProgressProvider } from "./state/progress";
import "./styles/base.css";
import "./styles/roadmap.css";
import "./styles/drawer.css";
import "./styles/glossary.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </HashRouter>
  </React.StrictMode>,
);
