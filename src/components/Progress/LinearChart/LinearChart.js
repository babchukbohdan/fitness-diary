import React from 'react'
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// remove recharts or chart.js
import { getDayString } from '../../Month/utils';
import { fromCamelCaseToLowerSpaceCase, getRandomHslColor, random } from '../../utils';


export const LinearChart = ({data}) => {
  console.log(data, 'data in linechart')

  // var data = data.map(item => {
  //   return {
  //     ...item,
  //     cal: random(1500, 2000)
  //   }
  // })

  let count = 0
  const CustomizedLabel = (props) => {
    const {
      x, y, stroke, value,
    } = props;
    return <text x={x} y={y} dy={count++ % 2 === 0 ? -10 : +17 } fill={stroke} fontSize={12} textAnchor="middle">{value}</text>;
  }

  const renderColorfulLegendText = (value, entry) => {
    // console.log(entry, 'entry')
    const {color} = entry
    return <span style={{ color }}>{fromCamelCaseToLowerSpaceCase(value)}</span>;
  }

  const COLORS =["#82ca9d", "#8884d8", "#d88484"]

  return (
    <ResponsiveContainer width='100%' height={500}>
    <LineChart
      width={2000}
      height={500}
      data={data}
      margin={{ top: 5, right: 20, bottom: 35, left: 0 }}
    >
      <Line
        type="monotone"
        dataKey="cal"
        unit="kg"
        strokeWidth={4}
        stroke={getRandomHslColor(52, 68)}
        activeDot={{ strokeWidth: 2, r: 5 }}
        label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        // label={
        //   {
        //     position: 'bottom',
        //     offset: 10,
        //     fontSize: 12
        //   }
        // }
      />
      <Line
        type="monotone"
        dataKey="bodyWeight"
        unit="kg"
        strokeWidth={4}
        stroke={getRandomHslColor(52, 68)}
        activeDot={{ strokeWidth: 2, r: 5 }}
        label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        // label={
        //   {
        //     position: 'bottom',
        //     offset: 10,
        //     fontSize: 12
        //   }
        // }
      />

      <Line
        type="monotone"
        dataKey="exerciseWeight"
        unit="kg"
        strokeWidth={4}
        stroke={getRandomHslColor(52, 68)}
        activeDot={{ strokeWidth: 2, r: 5 }}
        label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        // label={
        //   {
        //     position: 'top',
        //     offset: 10,
        //     fontSize: 12
        //   }
        // }
      />
      <Line
        type="monotone"
        dataKey="reps"
        unit="reps"
        strokeWidth={4}
        stroke={getRandomHslColor(52, 68)}
        activeDot={{ strokeWidth: 2, r: 5 }}
        label={<CustomizedLabel />}
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={3000}
        // label={
        //   {
        //     position: 'top',
        //     offset: 10,
        //     fontSize: 12
        //   }
        // }
      />
      <CartesianGrid
        strokeDasharray="5 5"
      />
      <XAxis
        tickLine={false}
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
        padding={{ top: 30, bottom: 20 }}
        // dataKey={'reps'}
        orientation='left'
        type='number'
        domain={[
          0,
          dataMax => Math.ceil(dataMax)]}
        // interval={0}
        // minTickGap={1000}
        // allowDataOverflow={true}
        axisLine={true}
        tickLine={false}
        // ticks={[0,10,60,80,90,100, 1500]}
        mirror={false}
        reversed={false}
        // label="Weight"
        scale='auto'
        name='lol'
        allowDuplicatedCategory={true}
        allowDecimals={true}
        // tickSize={10}
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
      <Legend
        verticalAlign="top"
        height={36}
        iconSize={20}
        // content={renderLegend}
        formatter={renderColorfulLegendText}
      />
    </LineChart>
  </ResponsiveContainer>
  )
}
