import React, { memo, useContext, useEffect, useState } from 'react';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import { filterContext } from '../../context/home/filterReport';

const Control = memo(() => {
    const [ filter, set_fitler ] = useState( 'week' )
    const { set_donut, set_line } = useContext( filterContext )
    const get_report_donut = async() =>
    {
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/report/percent-roomtype`,
            {
                dimension: filter
            }
        )

        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        set_donut( res.data )
    }

    const get_report_line = async() =>
    {
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/report/quantity-of-date`,
            {
                dimension: filter
            }
        )

        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        set_line( res.data )
    }

    useEffect(
        () =>
        {
            get_report_donut()
            get_report_line()
        },[ filter ]
    )

    return (
        <div className='w-fit flex items-center gap-4'>  
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                Lọc theo:
            </label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                onChange={
                    e => set_fitler( e.target.value )
                }
            >
                <option value="week">Tuần qua</option>
                <option value="month">Tháng qua</option>
                <option value="quarter">Quý qua</option>
                <option value="year">Năm qua</option>
            </select>

        </div>
    );
});
Control.displayName = 'Control'
export default Control;