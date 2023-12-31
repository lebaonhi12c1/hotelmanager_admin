
import { createContext, useState } from "react";

export const  bookingChangeContext = createContext()


const BookingChangeContext = ( { children } ) =>
{
    const [ change_info, set_change_info ] = useState( null )
    const [ room_change, set_room_change ] = useState( null )
    return (
        <bookingChangeContext.Provider
            value={
                {
                    change_info,
                    room_change,
                    set_room_change,
                    set_change_info,
                }
            }
        >
            { children }
        </bookingChangeContext.Provider>
    )
}


export default BookingChangeContext