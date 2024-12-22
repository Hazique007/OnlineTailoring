import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SearchContextProvider from "./Context Api/searchContext.jsx";
import App from "./App.jsx";
import { ProductProvider } from "./Context Api/trackProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </ProductProvider>
  </StrictMode>
);
