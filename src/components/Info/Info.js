import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Info.scss'
const baseUrl = 'https://fitness-diary-f96e8.firebaseio.com'

export const Info = (props) => {
  const {year, month, id} = props.match.params

  const [dayData, setDayData] = useState([{exercises: [{sets: []}]}])

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    console.log(`fetching data by id ${id}`);
    const res = await axios.get(`${baseUrl}/${year}/${month}/${id}.json`)
    setDayData(res.data)
  }

  const {exercises} = dayData

  return (
    <table>
      <thead>
        <tr>
          <th>Exercise</th>
          <th colSpan="3">Sets</th>
        </tr>
      </thead>
      <tbody>

        {
          exercises && exercises.map((exercise, i) => {
            return (
              <tr key={i}>
                <td>{exercise.name.name}</td>
                {
                  exercise.sets && exercise.sets.map((set, i) => {
                    return (
                      <td key={i}>
                        {set.weight > 0 ? `${set.weight} kg x ` : ''}
                        {set.reps}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }

      </tbody>
    </table>
  )
}
