import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import Toast from "../../helpers/Toast";
import { uid } from "uid";
import Booking from "../../services/booking.service";
import { format_date } from "../../helpers/globalfunction";
import Dinalog from "./Dinalog";
import Fetch from "../../helpers/fetch";
import ModalDetail from "./ModalDetail";
import { bookingChangeContext } from "../../context/booking_change/BookingChangeContext";
import { useNavigate } from "react-router-dom";
import LoadingItem from '../LoadingItem'
const Table = memo(() => {
    const [ loading, set_loading ] = useState( false )
    const [ is_open, set_dinalog ] = useState( false )
    const [room_types, set_room_type] = useState(null);
    const [ booking_info_detail, set_booking_info_detail ] = useState( null )
    const { set_change_info } = useContext( bookingChangeContext )
    const [ value, set_value ] = useState( null )
    const router = useNavigate()
    const get_room_type = async () => {
        const res = await Booking.getAllBooking();
        if (!res.success) {
            Toast.getToastError(res.message);
            return;
        }

        set_room_type(res.data);
    };

    useEffect(() => {
        get_room_type();
    }, []);

    const handle_submit = useCallback(
        async() =>
        {
            set_dinalog( false )
            set_loading( true )
            const res = await Fetch.make().put(
                `${ import.meta.env.VITE_API_URL }/api/booking/${ value.id }/status`,
                {
                    status: value.value
                }
             )

             if( !res.success )
             {
                Toast.getToastError( res.message )
                set_loading( false )
                return
             }

             await get_room_type()
             set_loading( false )
             Toast.getToastSuccess( res.message )
        }
    )

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
            default:
                break;
        }
    };

    const handle_set_dinalog = ( value, e ) =>
    {
        e.stopPropagation()
        set_value(
            value
        )
        set_dinalog( true )
    }

    const handle_booking_detail = async( value ) =>
    {
        const res = await Fetch.make().get(
            `${import.meta.env.VITE_API_URL}/api/booking/${value.id}`
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_booking_info_detail( res.data )
        return
    }

    const handle_booking_change = async ( value, e) =>
    {
        e.stopPropagation()
        
        const res = await Fetch.make().get(
            `${import.meta.env.VITE_API_URL}/api/booking/${value.id}`
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        set_change_info( res.data )
        router( '/booking/change' )
    }
    // {"id":3,"code":"SINGLE2","name":"Single Room2","description":"A cozy room for one person.","capacity":1,"area":20,"status":"published","employee":1,"priceBegin":"50"
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                khách hàng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                phòng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ngày dụ kiến nhận
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ngày dự kiến trả
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thành tiền
                            </th>
                            <th scope="col" className="px-6 py-3">
                                trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3">
                                nhân viên
                            </th>
                        </tr>
                    </thead>
                    <tbody
                    
                    >
                        {room_types?.map((item) => {
                            return (
                                <tr
                                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-100 cursor-pointer"
                                    key={uid(10)}
                                    onClick={
                                        () => handle_booking_detail( item )
                                    }
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item?.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item?.Customer?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.Room?.code}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format_date(item?.checkInDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format_date(item?.checkOutDate)}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {Number(item?.total).toLocaleString(
                                            "en-US"
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {get_style_status(item?.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.employee || "Chưa có"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className=" flex items-center gap-2">
                                            {
                                                item?.status !== 'cancelled' && 
                                                (
                                                    <button
                                                        type="button"
                                                        className= {
                                                            `text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`
                                                        }
                                                        onClick={
                                                            (e) => handle_set_dinalog( 
                                                                {
                                                                    id: item.id,
                                                                    value: 'cancelled'
                                                                },
                                                                e
                                                            )
                                                        }
                                                    >
                                                        Hủy
                                                    </button>
                                                )
                                            }
                                            
                                           {
                                                item?.status === 'spending' &&
                                                (
                                                    <button
                                                    type="button"
                                                    className={
                                                        `text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 whitespace-nowrap`
    
                                                    }
                                                    onClick={
                                                        (e) => handle_set_dinalog( 
                                                            {
                                                                id: item.id,
                                                                value: 'confirmed'
                                                            },
                                                            e
                                                         )
                                                    }
                                                >
                                                    Xác nhận
                                                </button>
                                                )
                                           }
                                            {
                                                item?.status !== 'cancelled' && item?.status !== 'spending' && item?.status !== 'checkedOut' &&
                                                (
                                                    <button
                                                        type="button"
                                                        className={
                                                            `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 whitespace-nowrap`
                                                            
                                                        }
                                                        onClick={
                                                            e => handle_booking_change( item, e )
                                                        }
                                                    >
                                                        Đổi phòng
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Dinalog
                is_open = { is_open }
                handle_close = { set_dinalog }
                handle_submit = { handle_submit }
            />

            {
                booking_info_detail && 
                (
                    <ModalDetail
                        value = { booking_info_detail }
                        handle_close = { set_booking_info_detail }  
                    />
                )
            }
            {
                loading && 
                (
                    <div className="fixed inset-0 flex items-center justify-center">
                       <div className=" py-4 px-8 rounded-lg bg-black/50 shadow flex items-center justify-center"> <LoadingItem/></div>
                    </div>
                )
            }
        </div>
    );
});

Table.displayName = "Table";
export default Table;
