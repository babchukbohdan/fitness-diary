import { ReactComponent as DateIcon } from "./images/date.svg";
import { ReactComponent as WeightIcon } from "./images/weight.svg";
import { ReactComponent as SleepIcon } from "./images/sleep.svg";

import { ReactComponent as TotalCaloriesIcon } from "./images/diet/calories.svg";
import { ReactComponent as MealCaloriesIcon } from "./images/diet/food.svg";
import { ReactComponent as NutritionCaloriesIcon } from "./images/diet/nutrition-dark.svg";


import { Calendar } from 'primereact/calendar';

export const baseUrl = process.env.REACT_APP_FIREBASE_DATABASE
export const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']
export const header = [
  {
    beforeInput: 'Date',
    Img: DateIcon,
    path: 'info.date',
    attr: {
      name: 'date',
      type: "date",
      readOnly: true
    }
  },
  {
    afterInput: 'kg',
    beforeInput: 'Weight',
    Img: WeightIcon,
    path: 'info.weight',
    attr: {
      name: 'weight',
      type: "number",
      min: '40',
      max: '250'
    }
  },
  {
    afterInput: 'hours',
    beforeInput: 'Sleep',
    Img: SleepIcon,
    path: 'info.sleep',
    attr: {
      name: 'sleep',
      type: "number",
      min: '6',
      max: '12'
    }
  },
]

export const detailsDiet = [
  {
    beforeInput: 'Total calories',
    Img: TotalCaloriesIcon,
    path: 'diet.meal',
    attr: {
      name: 'total calories',
      type: "number",
      min: '0',
      readOnly: true
    }
  },
  {
    beforeInput: 'Meal calories',
    Img: MealCaloriesIcon,
    path: 'diet.meal',
    attr: {
      name: 'meal',
      type: "number",
      min: '0',
      readOnly: true
    }
  },
  {
    beforeInput: 'Sport nutrition calories',
    Img: NutritionCaloriesIcon,
    path: 'diet.nutrition',
    attr: {
      name: 'nutrition',
      type: "number",
      min: '0',
      readOnly: true
    }
  },
]

export const footer = [
  {
    Component: Calendar,
    beforeInput: 'Start:',
    path: 'training.start',
    attr: {
      type: "time",
      name: "start"
    }
  },
  {
    Component: Calendar,
    beforeInput: 'End:',
    path: 'training.end',
    attr: {
      name: 'end',
      type: "time",
    }
  },
  // {
  //   beforeInput: 'Duration',
  //   afterInput: 'min',
  //   attr: {
  //     name: 'duration',
  //     type: "number",
  //     readOnly: true
  //   }
  // },
]


export const links = [
  {
    to: '/callendar',
    title: 'Callendar',
    Icon: ''
  }
]
