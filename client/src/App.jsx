import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
// import LoginPage from "./pages/Authentication/Login/login"
import Otp from "./pages/Authentication/OtpVerification/otpPage";
import AuthLanding from "./pages/Authentication/AuthLanding";
import FabricPage from "./pages/Fabric-Page/fabric";
import Customize from "./pages/Customization/Customize";
import OrderSummary from "./pages/Order-Page/order-summary";
import OrderSuccessful from "./pages/Order-Page/order-successful";
import ProfilePage from "./pages/Profile-Page/profile";
import HelpAndSupport from "./pages/Profile-Page/Profile-Components/helpandsupport";
import AllAddresses from "./pages/Profile-Page/Profile-Components/allAddresses";
import PersonalDetails from "./pages/Profile-Page/Profile-Components/personalDetails";
import orderHistory from "./pages/Profile-Page/Profile-Components/orderHistory";

// Components
import CategoryPage from "./components/categoryPage";
import ProductCart from "./components/productCart";
import TrendingProductDetails from "./components/TrendingProductDetails";
import AllCategory from "./components/allCategory";
import CartPage from "./components/cartpage";

// Context API
import { ProductProvider } from "./Context Api/trackProduct";

// Miscellaneous
import NotFound from "./pages/NotFound/notfound";
import Error from "./components/error";
import FashionProductDetails from "./components/fashionProductDetails";
import ClickStats from "./pages/Stats/clickStats";

const App = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const handleOffline = () => navigate("/error");

    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication */}
          <Route path="/" Component={AuthLanding} />

          {/* Main Pages */}
          <Route path="/home" Component={LandingPage} />
          {/* <Route path="/login" Component={LoginPage}
          /> */}
          <Route path="/otp" Component={Otp} />

          <Route path="/profile" Component={ProfilePage} />
          <Route path="/orders" Component={orderHistory} />
          <Route path="/product" Component={ProductPage} />
          <Route path="/fabric" Component={FabricPage} />
          <Route path="/customize" Component={Customize} />
          <Route path="/ordersummary" Component={OrderSummary} />
          <Route path="/orderSuccessful" Component={OrderSuccessful} />
          <Route path="/search" Component={SearchPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/error" Component={Error} />

          {/* Profile Sub-pages */}
          <Route path="/addresses" Component={AllAddresses} />
          <Route path="/help-support" Component={HelpAndSupport} />
          <Route path="/personal-details" Component={PersonalDetails} />

          {/* Dynamic Routes */}
          <Route path="/product/:gender" Component={CategoryPage} />
          <Route path="/product/:gender/:category" Component={ProductPage} />
          <Route
            path="/product/:gender/:category/:subCategory"
            Component={ProductPage}
          />

          {/* Additional Components */}
          <Route path="/AllCategory" Component={AllCategory} />
          <Route
            path="/TrendingProduct/:gender/:category"
            Component={TrendingProductDetails}
          />
          <Route
            path="/FashionProduct/:gender/:category"
            Component={FashionProductDetails}
          />
          <Route path="/stats" Component={ClickStats} />

          {/* Fallback Route */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
