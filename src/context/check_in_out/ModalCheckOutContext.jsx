

import { createContext, useState } from "react";

export const check_out_context = createContext()

const ModalCheckOutContext = ( { children } ) =>
{
    const [ check_out_info, set_check_out_info ] = useState( null )

    return (
        <check_out_context.Provider
            value={
                {
                    set_check_out_info,
                    check_out_info,
                }
            }
        >
            {
                children
            }
        </check_out_context.Provider>
    )
}

export default ModalCheckOutContext