import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import Hero from "../../components/Hero";
// import MenStyle from "../../components/menStyle";
// import WomenStyling from "../../components/womenStyling";
// import KidsStyling from "../../components/kidsStyling";
import Trending from "../../components/Trending";
import Works from "../../components/Works";
import WhatsApp from "../../components/whats";
import Fashion from "../../components/fashionStyling";
import { DesignStyling } from "../../components/styling";

const LandingPage = () => {
  return (
    <div className="pb-20">
      <TopNav />
      <div className="w-full justify-center px-4 pt-3">
        <Search />
        <Hero />

        <DesignStyling />
        <div className="flex justify-center items-center">
          <WhatsApp />
        </div>
        <Trending />
        <Works />
        <Fashion />
      </div>
      <Navbar />
    </div>
  );
};

export default LandingPage;
