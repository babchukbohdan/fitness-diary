import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import {
  PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer
} from 'recharts'
import { Message } from '../../UI/Message/Message'
import { Spinner } from '../../UI/Spinner/Spinner'
import { getRandomHslColor, random } from '../../utils'


export const PieChartCalories = ({data, width = 300, height = 300, loading}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const COLORS = ['#84ff42', '#00C49F', '#0088FE', '#FFBB28', '#FF8042', ];
  const fill = COLORS[random(0, COLORS.length - 1)]
  const fillRef = useRef(fill)

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} cal`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };


  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  };

  if (!data) {return null}

  return (
    <>
      <ResponsiveContainer width={width} height={height}>
        <PieChart width={200} height={200}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={'50%'}
            cy={'50%'}
            innerRadius={60}
            outerRadius={80}
            fill={fillRef.current}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {
          	  data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {
        !data.length && !loading && (
          <Message>
            Have't training this exercise
          </Message>
        )
      }
      {
        loading && (
          <Message>
            <span>Loading</span> <Spinner />
          </Message>
        )
      }
    </>
  );
}
