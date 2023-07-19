import React from 'react';
import HeaderControl from '../../components/check_in_out/HeaderControl';
import ListBooking from '../../components/check_in_out/ListBooking';
function CheckInOut(props) {
    return (
        <div
            className='p-4 flex flex-col gap-4'
        >
            <HeaderControl/>
            <ListBooking/>
        </div>
    );
}

export default CheckInOut;