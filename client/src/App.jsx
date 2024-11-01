import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing-Page/landing";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
