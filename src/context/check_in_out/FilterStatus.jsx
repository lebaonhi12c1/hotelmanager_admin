import { createContext, useState } from "react";


export const filter_status_context = createContext()

const FilterStatusContext = ( { children } ) =>
{
    const [ filter_status, set_filter_status ] = useState('all')
    return (
        <filter_status_context.Provider
            value={
                {
                    filter_status,
                    set_filter_status
                }
            }
        >
            {
                children
            }
        </filter_status_context.Provider>
    )
}


export default FilterStatusContext