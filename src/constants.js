export const baseUrl = 'https://fitness-diary-f96e8.firebaseio.com'
export const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']
export const header = [
  {
    beforeInput: 'Date',
    img: true,
    attr: {
      name: 'date',
      type: "date",
      readOnly: true
    }
  },
  {
    afterInput: 'kg',
    beforeInput: 'Weight',
    img: true,
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
    img: true,
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
