import React, { memo, useContext, useState } from 'react';
import { formatDate, format_date, get_format_price } from '../../helpers/globalfunction';
import { modal_check_in } from '../../context/check_in_out/ModalCheckInContext';
import { check_out_context } from '../../context/check_in_out/ModalCheckOutContext';
import { uid } from 'uid';

const CardBookingCheckInOut = memo(( { value } ) => {

    const { set_check_in_info } = useContext( modal_check_in )
    const { set_check_out_info } = useContext( check_out_context )

    const handle_open_check_in = () =>
    {
        set_check_in_info( value )
    }

    return (
        <div>
            <div className="max-w-sm p-6 flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div
                    className='flex items-center gap-2'
                >
                    <span>
                        Tên khách hàng:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                            value?.Customer?.name
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span>
                        Email:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                            value?.Customer?.email
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span>
                        Phòng:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                            value?.room
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span>
                        Thành tiền:
                    </span>
                    <span
                        className=' font-medium text-red-500'
                    >
                        {
                           get_format_price( 
                                value?.total
                            )
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span>
                        Đã thanh toán:
                    </span>
                    <span
                        className=' font-medium text-red-500'
                    >
                        {
                           get_format_price( value?.Payments?.reduce(
                                    ( total, item ) => total + Number(item?.paymentAmount),
                                    0
                                ),
                            )
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <div>
                        Dịch vụ:
                    </div>
                    {
                        value?.ServiceOfBookings?.map(
                            item => {
                                return (
                                    <div className=" text-blue-500" 
                                        key={ uid( 10 ) }
                                    >
                                        {
                                            item?.Service?.name
                                        }
                                    </div>
                                )
                            }
                        )
                        
                    }
                    {
                        value?.ServiceOfBookings.length <= 0 && 
                        (
                            <div className=' text-blue-500'>
                                Chưa có
                            </div>
                        )
                    }
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span className=' whitespace-nowrap'>
                        Ngày dự kiến check in:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                           format_date( value?.checkInDate )
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span className=' whitespace-nowrap'>
                        Ngày dự kiến check out:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                           format_date( value?.checkOutDate)
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span className=' whitespace-nowrap'>
                        Ngày check in:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                            
                           formatDate( value?.CheckIn?.date )
                        }
                    </span>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span className=' whitespace-nowrap'>
                        Ngày check out:
                    </span>
                    <span
                        className=' font-medium italic text-slate-500'
                    >
                        {
                            
                           formatDate( value?.CheckOut?.date )
                        }
                    </span>
                </div>

                {
                    value?.status === 'confirmed' &&
                    (
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 justify-center"
                            onClick={
                                handle_open_check_in
                            }
                        >
                            Check In
                        </a>
                    )
                }
                 {
                    value?.status === 'checkedIn' &&
                    (
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 justify-center"
                            onClick={
                                
                                () => set_check_out_info( value )
                            }
                        >
                            Check Out
                        </a>
                    )
                }
                {
                    value?.status === 'checkedOut' &&
                    (
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 justify-center"
                        >
                            Hoàn thành
                        </a>
                    )
                }
            </div>
        </div>
    );
});
CardBookingCheckInOut.displayName = 'CardBookingCheckInOut'
export default CardBookingCheckInOut;