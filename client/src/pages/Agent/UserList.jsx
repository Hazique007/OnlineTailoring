import React, { useState } from 'react';
import TopNav from '../../components/TopNav';
import AgentTopNav from '../../components/AgentTopNav';
import Search from '../../components/Search';
import { Link } from 'react-router-dom'

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <AgentTopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>

      <div className="p-4">
        <div className="w-full bg-white border-black border-2 p-2 px-3 rounded-xl">
          12th October
        </div>

        <div className="justify-between p-2 flex mt-2">
          <div>Farhan Jafri - Tuxedo</div>
          <div className="text-green-500">Done</div>
          <div className="cursor-pointer text-blue-500" >
           <Link to='/edit-agent'>
           Edit
           
           </Link>
          </div>
        </div>
      </div>  

      <div className="p-4">
        <div className="w-full bg-white border-black border-2 p-2 px-3 rounded-xl">
          12th October
        </div>

        <div className="justify-between p-2 flex mt-2">
          <div>Farhan Jafri - Tuxedo</div>
          <div className="text-green-500">Done</div>
          <div className="cursor-pointer text-blue-500" >
           <Link to='/edit-agent'>
           Edit
           
           </Link>
          </div>
        </div>
      </div>


       <div className="p-4">
        <div className="w-full bg-white border-black border-2 p-2 px-3 rounded-xl">
          12th October
        </div>

        <div className="justify-between p-2 flex mt-2">
          <div>Farhan Jafri - Tuxedo</div>
          <div className="text-green-500">Done</div>
          <div className="cursor-pointer text-blue-500" >
           <Link to='/edit-agent'>
           Edit
           
           </Link>
          </div>
        </div>
      </div>      

      {/* Dialog Box */}
      {/* {isDialogOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Details</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg p-2"
                  defaultValue="Farhan Jafri"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg p-2"
                  defaultValue="Tuxedo"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserList;
