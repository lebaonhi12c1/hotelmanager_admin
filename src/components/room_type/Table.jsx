import React, { memo, useEffect, useState } from 'react';
import RoomTypeService from '../../services/roomType.service';
import Toast from '../../helpers/Toast';
import { uid } from 'uid';

const Table = memo(( { value } ) => {
    
    const [ room_types, set_room_type ] = useState( null )
    const get_room_type = async() =>
    {
        const res = await RoomTypeService.getAllRoomType()
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_room_type( res.data )
    }

    useEffect(
        () =>
        {
            get_room_type()
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
                            "Công khai"
                        }
                    </span>
                )
            case 'draft':
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">

                        {
                            "Nháp"
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

    // {"id":3,"code":"SINGLE2","name":"Single Room2","description":"A cozy room for one person.","capacity":1,"area":20,"status":"published","employee":1,"priceBegin":"50"
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
                                Mã
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mô tả
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số lượng khách
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ảnh bìa
                            </th>
                             <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                             <th scope="col" className="px-6 py-3">
                                Nhân viên
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            room_types?.map(
                                item => 
                                {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                            key={ uid(10) }
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    item?.id
                                                }
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    item?.code
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    item?.name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    item?.description
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    item?.capacity
                                                }
                                            </td>
                                            <td
                                                className="px-6 py-4"
                                            >
                                                <div 
                                                    className='w-[100px] h-[60px] overflow-hidden'
                                                >
                                                    <img className=" rounded-lg object-contain" alt="image description"
                                                        src={ item?.ImageRoomTypes[0]?.value}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                className={ 
                                                    `
                                                        px-6 py-4
                                                    `
                                                }
                                            >
                                               <div 
                                                    className='px-6 py-4 whitespace-nowrap'
                                               >
                                                    {
                                                        get_style_status( item?.status )
                                                    }
                                               </div>
                                            </td>
                                            <td 
                                                 className="px-6 py-4 whitespace-nowrap"
                                            >
                                                {
                                                    item?.Employee?.name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                               <div
                                                    className=' flex items-center gap-2'
                                               >
                                                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sửa</button>
                                                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa</button>
                                               </div>
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