import React from "react";
import TopNav from "../../components/TopNav";
import check from "../../assets/images/Check Mark.png";
import { useNavigate } from 'react-router-dom';



const OrderSuccessful =()=>{

    const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/Home');

    
  };

return(
    <div className="mb-10">

    <TopNav />

    <div className="flex justify-center items-center pt-20">
    <img 
     src={check} alt="" />
    
   

</div>
<br></br>
   
   
   <h2 className="text-2xl  text-[#DA3A3A] text-center font-[600]">Order Successful</h2>

   <p className="text-center pt-10">
   Your order has been successfully placed.<br></br><br></br>

<span className="text-[#4CAF50]">Pickup and Measurement :</span> {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-GB').replace(/\//g, '-')}<br></br><br></br>

<span className="text-[#4CAF50]">Delivery:</span> {new Date(new Date().setDate(new Date().getDate() + 4)).toLocaleDateString('en-GB').replace(/\//g, '-')}
   </p>

   <div className="flex items-center justify-center mt-10">
        <button
        onClick={handleProceed}
        
       
          className=" w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
         
        >
          Go to Home
          
        </button>
        </div>


   
    



</div>




)





};
export default OrderSuccessful;