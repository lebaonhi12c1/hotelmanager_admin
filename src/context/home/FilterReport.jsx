

import { createContext, useState } from "react";

export const filterContext = createContext()

const FilterContext = ( { children } ) =>
{
    const [ line, set_line ] = useState( null )
    const [ donut, set_donut ] = useState( null )
    

    
    return (
        <filterContext.Provider
        
            value={
                {
                    line,
                    donut,
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