import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
import LoginPage from "./pages/Authentication/Login/login";
import AuthLanding from "./pages/Authentication/AuthLanding";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={AuthLanding}></Route>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/Home" Component={LandingPage}></Route>
          <Route path="/product" Component={ProductPage}></Route>
          <Route path="/search" Component={SearchPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
