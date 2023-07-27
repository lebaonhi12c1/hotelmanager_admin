
import React, { memo, useContext } from 'react';
import { get_format_price } from '../../helpers/globalfunction';
import { bookingChangeContext } from '../../context/booking_change/BookingChangeContext';

const CardBookingChange = memo(( { value } ) => {
    const { set_room_change } = useContext( bookingChangeContext )
    return (
        <div
            className='flex flex-col p-4 shadow border rounded-lg gap-2'
        >
            <div
                className='text-[20px] font-medium'
            >
                {
                    value?.name
                }
            </div>
            <div
                className='flex items-center gap-2'
            >
                Phòng:
                <div>
                    {
                        value?.code
                    }
                </div>
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
                className='flex items-center gap-2'
            >
                <div
                    className='text-slate-500 italic'
                >
                    {
                        value?.description
                    }
                </div>
            </div>
            <div
                className='flex items-center gap-2'
            >
                Giá / 1 đêm:
                <div
                    className='text-red-500'
                >
                    {
                        get_format_price( value?.price )
                    }
                </div>
            </div>
            <button type="button" className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            
                    onClick={
                        () => set_room_change( value )
                    }
            >
                Đổi phòng
            </button>

        </div>
    );
});
CardBookingChange.displayName = 'CardBookingChange'
export default CardBookingChange;