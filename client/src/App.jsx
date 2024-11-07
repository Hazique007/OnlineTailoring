import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
          <Route path="/product" Component={ProductPage}></Route>
          <Route path="/search" Component={SearchPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
