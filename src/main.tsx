import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {store, persistor} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {PersistGate} from "redux-persist/integration/react";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App/>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

