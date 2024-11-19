import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
import LoginPage from "./pages/Authentication/Login/login";
import AuthLanding from "./pages/Authentication/AuthLanding";
import FabricPage from "./pages/Fabric-Page/fabric";
import Customize from "./pages/Customization/Customize";
import Otp from "./pages/Authentication//OtpVerification/otpPage"
import OrderSummary from "./pages/Order-Page/order-summary"
import OrderSuccessful from "./pages/Order-Page/order-successful";
import ProfilePage from "./pages/Profile-Page/profile"


const App = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  return (

    

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={AuthLanding}></Route>

           <Route
          path="/login"
          element={
            <LoginPage
              onOTPRequested={(result) => setConfirmationResult(result)}
            />
          }
        />
         <Route
          path="/otp"
          element={
            confirmationResult ? (
              <Otp confirmationResult={confirmationResult} />
            ) : (
              <div className="text-center p-8 text-red-500">
                Please log in first!
              </div>
            )
          }
        />


          <Route path="/Home" Component={LandingPage}></Route>
          <Route path="/profile" Component={ProfilePage}></Route>
          <Route path="/product" Component={ProductPage}></Route>
          <Route path="/fabric" Component={FabricPage}></Route>
          <Route path="/customize" Component={Customize}></Route>
          <Route path="/ordersummary" Component={OrderSummary}></Route>
          <Route path="/orderSuccessful" Component={OrderSuccessful}></Route>
         <Route path="/search" Component={SearchPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
