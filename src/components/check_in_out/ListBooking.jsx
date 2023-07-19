import React, { memo, useContext, useEffect, useState } from 'react';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import CardBookingCheckInOut from './CardBookingCheckInOut';
import { uid } from 'uid';
import ModalCheckIn from './ModalCheckIn';
import ModalCheckOut from './ModalCheckOut';
import { filter_status_context } from '../../context/check_in_out/FilterStatus';

const ListBooking = memo(() => {
    const { filter_status } = useContext( filter_status_context )
    const [ booking, set_booking ] = useState( null )
    const get_booking = async() =>
    {
        const res = await Fetch.make().get(
            `${ import.meta.env.VITE_API_URL }/api/booking/today`
        )
        if( !res.success )
        {
            Toast.getToastError( 'Có quá có lỗi trong quá trình lấy danh sách đơn' )
            return
        }

        set_booking(
            res.data
        )
    }

    useEffect(
        () =>
        {
            get_booking()
        },
        []
    )

    // neu mà có dịch vụ phát sinh thì xử lý gọi api service lên render lên modal, chọn dịch vụ mà khách hàng sử dụng, bấm xác nhận check in gửi thông tin đi bao gồm các dịch vụ và giá cả, thông sẽ được kèm vào bảng booking, còn muốn lưu check in kèm dịch vụ nào thì kèo them luôn bảng check in 
    return (
        <div>
            <div
                className='grid grid-cols-3 gap-4'
            >
                {
                    booking?.map(
                        item =>
                        {
                            return (
                               ( item.status === filter_status || filter_status === 'all') &&
                                <CardBookingCheckInOut
                                    value = { item }
                                    key={ uid( 10 ) }
                                />
                            )
                        }
                    )
                    
                }
            </div>
            <ModalCheckIn
                handle_get_data = {
                    get_booking
                }
            />
            <ModalCheckOut
                   handle_get_data = {
                    get_booking
                }         
            />
        </div>
    );
});
ListBooking.displayName = 'ListBooking'
export default ListBooking;