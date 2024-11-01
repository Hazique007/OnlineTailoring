import React from "react";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import Hero from "../../components/Hero";
import MenStyle from "../../components/menStyle";
import WomenStyling from "../../components/womenStyling";
import KidsStyling from "../../components/kidsStyling";
import Trending from "../../components/Trending";
import Works from "../../components/Works";
import WhatsApp from "../../components/whats";
const LandingPage = () => {
  return (
    <div className="pb-20">
      <TopNav />
      <div className="w-[100vw] justify-center px-[13px] pt-[11px] items-center ">
        <Search />
        <Hero />
      </div>
      <MenStyle />
      <WomenStyling />
      <KidsStyling />
      <div className="w-[100vw] flex justify-center items-center ">
        <WhatsApp />
      </div>
      <Trending />
      <Works />
      <Navbar />
    </div>
  );
};

export default LandingPage;
