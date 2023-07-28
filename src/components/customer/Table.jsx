import React, { memo, useEffect, useState } from 'react';
import Toast from '../../helpers/Toast';
import { uid } from 'uid';
import Fetch from '../../helpers/fetch';

const Table = memo(( { value } ) => {
    
    const [ service, set_service ] = useState( null )
    const get_service = async() =>
    {
        const res = await Fetch.make().get(
            `${ import.meta.env.VITE_API_URL }/api/customer`
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }

        set_service(res.data )
    }

    useEffect(
        () =>
        {
            get_service()
        },
        []
    )

    const get_style_status = value =>
    {
        switch (value) {
            case 'published':
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                        {
                            value
                        }
                    </span>
                )
            case 'draft':
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">

                        {
                            value
                        }
                    </span>

                )
            case 'cancel':
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        {
                            value
                        }
                    </span>

                )
            default:
                break;
        }
    }

    // {"id":3,"code":"SINGLE2","name":"Single service2","description":"A cozy service for one person.","capacity":1,"area":20,"status":"published","employee":1,"priceBegin":"50"
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên khách hàng
                            </th>
                             <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                số điện thoại
                            </th>
                            <th scope="col" className="px-6 py-3">
                               tài khoản
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            service?.map(
                                item => 
                                {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                            key={ uid(10) }
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    item.id
                                                }
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    item.name
                                                }
                                            </td>
                                            <td 
                                                 className="px-6 py-4"
                                            >
                                                {
                                                    item?.email
                                                }
                                            </td>
                                            <td 
                                                 className="px-6 py-4 whitespace-nowrap"
                                            >
                                                {
                                                    item?.phone
                                                }
                                            </td>
                                            <td 
                                                 className="px-6 py-4 whitespace-nowrap"
                                            >
                                                {
                                                    item?.username
                                                }
                                            </td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                       }
                    </tbody>
                </table>
            </div>

        </div>
    );
});

Table.displayName = 'Table'
export default Table;