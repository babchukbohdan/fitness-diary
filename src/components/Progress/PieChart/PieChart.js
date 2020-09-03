import React from 'react'
import {
  PieChart, Pie, Sector, Cell, Tooltip
} from 'recharts'


export const PieChartCalories = ({data}) => {
  console.log(data)

  const toPie = data.filter(day => {
    return day.diet !== undefined
  })


  console.log(toPie, 'toPie')

  const totalMeal = toPie.reduce((acc, val) => {
    return acc + val.diet.meal.reduce((ac, va) => ac + va.calorie , 0)
  }, 0)


  const totalNutrition = toPie.reduce((acc, val) => {
    if (!val.diet.nutrition) {
      return acc + 0
    }
    return acc + val.diet.nutrition.reduce((ac, va) => ac + va.calorie , 0)
  }, 0)

  const dataSet = [
    {
      name: 'Meal',
      value: totalMeal
    },
    {
      name: 'Nutrition',
      value: totalNutrition
    }
  ]


  console.log('Meal', totalMeal)
  console.log('Nutrition', totalNutrition)


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
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
    <>
      {
        data &&
        <PieChart width={400} height={400}>
          <Pie
            data={dataSet}
            dataKey="value"
            cx={200}
            cy={200}
            outerRadius={'100%'}
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={true}
          />
          {/* <Pie
            data={data02}
            dataKey="value"
            cx={200}
            cy={200}
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          /> */}
          <Tooltip />
        </PieChart>
      }
    </>
  );
}


const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
