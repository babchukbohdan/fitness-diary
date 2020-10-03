import React, { useContext, useEffect } from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {TabView, TabPanel} from 'primereact/tabview';

import { Exercise } from './Exercise/Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { TodayContext } from '../../context/today/todayContext'
import { DetailsInfoList } from './DetailsInfoList/DetailsInfoList'
import { header, footer } from '../../constants'
import { duration } from './utils'
import { Note } from './Note/Note'
import { Submit } from './Submit/Submit'

import './Details.scss'
import { Loader } from '../UI/Loader/Loader'
import { SelectMuscle } from '../UI/SelectMuscle/SelectMuscle';
import { Diet } from './Diet/Diet';
import { getDayString, getTimeString } from '../Month/utils';
import { Pharmacology } from './Pharmacology/Pharmacology';
import axios from 'axios';
import { mockTraining } from '../MockData/MockData';

export const Details = () => {
  const {fetchMonth, addTrainingDay, month, loading, postingData} = useContext(FirebaseContext)
  const {state, addExercise, changeValue, pushState} = useContext(TodayContext)

  const {exercises, note, start, end} = state.training

  useEffect(() => {
    // console.log(month, 'month')
    // console.log(month[0]?.date.substr(0, 7), 'date')
    // if (month.length && month[0].date.substr(0, 7) === getDayString(new Date())) return
    if (!month.length || month[0].info.date.substr(0, 7) !== getDayString(new Date())) {
      const date = new Date(Date.parse(state.info.date))
      fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
        .then(res => {
          const todayTraining = res.filter((day) => {
            return day.info.date === state.info.date
          })[0]
          if (todayTraining) pushState({...todayTraining})

        })
    } else {
      const todayTraining = month.filter((day) => {
        return day.info.date === state.info.date
      })[0]
      if (todayTraining) pushState({...todayTraining})
    }
  // eslint-disable-next-line
  }, [])


  if (loading) {
    return <Loader />
  }

  // Delete start here

    // -MIUptugszNfpIbe6oYw

    // const a = axios.put(`https://fitness-diary-f96e8.firebaseio.com/2020/9/-MIGc3ZY6nzgPJybW-mg.json`, {name: 'TEST'})

    // setTimeout(() => {
    //   console.log(a,"res put")
    // }, 5000)

  // axios.post(`https://fitness-diary-f96e8.firebaseio.com/2020/5.json`, {
  //   info: {
  //     date: getDayString(new Date(), true),
  //     weight: 77,
  //     sleep: 8,
  //   },
  //   training: {
  //     exercises: [{
  //       id: Date.now(),
  //       name: 'Prised',
  //       sets: [{
  //         weight: 100,
  //         reps: 20,
  //         id: Date.now(),
  //       }],
  //     }],
  //     note: 'Change db',
  //     start: getTimeString(new Date()),
  //     end: getTimeString(new Date()),
  //   },
  //   diet: {
  //     meal: [],
  //     nutrition: [],
  //     note: 'Change db'
  //   },
  //   pharmacology: {
  //     medications: [],
  //     note: 'Change db'
  //   },
  // })



  // Delete end

  return (
    <div className="details wrap">

      <div className="details__header">
        <DetailsInfoList
          items={header}
          state={state}
          changeValue={changeValue}
          showTitle={false}
          showIcon={true}
        />
      </div>


        <TabView className="details__tabs">
          <TabPanel header="Training">

            <div className="details__container">
              <DetailsInfoList
                items={footer}
                state={state}
                changeValue={changeValue}
                showTitle={true}
              >
                <li className="info__item">Duration: <span className="info__duration input">{duration(start, end)} min</span></li>
              </DetailsInfoList>
              <div className="details__main">
              <div className="details__exercises" >
                <TransitionGroup component="div">

                  {exercises && exercises.map((item, i) => (
                    <CSSTransition
                      key={item.id}
                      classNames={'fromUp'}
                      timeout={400}
                    >
                      <Exercise exercise={item} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>

                <div className="details__addexercise">
                  <SelectMuscle
                    closeOnSelect={false}
                    btnText='Add exercise'
                    onSelectExercise={addExercise}
                    btnClasses="btn btn-big btn--border"
                  />
                </div>

              </div>

              <Note path='training.note' value={note} changeValue={changeValue} />

              <Submit btnText="Save" value={state} postData={addTrainingDay} loading={postingData} />
              {/* <Submit btnText="Save pure" value={{
                date: getDayString(new Date(), true),
                exercises: [],
                diet: {
                  meal: [{
                    name: ``,
                    calorie: 0,
                  }],
                  nutrition: [{
                    name: ``,
                    calorie: 0,
                  }],
                },
                note: '',
                start: getTimeString(new Date()),
                end: getTimeString(new Date()),
                weight: 77,
                sleep: 8
              }}
              postData={addTrainingDay} loading={postingData} /> */}
              </div>
              <div className="details__footer">
                {/* <DetailsInfoList
                  items={footer}
                  state={state}
                  changeValue={changeValue}
                  showTitle={true}
                >
                  <li className="info__item">Duration: <span className="info__duration input">{duration(start, end)} min</span></li>
                </DetailsInfoList> */}
              </div>
            </div>

          </TabPanel>
          <TabPanel header="Diet & nutrition">
              <Diet />
          </TabPanel>
          <TabPanel header="Pharmacology">
              <Pharmacology />
          </TabPanel>
        </TabView>
    </div>
  )
}
