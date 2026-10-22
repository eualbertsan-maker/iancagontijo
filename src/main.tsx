import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./styles.css";
import { App } from "./App";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
);
if (container.querySelector("main")) hydrateRoot(container, app);
else createRoot(container).render(app);
