import React, { useEffect, useState } from "react";
import AgentTopNav from "../../components/AgentTopNav";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch grouped orders with pagination
  const fetchOrders = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://apnadarzi-5.onrender.com/orders/grouped", {
        params: { page, limit: 10 },
      });

      if (response.data) {
        setOrders(response.data.groupedOrders || {});
        setTotalPages(response.data.totalPages || 1);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderID, userID) => {
    try {
      const response = await axios.post(
        "https://apnadarzi-5.onrender.com/agent/updateagentorder",
        {}, 
        { params: { userID, orderID } }
      );

      if (response.status === 200) {
        await fetchOrders(currentPage);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="pb-6">
      <AgentTopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>

      {isLoading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <>
          {Object.keys(orders).length > 0 ? (
            Object.keys(orders).map((date) => (
              <div key={date} className="p-4">
                <div className="w-full bg-white border-black border-2 p-2 px-3 rounded-xl mb-4">
                  {date}
                </div>

                {orders[date].map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center p-3 rounded-xl mb-2"
                  >
                    <div className="w-[40vw] overflow-hidden text-ellipsis whitespace-nowrap">
                      {order.userName} - {order.category}
                    </div>

                    <div
                      className={`w-[20vw] text-center py-2 ${
                        order.status === "done"
                          ? "text-green-700"
                          : "text-orange-700"
                      } rounded-xl`}
                    >
                      {order.status || "pending"}
                    </div>

                    <div className="w-[20vw] text-center cursor-pointer">
                      <Link
                        to={`/edit-agent/${order._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center mt-10">No orders found.</div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mx-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mx-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
