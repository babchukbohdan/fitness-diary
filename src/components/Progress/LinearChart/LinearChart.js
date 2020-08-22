import React from 'react'
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// remove recharts or chart.js
import { getDayString } from '../../Month/utils';


export const LinearChart = ({data}) => {

  // let count = 0

  // const CustomizedLabel = (props) => {
  //   const {
  //     x, y, stroke, value,
  //   } = props;
  //   return <text x={x} y={y} dy={count++ % 2 === 0 ? -10 : +17 } fill={stroke} fontSize={12} textAnchor="middle">{value}</text>;
  // }



  return (
    <ResponsiveContainer>
    <LineChart
      width={2000}
      height={500}
      data={data}
      margin={{ top: 5, right: 20, bottom: 35, left: 0 }}
    >
      <Line
        type="monotone"
        dataKey="bodyWeight"
        unit="kg"
        strokeWidth={4}
        stroke="#82ca9d"
        activeDot={{ strokeWidth: 2, r: 5 }}
        // label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        label={
          {
            position: 'bottom',
            offset: 10,
            fontSize: 12
          }
        }
      />

      <Line
        type="monotone"
        dataKey="exerciseWeight"
        unit="kg"
        strokeWidth={4}
        stroke="#8884d8"
        activeDot={{ strokeWidth: 2, r: 5 }}
        // label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        label={
          {
            position: 'top',
            offset: 10,
            fontSize: 12
          }
        }
      />
      <Line
        type="monotone"
        dataKey="reps"
        unit="reps"
        strokeWidth={4}
        stroke="#d88484"
        activeDot={{ strokeWidth: 2, r: 5 }}
        // label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        label={
          {
            position: 'top',
            offset: 10,
            fontSize: 12
          }
        }
      />
      <CartesianGrid
        strokeDasharray="5 5"
      />
      <XAxis
        dataKey="date"
        allowDecimals={true}
        padding={{ left: 20, right: 20 }}
        scale='time'
        type='number'
        domain={['auto', 'auto']}
        tickFormatter={(tick) => {
          return getDayString(new Date(tick), true).slice(8)
        }}
        label={{value: 'Date', position: 'bottom', offset: 0}}
      />
      <YAxis
        hide={false}
        width={100}
        height={100}
        padding={{ top: 30, bottom: 20 }}

        orientation='left'
        type='number'
        domain={[dataMin => Math.floor(dataMin), dataMax => Math.ceil(dataMax)]}
        interval={0}
        // minTickGap={1000}
        // allowDataOverflow={true}
        axisLine={true}
        tickLine={true}
        // ticks={[69,70,71,72,73,74]}
        mirror={false}
        reversed={false}
        // label="Height"
        scale='linear'
        name='lol'
        allowDuplicatedCategory={true}
        allowDecimals={true}
        tickSize={10}
      />
      <Tooltip
        separator=": "
        offset={10}
        filterNull={true}
        active={true}
        labelFormatter={(value) => {
          return `Date: ${getDayString(new Date(value), true)}`
        }}
      />
      <Legend verticalAlign="top" height={36}/>
    </LineChart>
  </ResponsiveContainer>
  )
}
