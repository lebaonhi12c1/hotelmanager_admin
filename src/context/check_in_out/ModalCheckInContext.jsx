

import { createContext, useState } from "react";

export const modal_check_in = createContext()

const ModalCheckInContext = ({ children }) =>
{
    const [ check_in_info, set_check_in_info ] = useState( null )
    return(
        <modal_check_in.Provider
            value={
               {
                    check_in_info,
                    set_check_in_info
               }
            }
        >
            {
                children
            }
        </modal_check_in.Provider>
    )
}


export default ModalCheckInContext