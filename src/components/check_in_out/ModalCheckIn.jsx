import React, { memo, useContext, useState } from 'react';
import { modal_check_in } from '../../context/check_in_out/ModalCheckInContext';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';

const ModalCheckIn = memo(( { handle_get_data } ) => {

    const { check_in_info, set_check_in_info } = useContext( modal_check_in )
    const [ description, set_description ] = useState( '' )

    const handle_submit = async() =>
    {
        console.log(' render')
        const res = await Fetch.make().post(
            `${import.meta.env.VITE_API_URL}/api/booking/check-in`,
            {
                booking: check_in_info?.id,
                employee: JSON.parse( localStorage.get( 'user' )).id,
                description,
            }
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        Toast.getToastSuccess( res.message )
        await handle_get_data()
        set_check_in_info( null )
    }
    return (
        check_in_info && 
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Check In
                            </h3>
                        </div>
                
                        
                        <div
                            className='flex flex-col gap-2 p-4'
                        >
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Ghi chú
                            </label>
                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập ghi chú..."
                                onChange={
                                    e => set_description( e.target.value )
                                }  
                            >

                            </textarea>
                        </div>

                
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={
                                    handle_submit
                                }
                            >

                                Check In
                            </button>
                            <button data-modal-hide="defaultModal" type="button" className="text-red-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                                onClick={
                                    () => set_check_in_info( null )
                                }
                            >
                                Thoát
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});

ModalCheckIn.displayName = 'ModalCheckIn'

export default ModalCheckIn;