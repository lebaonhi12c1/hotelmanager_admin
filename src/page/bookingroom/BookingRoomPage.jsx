import React, { useCallback, useContext, useEffect, useState } from "react";
import { formatDateToYYYYMMDD } from "../../helpers/globalfunction";
import Fetch from "../../helpers/fetch";
import Toast from "../../helpers/Toast";
// import ModalBookingRoom from "../../components/avaiable_room/ModalBookingRoom";
import { bookingContext } from "../../context/booking/BookingContext";
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineDown } from 'react-icons/ai' 
import ListRoom from "../../components/bookingroom/ListRoom";
import ModalBookingRoom from "../../components/avaiable_room/ModalBookingRoom";
function BookingRoomPage(props) {

    const [is_child, set_is_child] = useState(false);
    const [room, set_room] = useState([]);
    const { booking_detail, filter, set_filter } = useContext(bookingContext);
    const [adult, set_adult] = useState(2);
    const [child, set_child] = useState([]);
    const [number_child_option, set_number_child_option] = useState(null);

    const get_rooms = async () => {
        const res = await Fetch.make().get(
            `${import.meta.env.VITE_API_URL}/api/filter/room?${ new URLSearchParams( { startDate: filter.startDate, endDate: filter.endDate, adult: adult, child: JSON.stringify( child ) } ).toString() }`
        );

        if (!res.success) {
            Toast.getToastError(res.message);
            return;
        }

        set_room(res.data);
    };

    useEffect(() => {
        get_rooms();
    }, []);

    const handle_filter = async () => {
        await get_rooms();
    };

    const handleSetCountChild = (type) => {
        switch (type) {
            case "plus":
                child.length < 3 && set_child([...child, { old: 8 }]);
                break;
            case "minus":
                child.length > 0 &&
                    set_child(
                        child.filter((item, index) => index < child.length - 1)
                    );
                break;
            default:
                break;
        }
    };

    const handle_update_value_child = (value) => {
        set_number_child_option(null);
        set_child(
            child.map((item, index) =>
                index === value.index ? value.value : item
            )
        );
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                        value={filter.startDate}
                        onChange={
                            e => set_filter(
                                {
                                    ...filter,
                                    startDate: e.target.value
                                }
                            )
                        }
                    />
                </div>
                <div>đến</div>
                <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                        value={ filter.endDate }
                        onChange={
                            e => set_filter(
                                {
                                    ...filter,
                                    endDate: e.target.value
                                }
                            )
                        }
                    />
                </div>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={adult}
                    onChange={(e) => set_adult(e.target.value)}
                >
                    <option value={adult}>Số lượng người</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>

                <div
                    aria-label="dropdown"
                    className="relative w-fit text-sm font-medium"
                    onClick={() => set_is_child(!is_child)}
                >
                    <div className="flex border rounded-md items-center justify-between w-full p-2.5 cursor-pointer">
                        Số lượng trẻ em
                    </div>

                    {is_child && (
                        <div className="absolute left-0 w-[300px] flex flex-col gap-4 p-2 mt-2 bg-white rounded-lg shadow top-full"
                            onClick={
                                e => e.stopPropagation()
                            }
                        >
                            <div className="flex flex-col gap-2">
                                <div className="text-slate-400">
                                    Số lượng trẻ em
                                </div>
                                <div className="flex items-center justify-between border border-slate-200 p-1 rounded-md gap-2">
                                    <div
                                        className={`text-[24px] ${
                                            child.length > 0
                                                ? "text-blue-500"
                                                : "text-slate-400"
                                        } cursor-pointer`}
                                        onClick={() =>
                                            handleSetCountChild("minus")
                                        }
                                    >
                                        <AiOutlineMinusCircle />
                                    </div>
                                    <div className="text-blue-500">
                                        {child.length} trẻ em
                                    </div>
                                    <div
                                        className={`text-[24px] ${
                                            child.length < 3
                                                ? "text-blue-500"
                                                : "text-slate-400"
                                        } cursor-pointer`}
                                        onClick={() =>
                                            handleSetCountChild("plus")
                                        }
                                    >
                                        <AiOutlinePlusCircle />
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="flex items-center gap-4 flex-wrap"
                            >
                                {child.map((item, index) => {
                                    return (
                                        <div
                                            aria-label="dropdown"
                                            className="relative w-[340px] text-sm font-medium text-black"
                                            key={index}
                                        >
                                            <div
                                                className="flex items-center justify-between w-full p-1 border border-blue-500 rounded cursor-pointer"
                                                onClick={() =>
                                                    set_number_child_option(index)
                                                }
                                            >
                                                <span className="pointer-events-none">
                                                    {item.old + " "}
                                                    tuổi
                                                </span>
                                                <span className="pointer-events-none">
                                                    <AiOutlineDown />
                                                </span>
                                            </div>
                                            {number_child_option == index && (
                                                <div className="absolute z-10 left-0 w-full p-2 mt-2 bg-white rounded-lg shadow top-full h-[300px] overflow-auto">
                                                    {Array(9)
                                                        .fill(0)
                                                        .map(
                                                            (item, index_child) => (
                                                                <div
                                                                    className="p-3 rounded cursor-pointer hover:text-blue-500 hover:bg-blue-50"
                                                                    key={
                                                                        index_child
                                                                    }
                                                                    onClick={() =>
                                                                        handle_update_value_child(
                                                                            {
                                                                                index,
                                                                                value: {
                                                                                    old:
                                                                                        index_child +
                                                                                        3,
                                                                                },
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    {index_child +
                                                                        3}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handle_filter}
                >
                    Tìm kiếm
                </button>
            </div>
            <div>
                <ListRoom
                    value={ room }
                />
            </div>
            {
                booking_detail && 
                (
                    <ModalBookingRoom/>
                )
            }
        </div>
    );
}

export default BookingRoomPage;
