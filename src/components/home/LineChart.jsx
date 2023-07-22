import React, { memo, useEffect } from 'react';

const LineChart = memo(() => {

    useEffect(() => {
        const init = async () => {
          const { Chart, initTE } = await import("tw-elements");
          initTE({  Chart });
        };
        init();
    }, []);

    return (
        <div>
            <div className="overflow-hidden shadow-lg rounded-lg p-4">
                <canvas
                    id='line'
                    data-te-chart="line"
                    data-te-dataset-label="Traffic"
                    data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
                    data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
                </canvas>
            </div>
        </div>
    );
});

export default LineChart;