
import React, { memo, useContext } from 'react';
import { get_format_price } from '../../helpers/globalfunction';
import { bookingChangeContext } from '../../context/booking_change/BookingChangeContext';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';

const CardBookingChange = memo(( { value } ) => {
    const { change_info } = useContext( bookingChangeContext )

    const handle_change = async ( value ) =>
    {
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/booking/change-room`,
            {
                booking: change_info?.id,
                room: value?.id
            }
        )
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        Toast.getToastSuccess( res.message )
    }
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
                        () => handle_change( value )
                    }
            >
                Đổi phòng
            </button>

        </div>
    );
});
CardBookingChange.displayName = 'CardBookingChange'
export default CardBookingChange;