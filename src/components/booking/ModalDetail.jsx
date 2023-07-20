import React, { memo } from 'react';
import { formatDate, format_date, get_format_price } from '../../helpers/globalfunction';
import { uid } from 'uid';

const ModalDetail = memo(( { value, handle_close }) => {

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Chi tiết đơn đặt phòng
                            </h3>
                        </div>
                         
                        <div
                            className='flex flex-col gap-4 p-4'
                        >
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Mã đơn đặt phòng:
                                </div>
                                <div>
                                   {
                                    value?.id
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Tên khách hàng:
                                </div>
                                <div>
                                   {
                                    value?.Customer?.name
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Email:
                                </div>
                                <div>
                                   {
                                    value?.Customer?.email
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Số điện thoại:
                                </div>
                                <div>
                                   {
                                    value?.Customer?.phone
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Phòng:
                                </div>
                                <div>
                                   {
                                    value?.Room?.name
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Mã phòng:
                                </div>
                                <div>
                                   {
                                    value?.Room?.code
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
                                        get_format_price( value?.Room?.price)
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Ngày dự kiến nhận phòng:
                                </div>
                                <div>
                                   {
                                        format_date(value?.checkInDate)
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Ngày dự kiến trả phòng:
                                </div>
                                <div>
                                   {
                                        format_date(value?.checkOutDate)
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Ngày nhận phòng:
                                </div>
                                <div>
                                   {
                                        formatDate(value?.CheckIn?.date)
                                   }
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div>
                                    Ngày trả phòng:
                                </div>
                                <div>
                                   {
                                        formatDate(value?.CheckOut?.date)
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
                                <div>
                                    {
                                        value?.ServiceOfBookings?.map(
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
                                                            <div>
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
                                        value?.ServiceOfBookings?.length <=0 &&
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
                                        get_format_price( value?.total )
                                   }
                                </div>
                            </div>
                            <div
                                className='flex flex-col gap-2'
                            >
                                <div className=' font-medium'>
                                    Danh sách thanh toán
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                   {
                                        value?.Payments?.map(
                                            item =>
                                            {
                                                return (
                                                    <div className=" flex flex-col gap-2 p-4 border rounded-lg" key={ uid(10) }>
                                                        <div
                                                            className='flex items-center gap-2'
                                                        >
                                                            <div>
                                                                Số tiền thanh toán:
                                                            </div>
                                                            <div className='text-red-500'>
                                                            {
                                                                    get_format_price( item?.paymentAmount )
                                                            }
                                                            </div>
                                                        </div>
                                                        <div
                                                            className='flex items-center gap-2'
                                                        >
                                                            <div>
                                                                Ngày thanh toán:
                                                            </div>
                                                            <div className=''>
                                                            {
                                                                    formatDate( item?.paymentDate )
                                                            }
                                                            </div>
                                                        </div>
                                                        <div
                                                            className='flex items-center gap-2'
                                                        >
                                                            <div>
                                                                Phương thức thanh toán:
                                                            </div>
                                                            <div className=''>
                                                            {
                                                                    item?.paymentMethod
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                   }
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={
                                    () => handle_close( null )
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

ModalDetail.displayName = 'ModalDetail'

export default ModalDetail;