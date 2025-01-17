import React, { useState } from 'react';
import AgentTopNav from '../../components/AgentTopNav';
import Search from '../../components/Search';

const EditAgent = () => {

    const [isFabricPicked, setIsFabricPicked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsFabricPicked(e.target.checked);
  };

  return (
    <div>
        
        <AgentTopNav />
        <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className='p-4'>
        <div className='w-full bg-white border-black border-2 p-2 px-3 mt-3 rounded-xl'>

            Farhan Jafri - Tuxedo

        </div>
        <div className='flex justify-between mt-5'>
            <div>
                Fabric Picked up

            </div>
            <div>
            <input
            type="checkbox"
            id="fabricPicked"
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            checked={isFabricPicked}
            onChange={handleCheckboxChange}
          />

            </div>
        </div>
        <div className='flex justify-between mt-3'>
            <div>
               Measurements Done

            </div>
            <div>
            <input
            type="checkbox"
            id="fabricPicked"
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            checked={isFabricPicked}
            onChange={handleCheckboxChange}
          />

            </div>
        </div>
        <div className='flex justify-between mt-3'>
            <div>
      Apparel Delivery
            </div>
            <div>
            <input
            type="checkbox"
            id="fabricPicked"
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            checked={isFabricPicked}
            onChange={handleCheckboxChange}
          />

            </div>
        </div>
        <div className='flex justify-between mt-3'>
            <div>
            Payment Recieved
            </div>
            <div>
            <input
            type="checkbox"
            id="fabricPicked"
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            checked={isFabricPicked}
            onChange={handleCheckboxChange}
          />

            </div>
        </div>
      </div>


      <div className='p-3'>
        <button className='bg-white border-black border-2 w-full flex text-center justify-center rounded-xl p-1'>
            Submit
        </button>
      </div>

        
        </div>
  )
}

export default EditAgent