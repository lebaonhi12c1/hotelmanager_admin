import React, { memo, useContext } from 'react';
import CountUp from 'react-countup';
import { BsCoin } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { filterContext } from '../../context/home/FilterReport';
const Sumary = memo(() => {
    const { total_payment, count_payment } = useContext( filterContext )
    return (
        <div
            className='grid grid-cols-2 gap-4'
        >
             <div
                className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 flex flex-col gap-4">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 flex items-center justify-between uppercase">
                    Tổng tiền thu được
                </h5>
                <div className=" justify-between text-base text-neutral-600 dark:text-neutral-200 flex items-center gap-2">
                    <div className='text-green-500 text-[30px]'>
                        <CountUp
                            start={ 0 }
                            end={ 
                                total_payment
                             }
                        />
                    </div>
                    <div
                        className=''
                    >
                        <BsCoin className=' text-[40px] text-yellow-500 animate-bounce'/>
                    </div>
                </div>
            </div>
            <div
                className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 flex flex-col gap-4">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 flex items-center justify-between uppercase">
                    Tổng số lượng đơn
                </h5>
                <div className=" justify-between text-base text-neutral-600 dark:text-neutral-200 flex items-center gap-2">
                    <div className='text-green-500 text-[30px]'>
                        <CountUp
                            start={ 0 }
                            end={ 
                                count_payment
                             }
                        />
                    </div>
                    <div
                        className=''
                    >
                        <LiaFileInvoiceDollarSolid className=' text-[40px] text-yellow-500'/>
                    </div>
                </div>
            </div>
        </div>
    );
});
Sumary.displayName = 'Sumary'
export default Sumary;