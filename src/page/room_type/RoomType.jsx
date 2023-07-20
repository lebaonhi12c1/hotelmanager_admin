import React from 'react';
import Table from '../../components/room_type/Table';
import { Link } from 'react-router-dom';
function RoomType(props) {
    return (
        <div
            className='p-4'
        >
            <div
                className='flex justify-end'
            >
               <Link 
                    to={
                        '/room-types/create'
                    }
               >
                   <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                        Thêm
                   </button>

               </Link>

            </div>
            <Table/>
        </div>
    );
}

export default RoomType;