import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./app/store.jsx";
import { Provider } from "react-redux";
import { fetchProducts } from "./Features/Products/ProductSlice.jsx";
import { fetchBrands } from "./Features/Brand/BrandSlice.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
