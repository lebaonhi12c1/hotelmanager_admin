import React from 'react';
import ListWidget from '../../components/home/ListWidget';
import LineChart from '../../components/home/LineChart';
import DonutChart from '../../components/home/DonutChart';
import Control from '../../components/home/Control';
import Sumary from '../../components/home/Sumary';
function Home(props) {
    return (
        <div
            className='p-4 flex flex-col gap-4'
        >
            <ListWidget/>
            <Control/>
            <Sumary/>
            <div
                className='grid grid-cols-3 gap-4'
            >
                <div
                    className=' col-span-2'
                >
                    <LineChart/>
                </div>
                <div>
                    <DonutChart/>
                </div>
            </div>
        </div>
    );
}

export default Home;