import React from 'react'
import { Link } from 'react-router-dom'
import { MuscleGroups } from '../MuscleGroups/MuscleGroups'
import { getmuscleGroups } from '../utils'


export const TrainingDay = ({day}) => {
  const {url, id, training, info} = day
  const {exercises} = training
  const {date} = info

  const dateNum = new Date(date).getDate() || ''
  const uniqueMuscleGroups = getmuscleGroups(exercises)
  return (
    <>
      <Link
        to={`info/${url}/${id}`}
        className="month__link"
      >
        <span className="month__date">{dateNum}</span>
        <MuscleGroups uniqueMuscleGroups={uniqueMuscleGroups} />
      </Link>

    </>
  )
}
