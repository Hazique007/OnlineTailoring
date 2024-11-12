import React from "react";
import Step1 from "../assets/images/Step1.png";
import Step2 from "../assets/images/GET MEASURED-3.png";
import Step3 from "../assets/images/MEET YOUR PERSONAL STYLIST-1.png";
import Step4 from "../assets/images/TRIAL FITTING & FINAL DELIVERY-4.png";

import Workcomp from "./work-comp";
const Works = ({ img, head, desc }) => {
  return (
    <div className="mt-8">
      <h1 className="text-[12px] ml-[14px]  font-poppins font-[700]">
        How It Works
      </h1>
      <div className="allComp">
        <Workcomp
          img={Step1}
          head={"Step 1"}
          desc={"Select the style you want to be stitched on the app"}
        />

        <Workcomp
          img={Step2}
          head={"Step 2"}
          desc={
            "Schedule appointment to meet your personal stylist to take measurements and collect fabric"
          }
        />

        <Workcomp
          img={Step3}
          head={"Step 3"}
          desc={
            "Cloth gets stitched & delivered. You pay the stitching charges at the time of delivery."
          }
        />

        <Workcomp
          img={Step4}
          head={"Step 4"}
          desc={"Free 30 day alterations and modifications"}
        />
      </div>
    </div>
  );
};

export default Works;
