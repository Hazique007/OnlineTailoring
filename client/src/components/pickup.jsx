import React from "react";
import {IoIosLocate } from "react-icons/io";

const Pickup = ()=>{



return (

    <div className="flex items-center justify-between px-[8px]">
       <div>

       <p className=" pl-10 font-[700] text-[14px] pt-10">
        Pick up and Delivery Details
        </p>
       
            <p className="pl-10 font-[400] text-[12px] pt-2">
            Pick up and Delivery Details
            </p>

            </div>
            <button class="text-[12px] flex items-center bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded">
            <IoIosLocate className="h-[16px] w-[15px] text-black font-[700] " />

           Change Address
               </button>
       

    </div>


)



}

export default Pickup;