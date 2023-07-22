import React, { memo, useContext, useEffect, useState } from 'react';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import { filterContext } from '../../context/home/filterReport';

const Control = memo(() => {
    const [ filter, set_fitler ] = useState( 'week' )
    const { set_donut } = useContext( filterContext )
    useEffect(() => {
        const init = async () => {
          const { Select, initTE } = await import("tw-elements");
          initTE({  Select });
        };
        init();
    }, []);

    const get_report = async() =>
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

    useEffect(
        () =>
        {
            get_report()
        },[ filter ]
    )

    return (
        <div className='w-fit flex items-center gap-4'>
            <select data-te-select-init
            
                onChange={
                    e => set_fitler( e.target.value )
                }
            >
                <option value="week">Tuần qua</option>
                <option value="month">Tháng qua</option>
                <option value="quarter">Quý qua</option>
                <option value="year">Năm qua</option>
            </select>
            {/* <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Lọc
            </button> */}
        </div>
    );
});
Control.displayName = 'Control'
export default Control;