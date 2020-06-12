import React from 'react'
import { Link } from 'react-router-dom'
import { MuscleGroups } from '../MuscleGroups/MuscleGroups'
import { baseUrl } from '../../../constants'
import { getmuscleGroups } from '../utils'


export const TrainingDay = ({day}) => {
  const {url, id, exercises, date} = day
  const dateNum = new Date(date).getDate() || ''
  const uniqueMuscleGroups = getmuscleGroups(exercises)
  return (
    <>
      <Link
        url={`${baseUrl}/${url}/${id}`}
        to={`info/${url}/${id}`}
        className="month__date"
        id={id}
      >
        {dateNum}
      </Link>

      <MuscleGroups uniqueMuscleGroups={uniqueMuscleGroups} />
    </>
  )
}
