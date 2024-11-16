import React ,{ useState } from "react";
import {IoIosLocate } from "react-icons/io";


const Pickup = ()=>{
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
      name: "",
      address1: "",
      address2: "",
      pincode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        addNewAddress(newAddress);
        setShowForm(false); // Hide form after submission
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" }); // Clear form fields
      };



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
            <button className="text-[12px] flex items-center bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded "
             onClick={() => setShowForm(!showForm)}
            >
            <IoIosLocate className="h-[16px] w-[15px] text-black font-[700] " />

           New Address
               </button>
               
       

    </div>


)



}

export default Pickup;