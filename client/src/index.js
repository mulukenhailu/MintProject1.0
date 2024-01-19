import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./State/ReduxToolkit/Store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster
      toastOptions={{
        style: {
          background: "rgb(51 65 85)",
          color: "#fff",
          fontSize: "14px",
        },
        success: { duration: 4000 },
      }}
    />
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
    <Toaster />
  </>
);
