import React, { memo } from 'react';

const ModalCreatePayment = memo(( { is_open, value, handle_close }) => {
    return (
        is_open && 
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Tạo phiếu thanh toán
                        </h3>
                    </div>
            
                    
                    <div
                        className='flex flex-col gap-2 p-4'
                    >
                        <div
                            className='p-4 rounded-lg bg-slate-100'
                        >
                            thotin
                        </div>
                        
                        <label htmlFor="payment_method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Phương thức thanh toán
                        </label>
                        <select id="payment_method" size="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option
                                value={'Tiền mặt'}
                            >
                                Tiền mặt
                            </option>
                            <option
                                value={'Chuyển khoản'}
                            >
                                Chuyển khoản
                            </option>
                        </select>
      
                    </div>

            
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >

                            Tạo
                        </button>
                        <button data-modal-hide="defaultModal" type="button" className="text-red-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                            onClick={
                                () => handle_close( false )
                            }
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});


ModalCreatePayment.displayName = 'ModalCreatePayment'
export default ModalCreatePayment;