import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = memo(() => {
    const router = useLocation()

    const get_active = value =>
    {
        return router.pathname.includes( value )
    }

    return (
        <div
            className='flex flex-col bg-black/90 text-white h-full'
        >
            <div
                className='p-4 border-b-2 bg-yellow-400 text-black'
            >
                Khách sạn QN
            </div>
            <div
                className='flex flex-col'
            >
                <Link
                    to={ '/' }
                >
                    <div
                        className= { `
                            py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                            ${ router.pathname === '/' && 'bg-blue-500'}
                        ` }
                    >
                        Số liệu thống kê
                    </div>
                </Link>
                <Link
                    to={ '/rooms' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'rooms' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Phòng
                    </div>
                </Link>
                <Link
                    to={ '/room-types' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'room-types' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Loại phòng
                    </div>
                </Link>
                <Link
                    to={ '/bookings' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'bookings' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Đặt phòng
                    </div>
                </Link>
                <Link
                    to={ '/payments' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'payments' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Thanh toán
                    </div>
                </Link>
                <Link
                    to={ '/service' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'service' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Dịch vụ
                    </div>
                </Link>
                <Link
                    to={ '/employees' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'employees' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Nhân viên
                    </div>
                </Link>
                <Link
                    to={ '/customers' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'customers' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Khách hàng
                    </div>
                </Link>
                <Link
                    to={ '/availble-room' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'availble-room' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        Trạng thái phòng
                    </div>
                </Link>
                <Link
                    to={ '/check' }
                >
                    <div
                        className={
                            `
                                py-2 px-4 hover:bg-blue-500/50 hover:text-white cursor-pointer
                                ${ get_active( 'check' ) && 'bg-blue-500' }
                            `
                        }
                    >
                        CheckIn/CheckOut
                    </div>
                </Link>
            </div>
        </div>
    );
});
Sidebar.displayName = 'Sidebar'
export default Sidebar;