import React, { memo } from 'react';
import CountUp from 'react-countup';
import { AiOutlineNumber } from 'react-icons/ai'
const CardWidget = memo(( { value }) => {
    return (
        <div>
            <div
                className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 flex flex-col gap-4">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 flex items-center justify-between ">
                    {
                        value?.heading
                    }
                    <AiOutlineNumber/>
                </h5>
                <div className=" text-base text-neutral-600 dark:text-neutral-200 flex items-center gap-2">
                    <div className='text-green-500 text-[30px]'>
                        <CountUp
                            start={ 0 }
                            end={ 
                                value?.published
                             }
                        />
                    </div> / { value?.total}
                </div>
                <span className='italic text-slate-400 text-[14px]'>Đang hoạt động</span>
            </div>
        </div>
    );
});
CardWidget.displayName = 'CardWidget'
export default CardWidget;



