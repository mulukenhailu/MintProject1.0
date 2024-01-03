import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./State/ReduxToolkit/Store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import global_en from "./components/transitions/english.json";
import global_am from "./components/transitions/amharic.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "ኣማ",
  resources: {
    en: {
      global: global_en,
    },
    ኣማ: {
      global: global_am,
    },
  },
});

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
