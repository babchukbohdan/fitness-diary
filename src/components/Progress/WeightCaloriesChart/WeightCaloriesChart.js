import React from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { getDayString } from '../../Month/utils'
import { fromCamelCaseToLowerSpaceCase } from '../../utils'


export const WeightCaloriesChart = ({data, dataKey, color}) => {
  let count = 0
  const CustomizedLabel = (props) => {
    const {
      x, y, stroke, value, textColor
    } = props;
    return <text x={x} y={y} dy={count++ % 2 === 0 ? -10 : +17 } fill={textColor} fontSize={12} textAnchor="middle">{value}</text>;
  }

  console.log(data, 'data calorise')
  const maxCalories = data.reduce((acc, cur) => {
    return acc < cur.calories ? cur.calories : acc
  }, 0)
  const maxWeight = data.reduce((acc, cur) => {
    return acc < cur.bodyWeight ? cur.bodyWeight : acc
  }, 0)

  data = data.map(({date, calories, bodyWeight}) => {
    return {
      date,
      calories: Math.round((calories / maxCalories) * 100),
      bodyWeight: Math.round((bodyWeight / maxWeight) * 100),
    }
  })

  console.log(data,
    'data')

  const caloriesPoints = data.map(item => ({
    x: item.date,
    y: Math.round((item.calories / maxCalories) * 100),
    value: Math.round((item.calories / maxCalories) * 100)
  }))
  console.log(caloriesPoints, 'caloriesPoints')


  console.log(data, 'data in chart')
  if (!data.length) {
    return null
  }
  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={data} >
        <Line
          // points={caloriesPoints}
          type="linear"
          connectNulls={true}
          dataKey={'calories'}
          name={'calories'}
          // unit="kg"
          strokeWidth={4}
          stroke={'#82ca9d'}
          activeDot={{ strokeWidth: 2, r: 5 }}
          label={<CustomizedLabel textColor={'#82ca9d'} />}
          animationDuration={3000}
        />
        <Line
          type="linear"
          connectNulls={true}
          dataKey='bodyWeight'
          name={fromCamelCaseToLowerSpaceCase('bodyWeight')}
          // unit="kg"
          strokeWidth={4}
          stroke="#8884d8"
          activeDot={{ strokeWidth: 2, r: 5 }}
          label={<CustomizedLabel textColor={"#8884d8"} />}
          animationDuration={3000}
        />




          {/* <CartesianGrid
            strokeDasharray="5 5"
          /> */}
          <XAxis
            tickLine={false}
            dataKey="date"
            allowDecimals={true}
            padding={{ left: 20, right: 20 }}
            scale='time'
            type='number'
            domain={['auto', 'auto']}
            tickFormatter={(tick) => {
              const date = getDayString(new Date(tick), true)
              return `${date.slice(8)}.${date.slice(5, 7)}`
            }}
            label={{value: 'Date', position: 'bottom', offset: 0}}
          />
          <YAxis
            padding={{ top: 30, bottom: 20 }}
            // dataKey={'reps'}
            orientation='left'
            type='number'
            domain={[
              dataMin => Math.ceil(0),
              dataMax => Math.ceil(100)
            ]}
            // ticks={[0, 69, 79, 1500, 5600]}


            // interval='preserveStart'
            // minTickGap={1000}
            // allowDataOverflow={true}
            // axisLine={true}
            // tickLine={false}
            // ticks={[0,10,60,80,90,100, 1500]}
            // mirror={false}
            // reversed={false}
            // label="Weight"
            scale='auto'
            // name='lol'
            // allowDuplicatedCategory={true}
            // allowDecimals={true}
            // tickSize={10}
          />
          <Tooltip
            separator=": "
            offset={10}
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
            // formatter={renderColorfulLegendText}
          />
      </LineChart>
    </ResponsiveContainer>
  )
}
