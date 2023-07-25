

import { createContext, useState } from "react";

export const filterContext = createContext()

const FilterContext = ( { children } ) =>
{
    const [ line, set_line ] = useState( null )
    const [ donut, set_donut ] = useState( null )
    const [ total_payment, set_total_payment ] = useState( 0 )
    const [ count_payment, set_count_payment ] = useState( 0 )
    
    return (
        <filterContext.Provider
        
            value={
                {
                    line,
                    donut,
                    total_payment,
                    count_payment,
                    set_count_payment,
                    set_total_payment,
                    set_line,
                    set_donut,
                }
            }
        >
            {
                children
            }
        </filterContext.Provider>
    )
}

export default FilterContext