
import React, { memo, useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import { filterContext } from '../../context/home/filterReport';

  
const LineChartComponent = memo(() => {
    
    const { line } = useContext( filterContext )
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload;
          return (
            <div className="custom-tooltip border p-2 rounded-lg bg-black/70 text-white">
              <p className="label">{`Số lượng: ${data.pv}`}</p>
              <p className="desc">{`Ngày: ${label}`}</p>
            </div>
          );
        }
      
        return null;
      };
    return (
        <div className='h-full flex items-center gap-4 flex-col shadow-lg rounded-lg p-4'>
            <div >
                Số lượng đơn dặt phòng
            </div>
            <div className="overflow-hidden h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={
                    line?.map(
                        item =>
                        {
                            return {
                                name: item?.date,
                                pv: item?.data
                            }
                        }
                    )
                }
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                    content={
                        <CustomTooltip/>
                    }
                />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
});


LineChartComponent.displayName = 'LineChartComponent'
export default LineChartComponent;


