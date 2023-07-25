import React, { memo, useContext } from "react";
import { get_format_price } from "../../helpers/globalfunction";
// import { bookingContext } from "../../context/booking/BookingContext";

const CardFilterRoom = memo(( { value } ) => {
    // const { set_booking_detail } = useContext( bookingContext )
    const get_style_status = (value) => {
        switch (value) {
            case "confirmed":
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 whitespace-nowrap">
                        Đã xác nhận
                    </span>
                );
            case "spending":
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 whitespace-nowrap">
                        Chờ xác nhận
                    </span>
                );
            case "cancelled":
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 whitespace-nowrap">
                        Đã hủy
                    </span>
                );
            case "checkedIn":
                return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 whitespace-nowrap">
                        Checked In
                    </span>
                );
            case "checkedOut":
                return (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-orange-400 border border-orange-400 whitespace-nowrap">
                        Checked Out
                    </span>
                );
            case "requestCancel":
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400 whitespace-nowrap">
                        Yêu cầu hủy đơn
                    </span>
                );
            case "free":
                return (
                    <span className="bg-green-200 text-green-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-500 border border-green-500 whitespace-nowrap">
                        Đang trống
                    </span>
                );
            default:
                break;
        }
    };
    return (
        <div className="max-w-sm p-6 h-full flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {value?.code} - {value?.name}
                </h5>
            </a>
            <div
                className="flex flex-col gap-2"
            >
                <div
                    className=" flex items-center gap-2"
                >
                    <div>
                        Sức chứa:
                    </div>
                    <div>
                        {
                            value?.capacity
                        }
                    </div>
                </div>
                <div
                    className=" flex items-center gap-2"
                >
                    <div>
                        Loại phòng:
                    </div>
                    <div>
                        {
                            value?.RoomType?.name
                        }
                    </div>
                </div>
                <div
                    className=" flex items-center gap-2"
                >
                    <div>
                        Trạng thái:
                    </div>
                    <div>
                        {
                            get_style_status( value?.status )
                        }
                    </div>
                </div>
                <div
                    className=" flex items-center gap-2"
                >
                    <div>
                        Giá phòng:
                    </div>
                    <div
                        className=" text-[20px] text-red-500 font-medium"
                    >
                        {
                           get_format_price( value?.price )
                        }
                    </div>
                </div>
                
            </div>
            {/* {
                value?.status === 'free' && 
                (
                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={
                            () => set_booking_detail( value )
                        }
                    >
                        Đặt phòng
                    </button>

                )
            } */}

        </div>
    );
});
CardFilterRoom.displayName = 'CardFilterRoom'
export default CardFilterRoom;
