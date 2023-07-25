import React, { memo, useContext } from 'react';
import { get_format_price } from '../../helpers/globalfunction';
import { bookingContext } from '../../context/booking/BookingContext';

const CardRoomChild = memo(( { value } ) => {
    const { set_booking_detail } = useContext( bookingContext )
    return (
        <div
            className='border rounded-lg p-4 flex flex-col gap-1'
        >
            <div
                className=' text-[20px] font-medium'
            >
                {
                    value?.name
                }
            </div>
            <div>
                {
                    value?.code
                }
            </div>
            <div
                className='flex items-center gap-2'
            >
                Sức chứa: 
                <div>
                    {
                        value?.capacity
                    }
                </div>
            </div>
            <div
                className=' text-slate-500 italic'
            >
                {
                    value?.description
                }
            </div>
            <div
                className='flex items-center gap-2'
            >
                Giá / 1 đêm: 
                <div
                    className=' text-red-500 '
                >
                    {
                        get_format_price( value?.price )
                    }
                </div>
            </div>
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            
                onClick={
                    () => set_booking_detail( value )
                }
            >
                Đặt phòng
            </button>

        </div>
    );
});
CardRoomChild.displayName = 'CardRoomChild'
export default CardRoomChild;