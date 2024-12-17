import React from 'react'
import TopNav from './TopNav'

const ShowSummary = () => {
  return (
    <div>
        {/* <TopNav /> */}

        <div className=" w-full  mx-auto bg-white rounded-xl border border-black p-6">
      <div className=" flex justify-between items-start">
        {/* Left side: Labels */}
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <p className="font-semibold text-gray-700">Total Amount</p>
          </div>
          <div className="flex">
            <p className="font-semibold  text-gray-700">Payment Mode</p>
          </div>
        </div>

        {/* Right side: Values */}
        <div className="flex flex-col space-y-4 text-right">
          <div className="flex">
            <p className=" font-[700] text-black">₹2000</p>
          </div>
          <div className="flex">
            <p className="font-semibold text-black">Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>






    </div>
  )
}

export default ShowSummary