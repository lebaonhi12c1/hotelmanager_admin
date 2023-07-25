

import { createContext, useState } from "react";
import { formatDateToYYYYMMDD } from "../../helpers/globalfunction";
export const bookingContext = createContext()

const BookingContext = ( { children } ) =>
{
    const [ booking_detail, set_booking_detail ] = useState( null )
    const [ filter , set_filter ] = useState( 
        {
            startDate:  formatDateToYYYYMMDD(
                new Date()
            ),
            endDate:  formatDateToYYYYMMDD(
                new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            )
        }
    )
    return (
        <bookingContext.Provider
        
            value={
                {
                    booking_detail,
                    filter,
                    set_filter,
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