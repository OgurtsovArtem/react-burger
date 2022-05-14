import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import "./index.css";
import App from "./components/App/App";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
