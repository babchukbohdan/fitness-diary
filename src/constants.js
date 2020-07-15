import { ReactComponent as DateIcon } from "./images/date.svg";
import { ReactComponent as WeightIcon } from "./images/weight.svg";
import { ReactComponent as SleepIcon } from "./images/sleep.svg";

export const baseUrl = process.env.REACT_APP_FIREBASE_DATABASE
export const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']
export const header = [
  {
    beforeInput: 'Date',
    Img: DateIcon,
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
    attr: {
      name: 'sleep',
      type: "number",
      min: '6',
      max: '12'
    }
  },
]

export const footer = [
  {
    beforeInput: 'Start',
    attr: {
      type: "time",
      name: "start"
    }
  },
  {
    beforeInput: 'End',
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
