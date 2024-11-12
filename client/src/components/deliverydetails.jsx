import React ,{ useState }from "react";

const Delivery = ()=>{

    const [selectedAddress, setSelectedAddress] = useState('');
 
    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
      };


return(
    <div className="p-4  rounded-md pl-10">


      <div className="flex flex-col space-y-2">
        {/* Address 1 */}
        <label className="flex items-center text-[12px] font-[500]">
          <input
            type="radio"
            value="Address 1"
            checked={selectedAddress === 'Address 1'}
            onChange={handleAddressChange}
            className="mr-2 w-3 h-3"
            
          />
          Deliver to: Farhan Jafri<br></br>
          Flat 6666. Society AABBCC, Tower 8, Floor 21, Near Dwarka Expressway, Gurgaon, 122017
        </label>
        <p className="text-[#DA3A3A] text-[12px] pl-5 font-[500]">
        Pick up Today | Delivery in 3 days
        </p>

        {/* Address 2 */}
        <label className="flex items-center text-[12px] font-[500]">
          <input
            type="radio"
            value="Address 2"
            checked={selectedAddress === 'Address 2'}
            onChange={handleAddressChange}
             className="mr-2 w-3 h-3"
          />
         Deliver to: Farhan Jafri<br></br>
         Flat 6666. Society AABBCC, Tower 8, Floor 21, Near Dwarka Expressway, Gurgaon, 122017
        </label>

        {/* Address 3 */}
        <label className="flex items-center text-[12px] font-[500]">
          <input
            type="radio"
            value="Address 3"
            checked={selectedAddress === 'Address 3'}
            onChange={handleAddressChange}
             className="mr-2 w-3 h-3"
          />
          Deliver to: Farhan Jafri<br></br>
          Flat 6666. Society AABBCC, Tower 8, Floor 21, Near Dwarka Expressway, Gurgaon, 122017
        </label>
      </div>

     <div className="flex">
     <button class=" ml-auto px-4 py-2 text-right text-[#1043F9] font-[500] pt-5 text-[12px]">
        View more...

      </button>

     </div>

     
    </div>





);



}
export default Delivery