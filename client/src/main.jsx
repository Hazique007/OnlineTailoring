import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SearchContextProvider from "./Context Api/searchContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </StrictMode>
);
