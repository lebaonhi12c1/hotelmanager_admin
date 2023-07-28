import React, { memo, useContext, useEffect } from 'react';
import { filterContext } from '../../context/home/filterReport';
import LoadingItem from '../LoadingItem';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
const DonutChart = memo(() => {

    const { donut } = useContext( filterContext )
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
    return (
       <div className='flex items-center flex-col p-4 shadow-lg rounded-lg h-full'>
            <div>
                Tỷ lệ loại phòng được dặt
            </div>
            <div
                className=' h-full w-full'
            >
    
                {
                    donut && 
                    (
                        <div className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={
                                            donut?.map((item) => {
                                                return {
                                                  name: item.roomTypeName, // Hiển thị roomTypeName làm tên
                                                  value: Number(item.percentage?.toFixed(2)),
                                                };
                                            })
                                        }
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        
    
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => value.toFixed(2) + "%"} />
                                </PieChart>
                            </ResponsiveContainer>
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
       </div>
    );
});
DonutChart.displayName = 'DonutChart'
export default DonutChart;