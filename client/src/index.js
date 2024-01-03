import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./State/ReduxToolkit/Store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </BrowserRouter>
);
