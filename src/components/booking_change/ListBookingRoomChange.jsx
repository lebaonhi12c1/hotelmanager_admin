import React, { memo } from 'react';
import CardBookingChange from './CardBookingChange';
import { uid } from 'uid';

const ListBookingRoomChange = memo(( { value } ) => {
    return (
        <div
            className='flex items-center gap-4 overflow-auto'
        >
            {
                value?.map(
                    item =>
                    {
                        return (
                            <div className=" flex-shrink-0 w-[300px]"
                                key={ uid( 10 ) }
                            >
                                <CardBookingChange
                                    value = { item }
                                />
                            </div>
                        )
                    }
                )
            }
        </div>
    );
});
ListBookingRoomChange.displayName = 'ListBookingRoomChange'
export default ListBookingRoomChange;