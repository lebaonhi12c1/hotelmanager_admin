

import { createContext, useState } from "react";

export const bookingContext = createContext()

const BookingContext = ( { children } ) =>
{
    const [ booking_detail, set_booking_detail ] = useState( null )
    return (
        <bookingContext.Provider
        
            value={
                {
                    booking_detail,
                    set_booking_detail
                }
            }
        >
            {
                children
            }
        </bookingContext.Provider>
    )
}

export default BookingContext