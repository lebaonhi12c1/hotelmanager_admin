import React, { useCallback, useContext, useEffect, useState } from 'react';
import ListFilter from '../../components/avaiable_room/ListFilter';
import { formatDateToYYYYMMDD } from '../../helpers/globalfunction';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import ModalBookingRoom from '../../components/avaiable_room/ModalBookingRoom';
import { bookingContext } from '../../context/booking/BookingContext';

function Availble(props) {
    const [ filter, set_filter ] = useState( formatDateToYYYYMMDD( new Date() ) )

    const [ room, set_room ] = useState( [] )
    const { booking_detail } = useContext( bookingContext )
    const get_rooms = async() =>
    {
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/filter/room/status`,
            {
                date: filter
            }
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_room( res.data )
    }
    

    useEffect(
        () =>
        {
            get_rooms()
        },
        []
    )
    
    const handle_filter = async() =>
    {
        await get_rooms()
    }
    return (
        <div
            className='p-4 flex flex-col gap-4'
        >
            <div
                className='flex items-center gap-2'
            >
                <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input  type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"
                        value={ filter }
                        onChange={
                            (e) => set_filter( e.target.value )
                        }
                    />
                </div>
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={
                        handle_filter
                    }
                >
                    Tìm kiếm
                </button>

            </div>
            <ListFilter
                value = { room }
            />
            {
                booking_detail && 
                (
                    <ModalBookingRoom/>
                )
            }
        </div>
    );
}

export default Availble;