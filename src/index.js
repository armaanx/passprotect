import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import { UserProvider } from "./contexts/usercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
