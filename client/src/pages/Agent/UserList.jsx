import React, { useEffect, useState } from "react";
import AgentTopNav from "../../components/AgentTopNav";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
    const [orders, setOrders] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch grouped orders
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:3000/orders/grouped");
            setOrders(response.data); // Set orders with the grouped response
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderID, userID) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/agent/updateagentorder",
                {}, // Send empty body to trigger the status update
                { params: { userID, orderID } }
            );

            if (response.status === 200) {
                // Refetch the updated orders
                await fetchOrders();
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <AgentTopNav />
            <div className="px-[17px] mt-[12px]">
                <Search />
            </div>

            {isLoading ? (
                <div className="text-center mt-10">Loading...</div>
            ) : (
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
                                        order.status === "done" ? "text-green-700" : "text-orange-700"
                                    } rounded-xl`}
                                >
                                    {/* Display "done" or "pending" dynamically based on the status */}
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
            )}
        </div>
    );
};

export default UserList;
