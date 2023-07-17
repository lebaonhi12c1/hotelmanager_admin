import React, { memo, useState } from 'react';

const Navbar = memo(() => {

    const [ option, set_option ] = useState( false )

    return (
        <div
            className='p-4 flex justify-between border-b-2'
        >
            <div>
                <div className="flex items-center gap-5 w-[300px] border border-gray-200 rounded-lg py-3 px-5">
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
                    placeholder="Enter your content..."
                  />
                </div>
            </div>
            <div
                className='flex items-center gap-4'
            >
                <div
                  aria-label="noti"
                  className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow"
                >
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 rounded-full">
                    5
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div
                  aria-label="dropdown"
                  className="relative w-fit text-sm font-medium"
                  onClick={
                    () => set_option( !option )
                  }
                >
                  <div className="flex items-center justify-between w-full p-3 rounded cursor-pointer">
                  <div
                    className=' flex items-center gap-2'
                    >
                        <div
                            className="w-10 h-10 -ml-3 border-2 border-white rounded-full first:ml-0"
                        >
                            <img
                                src="https://source.unsplash.com/random"
                                className="object-cover w-full h-full rounded-full"
                                alt=""
                            />
                        </div>
                        <div>
                            username
                        </div>
                    </div>
                  </div>

                  {
                        option && 
                        (
                            <div className="absolute left-0 w-full p-2 mt-2 bg-white rounded-lg shadow top-full">
                                <div
                                className="p-3 rounded cursor-pointer hover:text-red-500 hover:bg-red-50"
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        )
                  }
                </div>
            </div>
        </div>
    );
});

export default Navbar;