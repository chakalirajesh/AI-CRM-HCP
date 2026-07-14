import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AIProvider } from "./context/AIContext";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AIProvider>
    </Provider>
  </React.StrictMode>,
);
