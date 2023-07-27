import React, { memo, useContext, useState } from 'react';
import { bookingChangeContext } from '../../context/booking_change/BookingChangeContext';
import { format_date, get_day_of_time, get_format_price } from '../../helpers/globalfunction';
import { uid } from 'uid';
import Toast from '../../helpers/Toast';
import Fetch from '../../helpers/fetch';
import LoadingItem from '../LoadingItem';

const ModalBookingChange = memo(() => {
    const { set_room_change, change_info, room_change } = useContext( bookingChangeContext )
    const [ loading, set_loading ] = useState( false )
    const get_price = () =>
    {
        return change_info?.total - change_info?.Room?.price * get_day_of_time( change_info?.checkInDate, change_info?.checkOutDate ) + room_change?.price * get_day_of_time( change_info?.checkInDate, change_info?.checkOutDate )
    }

    const handle_change = async ( ) =>
    {
        set_loading( true )
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/booking/change-room`,
            {
                booking: change_info?.id,
                room: room_change?.id
            }
        )
        if( !res.success )
        {
            Toast.getToastError( res.message )
            set_loading( false )

            return
        }
        Toast.getToastSuccess( res.message )
        set_loading( false )
    }
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Đổi phòng
                            </h3>
                        </div>
                        
                        <div
                            className='flex flex-col gap-4 p-4 max-h-[500px] overflow-auto'
                        >
                            {
                                JSON.stringify( room_change)
                            }
                            {
                                JSON.stringify( change_info )
                            }
                            <div
                                className='rounded-lg p-4 bg-slate-100'
                            >
                                <div
                                    className=' font-medium text-[20px]'
                                >
                                    Thông tin:
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Tên:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                           change_info?.Customer?.name
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Email:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                           change_info?.Customer?.email
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Số diện thoại:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                           change_info?.Customer?.phone
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Đơn:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                            change_info?.id
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Phòng:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                            change_info?.Room?.code
                                        }
                                    </div>
                                </div>
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <div>
                                        Giá phòng:
                                    </div>
                                    <div className='text-red-500'>
                                    {
                                            get_format_price( change_info?.Room?.price)
                                    }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Ngày nhận:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                           format_date( change_info?.checkInDate)
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Ngày trả:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                           format_date( change_info?.checkOutDate)
                                        }
                                    </div>
                                </div>
                                <div
                                    className='flex flex-col gap-2'
                                >
                                    <div
                                        className=' font-medium'
                                    >
                                        Dịch vụ kèm theo
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            change_info?.ServiceOfBookings?.map(
                                                item =>
                                                {
                                                    return (
                                                        <div className=" flex items-center gap-4 p-4 rounded-lg border"
                                                            key={ uid(10) }
                                                        >
                                                            <div
                                                                className='flex items-center gap-2'
                                                            >
                                                                <div>
                                                                    Tên dịch vụ:
                                                                </div>
                                                                <div className=' font-medium italic text-blue-500'>
                                                                    {
                                                                        item?.Service?.name
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div
                                                                className='flex items-center gap-2 pl-4 border-l'
                                                            >
                                                                <div>
                                                                    Giá:
                                                                </div>
                                                                <div
                                                                    className='text-red-500'
                                                                >
                                                                    {
                                                                        get_format_price( item?.Service?.amount )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                        {
                                            change_info?.ServiceOfBookings?.length <=0 &&
                                            (
                                                'Không có dịch vụ kèm theo'
                                            )
                                        }
                                    </div>
                                </div>
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <div>
                                        Thành tiền:
                                    </div>
                                    <div className='text-red-500'>
                                    {
                                            get_format_price( change_info?.total )
                                    }
                                    </div>
                                </div>
                            </div>
                            <div
                                className='rounded-lg p-4 bg-slate-100'
                            >
                                <div
                                    className='text-[20px] font-medium'
                                >
                                    Phòng mới:
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                     Tên phòng:
                                    <div
                                    
                                        className='font-medium'
                                    >
                                        {
                                            room_change?.name
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                    Phòng:
                                    <div
                                        className='font-medium'
                                    >
                                        {
                                            room_change?.code
                                        }
                                    </div>
                                </div>
                                <div
                                    className=' flex items-center gap-2'
                                >
                                    Giá / 1 đêm:
                                    <div
                                        className='text-red-500 font-medium'
                                    >
                                        {
                                            get_format_price( room_change?.price )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className='flex items-center text-[20px] gap-2'
                            >
                                Giá sau khi chuyển đổi:
                                <div
                                    className='text-red-500 font-medium'
                                >
                                    {
                                        get_format_price(
                                            get_price()
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={
                                        handle_change
                                    }
                            >
                               {
                                    loading && 
                                    (
                                        <LoadingItem/>
                                    )
                               }
                               {
                                    !loading && 
                                    (
                                        'Đổi phòng'
                                    )
                               }
                            </button>
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={
                                    () => set_room_change( null )
                                }
                            >
                                Thoát
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});


ModalBookingChange.displayName = 'ModalBookingChange'
export default ModalBookingChange;