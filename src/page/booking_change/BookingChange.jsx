import React, { useContext, useEffect, useState } from 'react';
import { bookingChangeContext } from '../../context/booking_change/BookingChangeContext';
import Fetch from '../../helpers/fetch';
import ListBookingRoomChange from '../../components/booking_change/ListBookingRoomChange';
import Toast from '../../helpers/Toast';
import { uid } from 'uid';
function BookingChange(props) {
    const { change_info } = useContext( bookingChangeContext )
    const [ rooms, set_rooms ] = useState( null )
    const get_rooms = async () => {
        const res = await Fetch.make().get(
            `${import.meta.env.VITE_API_URL}/api/filter/room?${ new URLSearchParams( { startDate: change_info?.checkInDate, endDate: change_info?.checkOutDate} ).toString() }`
        );

        if (!res.success) {
            Toast.getToastError(res.message);
            return;
        }

        set_rooms(res.data);
    };

    useEffect(() => {
        get_rooms();
    }, []);
    return (
        <div
            className='flex flex-col gap-4 p-4'
        >
            {
                rooms?.map(
                    item =>
                    {
                        return (
                            <div className=" grid grid-cols-5 gap-4"
                                key={ uid( 10 ) }
                            >
                                <div>
                                    <img 
                                        src={ item?.ImageRoomTypes[0]?.value } 
                                        alt="roomtype" 
                                    />
                                </div>
                                <div
                                    className=' col-span-4'
                                >
                                    <ListBookingRoomChange
                                        value = {
                                            item?.rooms
                                        }
                                    />
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    );
}

export default BookingChange;