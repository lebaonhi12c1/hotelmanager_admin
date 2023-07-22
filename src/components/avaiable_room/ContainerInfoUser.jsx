import React, { memo } from 'react';

const ContainerInfoUser = memo(( { value } ) => {
    return (
        <div
            className=' rounded-lg'
        >
            <blockquote className="p-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                <div className=" italic leading-relaxed text-gray-900 dark:text-white">
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Tên khách hàng:
                        </div>
                        <div>
                            {
                                value.name || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Email:
                        </div>
                        <div>
                            {
                                value.email || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Số điện thoại:
                        </div>
                        <div>
                            {
                                value.phone || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Giới tính:
                        </div>
                        <div>
                            {
                                value.gender || 'Chưa có'
                            }
                        </div>
                    </div>
                    <div
                        className='flex items-center gap-2'
                    >
                        <div
                            className=' font-medium'
                        >
                            Địa chỉ:
                        </div>
                        <div>
                            {
                                value.address || 'Chưa có'
                            }
                        </div>
                    </div>
                </div>
            </blockquote>

        </div>
    );
});

ContainerInfoUser.displayName = 'ContainerInfoUser'

export default ContainerInfoUser;