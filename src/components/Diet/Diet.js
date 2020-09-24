import React from 'react'
import { Meal } from './Meal'
import { useTodayContext } from '../../context/today/todayContext'
import { Submit } from '../Details/Submit/Submit'
import { useFirebaseContext } from '../../context/firebase/firebaseContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Diet.scss'
export const Diet = () => {

  const {addTrainingDay, postingData} = useFirebaseContext()

  const {
    state,
    addMeel, removeMeel, changeMeel
  } = useTodayContext()

  const isHaveDiet = state.diet === undefined


  const {meal, nutrition} = state.diet || {}

  const totalMeal = meal ? meal.reduce((acc, val) => acc + +val.calorie, 0) : ''
  const totalNutrition = nutrition ? nutrition.reduce((acc, val) => acc + +val.calorie, 0) : ''
  const total = totalMeal + totalNutrition

  return (
    <div className="diet">
      <div className="diet__total">
        Total calories
        <span className="input">{total}</span>
        Meel calories
        <span className="input">{totalMeal}</span>
        Sport nutrition calories
        <span className="input">{totalNutrition}</span>
      </div>
      <div className="diet__meal">
        <h2>Diet</h2>
        <TransitionGroup component="div">
        {
          meal && meal.map(item =>
            <CSSTransition
              key={item.id}
              classNames={'fromUp'}
              timeout={400}
            >
              <Meal
                type="meal"
                // key={'diet' + item.id}
                item={item}
                changeItem={changeMeel}
                removeItem={removeMeel}
              />
            </CSSTransition>
          )
        }
        </TransitionGroup>
        <button onClick={() => addMeel('meal')} className="btn btn--border">Add meel</button>
      </div>

      <div className="diet__meal">
        <h2>Sport nutrition</h2>
        {
          nutrition && nutrition.map(item =>
            <Meal
              type="nutrition"
              key={'diet' + item.id}
              item={item}
              changeItem={changeMeel}
              removeItem={removeMeel}
            />)
        }
        <button onClick={() => addMeel('nutrition')} className="btn btn--border">Add sportfood</button>

      </div>

      <Submit value={state} postData={addTrainingDay} loading={postingData} />
    </div>
  )
}
