import React from 'react'
import { Icon } from '../../UI/Icon/Icon'

export const MuscleGroups = ({uniqueMuscleGroups}) => {
  return (
    <div className="month__muscles">
      {
        uniqueMuscleGroups.map((muscle, i) => (
          <Icon
            path={`muscleGroups/${muscle}.png`}
            name={muscle}
            clazz="muscle__icon"
            key={i}
          />
        ))
      }
    </div>
  )
}
