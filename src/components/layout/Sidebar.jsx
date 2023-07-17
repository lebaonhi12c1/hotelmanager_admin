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
            className='flex flex-col bg-blue-900 text-white h-full'
        >
            <div
                className='p-4 border-b-2'
            >
                logo
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
                        Home
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
                        Room
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
                        Room Type
                    </div>
                </Link>
            </div>
        </div>
    );
});
Sidebar.displayName = 'Sidebar'
export default Sidebar;