import React, { memo, useContext, useEffect, useState } from 'react';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
import { check_out_context } from '../../context/check_in_out/ModalCheckOutContext';
import LoadingItem from '../LoadingItem';
import { get_format_price } from '../../helpers/globalfunction';
import { uid } from 'uid';
import ModalCreatePayment from './ModalCreatePayment';

const ModalCheckOut = memo(( { handle_get_data } ) => {

    const [ modal_payment, set_modal_payment ] = useState( false )
    const { check_out_info, set_check_out_info } = useContext( check_out_context )
    const [ description, set_description ] = useState( '' )
    const [ services, set_services ] = useState( null )
    const [selectedServices, setSelectedServices] = useState([]);
    const [ is_payment, set_is_payment ] = useState( null )
    const [ loading, set_loading ] = useState( false )
    const [ time, set_time ] = useState( 0 )
    
    const handle_submit = async() =>
    {
        set_loading( true )
        const res = await Fetch.make().post(
            `${import.meta.env.VITE_API_URL}/api/booking/check-out`,
            {
                booking: check_out_info?.id,
                employee: JSON.parse( localStorage.getItem( 'user') )?.id,
                description,
            }
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            set_loading( false )
            return
        }
        Toast.getToastSuccess( res.message )
        await handle_get_data()
        set_loading( false )

    }

    const get_services = async () =>
    {
        const res = await Fetch.make().get(
            `${ import.meta.env.VITE_API_URL}/api/service`
        )
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        set_services( res.data)
    }
    useEffect(
        () =>
        {
            get_services()
        },
        []
    )

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
    
        // Kiểm tra nếu giá trị checkbox đã được chọn trước đó thì loại bỏ nó khỏi danh sách
        // Nếu chưa được chọn trước đó thì thêm vào danh sách
        setSelectedServices((prevSelectedServices) =>
          prevSelectedServices.includes(value)
            ? prevSelectedServices.filter((item) => item !== value)
            : [...prevSelectedServices, value]
        );
      };

    const get_payment = () =>
    {
        return (
            check_out_info?.total - check_out_info?.Payments?.reduce(
                ( total, item ) => total + Number(item?.paymentAmount),
                0
            ) +  selectedServices?.reduce(
                (total, item) => total + Number( JSON.parse( item ).amount ), 0 
            ) + get_time_free()
        )
    }

    const get_time_free = () =>
    {
        if( time != 0)
        {
            if( time < 11 )
            {
                return Math.ceil( check_out_info?.Room?.price / 2 )
            }
            if( time < 22 )
            {
                return  Number( check_out_info?.Room?.price )
            }
            return Math.ceil( check_out_info?.Room?.price * time/22 )
        }

        return 0
    }

    useEffect(
        () =>
        {
            get_payment()
        },[ check_out_info, selectedServices ]
    )

    return (
        check_out_info && 
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Check Out
                            </h3>
                        </div>
                        <div
                            className='flex flex-col gap-2 p-4 max-h-[500px] overflow-y-auto'
                        >
                            <div
                                className='flex flex-col gap-2'
                            >
                                Thông tin
                                <div
                                    className=' p-4 rounded-lg bg-slate-100 '
                                >
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <span>
                                            Tên khách hàng:
                                        </span>
                                        <span
                                            className=' font-medium italic text-slate-500'
                                        >
                                            {
                                                check_out_info?.Customer?.name
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <span>
                                            Email:
                                        </span>
                                        <span
                                            className=' font-medium italic text-slate-500'
                                        >
                                            {
                                                check_out_info?.Customer?.email
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <span>
                                            Phòng:
                                        </span>
                                        <span
                                            className=' font-medium italic text-slate-500'
                                        >
                                            {
                                                check_out_info?.Room?.code
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <span>
                                            Thành tiền:
                                        </span>
                                        <span
                                            className=' font-medium text-red-500'
                                        >
                                            {
                                            get_format_price( 
                                                    check_out_info?.total
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <span>
                                            Đã thanh toán:
                                        </span>
                                        <span
                                            className=' font-medium text-red-500'
                                        >
                                            {
                                            get_format_price( check_out_info?.Payments?.reduce(
                                                        ( total, item ) => total + Number(item?.paymentAmount),
                                                        0
                                                    ),
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-2'
                                    >
                                        <div>
                                            Dịch vụ:
                                        </div>
                                        {
                                            check_out_info?.ServiceOfBookings?.map(
                                                item => {
                                                    return (
                                                        <div className=" text-blue-500" 
                                                            key={ uid( 10 ) }
                                                        >
                                                            {
                                                                item?.Service?.name
                                                            }
                                                        </div>
                                                    )
                                                }
                                            )
                                            
                                        }
                                        {
                                            check_out_info?.ServiceOfBookings.length <= 0 && 
                                            (
                                                <div className=' text-blue-500'>
                                                    Chưa có
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                              <div>
                                {
                                    !services &&
                                    (
                                        <div className="flex justify-center">
                                            <LoadingItem/>
                                        </div>
                                    )
                                }
                                {
                                    services &&
                                    (
                                        <div className="">
                                            <div>
                                                Dịch vụ phát sinh
                                            </div>
                                            {
                                                services?.map(
                                                    item =>
                                                    {
                                                        return (
                                                            <div className="flex items-center gap-4" key={uid(10)}>
                                                            <div className="flex items-center">
                                                                <input id={ item?.code} type="checkbox" name='services' value={ JSON.stringify( item ) } className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                    onChange={handleCheckboxChange}
                                                                    // Kiểm tra xem checkbox có nằm trong danh sách đã chọn không
                                                                    checked={selectedServices.includes(JSON.stringify(item))}
                                                                />
                                                                <label htmlFor={ item?.code} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                    {
                                                                        item?.name
                                                                    }
                                                                </label>
                                                            </div>
                                                            <div
                                                                className='text-red-500'
                                                            >
                                                                {
                                                                    get_format_price( item?.amount )
                                                                }
                                                            </div>
                                                        </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ ở lại</label>
                                <input type="number" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    min={0}
                                    onChange={
                                        e => set_time( e.target.value )
                                    }
                                />
                            </div>
                            <div
                                className='border-t-2 flex flex-col gap-2 py-2'
                            >
                                <div
                                    className='flex items-center gap-2'
                                >
                                    Chi phí phát sinh:
                                    <div
                                        className=' text-red-500'
                                    >
                                        {
                                            get_format_price(
                                                selectedServices?.reduce(
                                                    (total, item) => total + Number( JSON.parse( item ).amount ), 0 
                                                ) + get_time_free()
                                            )
                                        }
                                    </div>
                                </div>
                                <div
                                    className='flex items-center gap-2'
                                >
                                    Khách hàng cần thanh toán:
                                    <div
                                        className=' text-red-500'
                                    >
                                        {
                                            get_format_price(
                                                get_payment()
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
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
                            {
                                
                                ( get_payment() !== 0  || !is_payment) &&
                                (
                                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                        onClick={
                                            () => set_modal_payment( true )
                                        }
                                    >
                                        Tạo phiếu thanh toán
                                    </button>
                                )
                            }
                            {
                                ( get_payment() === 0  || is_payment ) &&
                                (
                                    <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        onClick={
                                            handle_submit
                                        }
                                    >
                                        {
                                            loading && (
                                                <LoadingItem/>
                                            )
                                        }
                                        {
                                            !loading && (
                                                'Check Out'
                                            )
                                        }
                                       
                                    </button>
                                )
                            }
                            
                        </div>



                
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {/* <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={
                                    handle_submit
                                }
                            >

                                Check Out
                            </button> */}
                            <button data-modal-hide="defaultModal" type="button" className="text-red-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                                onClick={
                                    () => set_check_out_info( null )
                                }
                            >
                                Thoát
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCreatePayment
                is_open = { modal_payment }
                handle_close = { set_modal_payment }
                handle_is_payment = { set_is_payment }
                value =
                {
                    {
                        ...check_out_info,
                        payment_total: get_payment()
                    }
                }
            />
        </div>
    );
});

ModalCheckOut.displayName = 'ModalCheckOut'

export default ModalCheckOut;