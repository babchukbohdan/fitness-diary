import React from 'react'
import { ReactComponent as abs } from "../../../images/muscleGroups/abs.svg";
import { ReactComponent as back } from "../../../images/muscleGroups/back.svg";
import { ReactComponent as biceps } from "../../../images/muscleGroups/biceps.svg";
import { ReactComponent as chest } from "../../../images/muscleGroups/chest.svg";
import { ReactComponent as legs } from "../../../images/muscleGroups/legs.svg";
import { ReactComponent as neck } from "../../../images/muscleGroups/neck.svg";
import { ReactComponent as shoulders } from "../../../images/muscleGroups/shoulders.svg";
import { ReactComponent as trapezius } from "../../../images/muscleGroups/trapezius.svg";
import { ReactComponent as triceps } from "../../../images/muscleGroups/triceps.svg";
import { ReactComponent as cardio } from "../../../images/muscleGroups/cardio.svg";

const muscleGroups = {
  abs, back, biceps, chest, legs, neck, shoulders, trapezius, triceps, cardio
}

export const MuscleGroups = ({uniqueMuscleGroups}) => {
  return (
    <div className="month__muscles">
      {
        uniqueMuscleGroups.map((muscle, i) => {
          const SVGIcon = muscleGroups[muscle];

          return <SVGIcon className="muscle__icon icon" key={i} />
        })
      }
    </div>
  )
}
