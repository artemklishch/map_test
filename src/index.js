import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./common.scss";
import "leaflet/dist/leaflet.css";
import App from "./App";
import PopulationCtxProvider from "./contexts/populationCtx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PopulationCtxProvider>
    <App />
  </PopulationCtxProvider>
);
