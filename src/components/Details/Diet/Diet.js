import React from 'react'
import { Meal } from './Meal'
import { useTodayContext } from '../../../context/today/todayContext'
import { Submit } from '../Submit/Submit'
import { useFirebaseContext } from '../../../context/firebase/firebaseContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Diet.scss'
import { detailsDiet } from '../../../constants'
import { Note } from '../Note/Note'
import { DetailsInfo } from '../DetailsInfo/DetailsInfo'
import { getTimeString } from '../../Month/utils'
export const Diet = () => {

  const {addTrainingDay, postingData} = useFirebaseContext()

  const {
    state,
    addMeel, removeMeel, changeMeel, changeValue
  } = useTodayContext()

  // const isHaveDiet = state.diet === undefined


  const {meal, nutrition, note} = state.diet || {}

  const totalMeal = meal ? meal.reduce((acc, val) => acc + +val.calorie, 0) : ''
  const totalNutrition = nutrition ? nutrition.reduce((acc, val) => acc + +val.calorie, 0) : ''
  const total = totalMeal + totalNutrition
  const inputHandler = (e) => {
    if (e.target.name === "start" || e.target.name === "end") {
      // console.log('value', e.target.value)
      const res = getTimeString(e.target.value)
      changeValue(e.target.name, res)
    } else {
      changeValue(e.target.name, e.target.value)
    }
  }


  return (
    <div className="diet">
      <ul className="info">
      <DetailsInfo
        data={total}
        key={detailsDiet[0].attr.name}
        item={detailsDiet[0]}
        inputHandler={inputHandler}
        showTitle={true}
        showIcon={true}
      />
      <DetailsInfo
        data={totalMeal}
        key={detailsDiet[1].attr.name}
        item={detailsDiet[1]}
        inputHandler={inputHandler}
        showTitle={true}
        showIcon={true}
      />
      <DetailsInfo
        data={totalNutrition}
        key={detailsDiet[2].attr.name}
        item={detailsDiet[2]}
        inputHandler={inputHandler}
        showTitle={true}
        showIcon={true}
      />

      </ul>
      {/* <DetailsInfoList changeValue={changeValue} items={detailsDiet} state={state} showIcon={true} showTitle={true} /> */}
      {/* <div className="diet__total">
        Total calories
        <span className="input">{total}</span>
        Meel calories
        <span className="input">{totalMeal}</span>
        Sport nutrition calories
        <span className="input">{totalNutrition}</span>
      </div> */}
      <div className="meal">
        <h2 className="meal__title title">Meals</h2>
        <TransitionGroup component="div">
        {
          meal && meal.map((item, index) =>
            <CSSTransition
              key={item.id}
              classNames={'fromUp'}
              timeout={400}
            >
              <Meal
                index={index}
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
        <div className="details__addexercise">
          <button onClick={() => addMeel('meal')} className="btn btn-big btn--border">Add meel</button>
        </div>
      </div>

      <div className="meal">
        <h2 className="meal__title title">Sport nutrition</h2>
        <TransitionGroup component="div">
        {
          nutrition && nutrition.map((item, index) =>
            <CSSTransition
              key={item.id}
              classNames={'fromUp'}
              timeout={400}
            >
              <Meal
                index={index}
                type="nutrition"
                key={'diet' + item.id}
                item={item}
                changeItem={changeMeel}
                removeItem={removeMeel}
              />
            </CSSTransition>
            )
        }
        </TransitionGroup>
        <div className="details__addexercise">
          <button onClick={() => addMeel('nutrition')} className="btn btn-big btn--border">Add sportfood</button>
        </div>

      </div>
      <Note path='diet.note' value={note} changeValue={changeValue} />

      <Submit value={state} postData={addTrainingDay} loading={postingData} btnText='Save' />
    </div>
  )
}
