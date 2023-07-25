import React, { memo, useContext, useEffect, useState } from 'react';
import { bookingContext } from '../../context/booking/BookingContext';
import { get_day_of_time, get_format_price } from '../../helpers/globalfunction';
import Fetch from '../../helpers/fetch'
import Toast from '../../helpers/Toast'
import { uid } from 'uid';
import { format } from "date-fns";
import LoadingItem from '../LoadingItem';

const BookingRoom = memo(( { value } ) => {
    const { booking_detail, filter } = useContext( bookingContext )
    const [ services, set_services ] = useState( null )
    const [ total, set_total ] = useState( 0 )
    const [ loading, set_loading ] = useState( false )
    const [ status, set_status ] = useState( 'confirmed' )
    const [ payment_method, set_payment_method ] = useState( 'Chuyển khoản' )
    const [selectedServices, setSelectedServices] = useState([]);
    
    const get_services = async() =>
    {
        const res = await Fetch.make().get(
            `${ import.meta.env.VITE_API_URL }/api/service`
        )
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_services( res.data )

    }
    const  handle_submit = async(  ) =>
    {
        set_loading( true )
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/booking`,
            {
                customer: value?.id,
                room: booking_detail?.id,
                checkInDate: filter.startDate,
                checkOutDate: filter.endDate,
                status: status,
                employee: JSON.parse( localStorage.getItem( 'user' )).id,
                paymentAmount: total * 0.3,
                paymentMethod: payment_method,
                total: total,
                services: selectedServices.map(
                    item => JSON.parse( item )
                )
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

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
    
        // Kiểm tra nếu giá trị checkbox đã được chọn trước đó thì loại bỏ nó khỏi danh sách
        // Nếu chưa được chọn trước đó thì thêm vào danh sách
        setSelectedServices((prevSelectedServices) =>
          prevSelectedServices.includes(value)
            ? prevSelectedServices.filter((item) => item !== value)
            : [...prevSelectedServices, value]
        );
      };

    useEffect(
        () =>
        {
            get_services()
        }
        ,[]
    )
    

    useEffect(
        () =>
        {
            set_total(
                Number(booking_detail?.price) * get_day_of_time( filter.startDate, filter.endDate ) + selectedServices?.reduce(
                    ( total, item ) => total + Number( JSON.parse( item )?.amount ),
                    0
                )
            )
        },[ selectedServices, booking_detail, filter ]
    )
    return (
        <div
        className=' rounded-lg flex flex-col gap-4'
        >
            <blockquote className="p-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                <div className=" italic leading-relaxed text-gray-900 dark:text-white flex flex-col">
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Mã phòng:
                        </div>
                        <div>
                            {
                                booking_detail?.code || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Tên phòng:
                        </div>
                        <div>
                            {
                                booking_detail?.name || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Loại phòng:
                        </div>
                        <div>
                            {
                                booking_detail?.RoomType?.name || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Giá phòng / 1 đêm:
                        </div>
                        <div className='text-red-500'>
                            {
                                get_format_price( booking_detail?.price ) || 'Chưa có'
                            }
                        </div>
                    </div>
                </div>
            </blockquote>
            <div
                className='flex flex-col gap-4 p-4 border rounded-lg'
            >
               
                <div className="flex items-center">
                    
                    <div
                        className=' px-4 py-2 border rounded-lg bg-slate-100'
                    >
                        {
                            filter.startDate
                        }
                    </div>

                    <span className="mx-4 text-gray-500">đến</span>
                    <div
                        className=' px-4 py-2 border rounded-lg bg-slate-100'
                    >
                        {
                            filter.endDate
                        }
                    </div>
                </div>
                <div>
                    {services?.map((item) => {
                        return (
                        <div className="flex items-center gap-4" key={uid(10)}>
                            <div className="flex items-center">
                                <input id={ item?.code} type="checkbox" name='services' value={ JSON.stringify( item ) } className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={handleCheckboxChange}
                                    // Kiểm tra xem checkbox có nằm trong danh sách đã chọn không
                                    checked={selectedServices.includes(JSON.stringify(item))}
                                />
                                <label htmlFor={ item?.code} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {
                                        item?.name
                                    }
                                </label>
                            </div>
                            <div
                                className='text-red-500'
                            >
                                {
                                    get_format_price( item?.amount )
                                }
                            </div>
                        </div>
                        );
                    })}
                </div>
                 
                <div>
                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Trạng thái
                    </label>
                    <select id="years" size="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={
                            e => set_status( e.target.value )
                        }
                    >
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="checkedIn">Check In</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="payment_method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phương thức thanh toán
                    </label>
                    <select id="payment_method" size="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={
                            e => set_payment_method( e.target.value )
                        }
                    >
                        <option value="Tiền mặt">Tiền mặt</option>
                        <option value="Chuyển khoản">Chuyển khoản</option>
                    </select>
                </div>
                 <div
                    className='flex items-center gap-2'
                 >
                    Thành tiền:
                    <div
                        className='text-red-500 font-medium'
                    >
                        {
                            get_format_price( total )
                        }
                    </div>
                 </div>
                 <div
                    className='flex items-center gap-2 text-[24px]'
                 >
                    Thanh toán trước:
                    <div
                        className='text-red-500 font-medium'
                    >
                        {
                            get_format_price( total * 0.3 )
                        }
                    </div>
                 </div>

                {
                    loading && 
                    (
                        <button className="text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex justify-center "

                        >
                            <LoadingItem/>
                        </button>
                    )
                }
                {
                    !loading && 
                    (
                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                            onClick={
                                handle_submit
                            }
                        >
                            Đặt phòng
                        </button>
                    )
                }
            </div>
        </div>
    );
});

BookingRoom.displayName = 'BookingRoom'
export default BookingRoom;