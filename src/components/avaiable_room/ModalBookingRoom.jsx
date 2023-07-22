import React, { memo, useContext, useState } from 'react';
import { bookingContext } from '../../context/booking/BookingContext';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import _isEmpty from 'lodash/isEmpty'
import ContainerInfoUser from './ContainerInfoUser';
import FormRegisterAccountUser from './FormRegisterAccountUser';
import BookingRoom from './BookingRoom';

const ModalBookingRoom = memo(() => {
    const { booking_detail, set_booking_detail } = useContext( bookingContext)
    const [ customer, set_customer ] = useState( null )
    const [ filter_phone, set_filter_phone ] = useState('')
    const handle_filter_customer = async() =>
    {
        
        if( _isEmpty( filter_phone ) )
        {
            Toast.getToastError( 'Bạn không được để trống' )
            return
        }

        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL}/api/customer/find`,
            {
                phone: filter_phone
            }
        )

        if( !res.success )
        {
            Toast.getToastError( 'Khách hàng không có trong hệ thống !' )
            return
        }
        
        Toast.getToastSuccess( 'Tìm thành công' )
        set_customer( res.data[0] )
        return
    }

    
    return (
        <div>
            
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Đặt phòng
                            </h3>
                        </div>
                        
                        <div className="p-6 space-y-6 max-h-[500px] overflow-auto">
                            <div 
                                className='flex items-center gap-2'
                            >
                                <div className="flex items-center gap-5 w-[300px] border border-gray-200 focus-within:border-blue-500 rounded-lg py-2 px-5">
                                  <span className="flex-shrink-0 text-gray-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-6 h-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                      />
                                    </svg>
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full outline-none bg-transparent"
                                    placeholder="Nhập số điện thoại..."
                                    onChange={
                                        e =>set_filter_phone( e.target.value )
                                    }
                                  />
                                </div>
                                <button data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={
                                        handle_filter_customer
                                    }
                                >
                                    Tìm
                                </button>
                            </div>
                           {
                                customer && 
                                (
                                    <ContainerInfoUser
                                        value= { customer }
                                    />
                                )
                           }
                           {
                                !customer && 
                                (
                                    <FormRegisterAccountUser
                                       handle_submit={
                                            set_customer
                                       }
                                    />
                                )
                           }
                           {
                                customer && 
                                (
                                    <BookingRoom
                                        value= { customer }
                                    />
                                )
                           }
                        </div>
                        
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={
                                    () => set_booking_detail( false )
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


ModalBookingRoom.displayName = 'ModalBookingRoom'
export default ModalBookingRoom;