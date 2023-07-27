import React, { memo, useEffect, useState } from 'react';
import Toast from '../../helpers/Toast';
import { uid } from 'uid';
import PAYMENT from '../../services/payment.service';
import { formatDate, format_date } from '../../helpers/globalfunction';

const Table = memo(( { value } ) => {
    
    const [ room_types, set_room_type ] = useState( null )
    const get_room_type = async() =>
    {
        const res = await PAYMENT.getAllPayment()
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_room_type( res.data )
    }

    useEffect(
        () =>
        {
            get_room_type()
        },
        []
    )

    const get_style_status = value =>
    {
        switch (value) {
            case 'published':
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                        {
                            value
                        }
                    </span>
                )
            case 'spending':
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">

                        {
                            value
                        }
                    </span>

                )
            case 'cancel':
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        {
                            value
                        }
                    </span>

                )
            default:
                break;
        }
    }

    // {"id":3,"code":"SINGLE2","name":"Single Room2","description":"A cozy room for one person.","capacity":1,"area":20,"status":"published","employee":1,"priceBegin":"50"
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                ID
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Mã đặt phòng
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Số tiền đã thanh toán
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                ngày thanh toán
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                nhân viên
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Dự kiến checkin
                            </th>
                         
                        </tr>
                    </thead>
                    <tbody>
                       {
                            room_types?.map(
                                item => 
                                {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                            key={ uid(10) }
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    item?.id
                                                }
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    item?.Booking?.id
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-red-500">
                                                {
                                                    Number(item?.paymentAmount).toLocaleString("vn")+"đ"
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    formatDate(item?.paymentDate)
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                            {
                                                    item?.employee || "Đang cập nhật"
                                               }
                                            </td>
                                            <td
                                                className="px-6 py-4"
                                            >
                                               {
                                                    format_date( item?.Booking?.checkInDate )
                                               }
                                            </td>
                                     
                                            {/* <td className="px-6 py-4">
                                               <div
                                                    className=' flex items-center gap-2'
                                               >
                                                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sửa</button>
                                               </div>
                                            </td> */}
                                        </tr>
                                    )
                                }
                            )
                       }
                    </tbody>
                </table>
            </div>

        </div>
    );
});

Table.displayName = 'Table'
export default Table;