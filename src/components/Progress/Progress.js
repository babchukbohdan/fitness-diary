import React from 'react'

import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Progress.scss'
import { getDayString } from '../Month/utils';

let count = 0
const CustomizedLabel = (props) => {

  const {
    x, y, stroke, value,
  } = props;
  // const count = Math.floor(Math.random() * 100)
  // console.log(count)

  return <text x={x} y={y} dy={count++ % 2 === 0 ? -10 : +17 } fill={stroke} fontSize={12} textAnchor="middle">{value}</text>;
}



const data = [
  {
    "id": "weight",
    "color": "hsl(115, 70%, 50%)",
    "data": [
      {
        "x": new Date('2020-06-01').getTime(),
        "y": 70.850
      },
      {
        "x": new Date('2020-06-04').getTime(),
        "y": 70.950
      },
      {
        "x": new Date('2020-06-05').getTime(),
        "y": 70.950
      },
      {
        "x": new Date('2020-06-07').getTime(),
        "y": 71
      },
      {
        "x": new Date('2020-06-11').getTime(),
        "y": 71.500
      },
      {
        "x": new Date('2020-06-17').getTime(),
        "y": 71.850
      },
      {
        "x": new Date('2020-06-22').getTime(),
        "y": 72.400
      },
      {
        "x": new Date('2020-06-27').getTime(),
        "y": 72.800
      },
      {
        "x": new Date('2020-06-29').getTime(),
        "y": 72.400
      },
      {
        "x": new Date('2020-06-30').getTime(),
        "y": 70.850
      }
    ]
  }
]

const renderLineChart = (
  <ResponsiveContainer>
    <LineChart
      width={900}
      height={500}
      data={data[0].data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type="monotone"
        dataKey="y"
        stroke="#8884d8"
        activeDot={{ strokeWidth: 2, r: 5 }}
        label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
      />
      <CartesianGrid
        stroke="#ccc"
        strokeDasharray="5 5"
      />
      <XAxis
        dataKey="x"
        allowDecimals={true}
        scale='time'
        type='number'
        domain={['auto', 'auto']}
        tickFormatter={(tick) => {
          return new Date(tick).getDate()
        }}
      />
      <YAxis
        hide={false}
        width={100}
        height={100}
        orientation='left'
        type='number'
        domain={[dataMin => Math.floor(dataMin), dataMax => Math.ceil(dataMax)]}
        interval={0}
        // padding={{ top: 20, bottom: 20 }}
        // minTickGap={1000}
        // allowDataOverflow={true}
        axisLine={true}
        tickLine={true}
        // ticks={[69,70,71,72,73,74]}
        mirror={false}
        reversed={false}
        // label="Height"
        // scale='pow'
        unit='kg'
        name='lol'
        allowDuplicatedCategory={true}
        allowDecimals={true}
        tickSize={10}
      />
      <Tooltip />
      <Legend verticalAlign="top" height={36}/>
    </LineChart>
  </ResponsiveContainer>
);

export const Progress = () => {
  return (
    <div className="progress">
      <h1>Progress</h1>
      <div className="chart">
        {renderLineChart}
      </div>
    </div>
  )
}
