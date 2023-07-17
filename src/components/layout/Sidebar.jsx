import React, { memo } from 'react';

const Sidebar = memo(() => {
    return (
        <div
            className='flex flex-col bg-blue-900 text-white'
        >
            <div
                className='p-4 border-b-2'
            >
                logo
            </div>
            <div
                className='flex flex-col gap-4'
            >
                <div
                    className='p-4 hover:bg-blue-500 hover:text-white cursor-pointer'
                >
                    Home
                </div>
            </div>
        </div>
    );
});
Sidebar.displayName = 'Sidebar'
export default Sidebar;