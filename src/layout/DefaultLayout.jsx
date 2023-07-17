import React, { memo } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
const DefaultLayout = memo(( { children }) => {
    return (
        <div
            className='grid grid-cols-5 fixed inset-0'
        >
            <div>
                <Sidebar/>
            </div>
            <div
                className=' col-span-4 overflow-y-auto'
            >
                <div
                    className=' sticky top-0 left-0 right-0 bg-white'
                >
                    <Navbar/>
                </div>
                {children}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
});

DefaultLayout.displayName = 'DefaultLayout'

export default DefaultLayout;