import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
import LoginPage from "./pages/Authentication/Login/login";
import AuthLanding from "./pages/Authentication/AuthLanding";
import FabricPage from "./pages/Fabric-Page/fabric";
import Customize from "./pages/Customization/Customize";
import NotFound from "./pages/NotFound/notfound";
import otp from "./pages/Authentication//OtpVerification/otpPage";
import OrderSummary from "./pages/Order-Page/order-summary";
import OrderSuccessful from "./pages/Order-Page/order-successful";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={AuthLanding}></Route>
          <Route path="/login" Component={LoginPage}></Route>

          <Route path="/otp" Component={otp}></Route>
          <Route path="/Home" Component={LandingPage}></Route>
          <Route path="/product" Component={ProductPage}></Route>
          <Route path="/fabric" Component={FabricPage}></Route>
          <Route path="/customize" Component={Customize}></Route>

          <Route path="/search" Component={SearchPage}></Route>
          <Route path="/ordersummary" Component={OrderSummary}></Route>
          <Route path="/orderSuccessful" Component={OrderSuccessful}></Route>
          <Route path="/search" Component={SearchPage}></Route>
          <Route path="/product/:gender" Component={ProductPage}></Route>
          <Route
            path="/product/:gender/:category"
            Component={ProductPage}
          ></Route>

          <Route path="*" Component={NotFound}></Route>
          {/* Home/Men%20Styling/Pants */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
