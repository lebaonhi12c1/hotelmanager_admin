import React, { memo, useContext, useEffect } from 'react';
import { filterContext } from '../../context/home/filterReport';
import LoadingItem from '../LoadingItem';

const DonutChart = memo(() => {

    const { donut } = useContext( filterContext )

    useEffect(() => {
        const init = async () => {
          const { Chart, initTE } = await import("tw-elements");
          initTE({  Chart });
        };
        init();
    }, []);
    console.log(`${
        donut?.map(
            item => item?.percentage
        )
    }`)
    return (
        <div
            className=' p-4 shadow-lg rounded-lg h-full'
        >
            {
                donut && 
                (
                    <div className="overflow-hidden">
                        <canvas
                            id='donut'
                            data-te-chart="pie"
                            data-te-dataset-label="Traffic"
                            data-te-labels=
                            {
                                `[${
                                    donut?.map(
                                        item => `'${item?.roomTypeName}'`
                                    )
                                }]`
                            }
                            data-te-dataset-data={`[${
                                donut?.map(
                                    item => item?.percentage
                                )
                            }]`}
                            data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)']">
                        </canvas>
                    </div>
                )
            }
            {
                !donut &&
                (
                    <div className="flex items-center justify-center h-full">
                        <LoadingItem/>
                    </div>
                )
            }
        </div>
    );
});
DonutChart.displayName = 'DonutChart'
export default DonutChart;