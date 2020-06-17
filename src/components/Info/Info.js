import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../constants'

import './Info.scss'
import { duration } from '../Details/utils'

export const Info = (props) => {
  const {year, month, id} = props.match.params

  const [dayData, setDayData] = useState(null)

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    console.log(`fetching data by id ${id}`);
    const res = await axios.get(`${baseUrl}/${year}/${month}/${id}.json`)
    setDayData(res.data)
  }

  if (!dayData) return null

  const {exercises} = dayData
  const maxSetsLength = exercises.reduce((acc, item) => {
    return Math.max(acc, item.sets.length)
  }, 0)
  console.log(maxSetsLength)
  console.log(dayData)

  return (
    <div className="diary">



      <div className="diary__exercises">
        <div className="diary__header">
          <div className="header__item header__item--ex">Exercise</div>
          <div className="header__item header__item--set">Sets</div>
          <div className="setcount">
            {
              new Array(maxSetsLength).fill('').map((_, i) => {
                return <div key={i}>{i + 1}</div>
              })
            }
          </div>
        </div>
          {
            exercises && exercises.map((exercise, i) => {
              return (
                <div className="row" key={i}>
                  <div className="name">{exercise.name.name}</div>
                  {
                    exercise.sets && exercise.sets.map((set, i) => {
                      return (
                        <div key={i} className="setdata">
                          {set.weight > 0 ? `${set.weight} kg x ` : ''}
                          {set.reps}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
      </div>
      <div className="diary__info">

        {
          ['date', 'weight', 'sleep', 'start', 'end',
        'note'].map((item, i) => {
            return <div className={`info__${item}`} key={i}>{item}: {dayData[item]}</div>
          })
        }
        <div>duration: {duration(dayData.start, dayData.end)}</div>
        </div>
    </div>
  )
}
