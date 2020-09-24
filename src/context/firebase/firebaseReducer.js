import { SHOW_LOADER_FETCHING, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING, HIDE_LOADER_FETCHING, SHOW_LOADER_POSTING, HIDE_LOADER_POSTING } from "../types"

const handlers = {
  [SHOW_LOADER_FETCHING]: state => ({...state, loading: true}),
  [HIDE_LOADER_FETCHING]: state => ({...state, loading: false}),
  [SHOW_LOADER_POSTING]: state => ({...state, postingData: true}),
  [HIDE_LOADER_POSTING]: state => ({...state, postingData: false}),
  [ADD_TRAINING]: (state, {payload}) => ({
    ...state,
    month: [...state.month, payload]
  }),
  [FETCH_MONTH]: (state, {payload}) => ({
    ...state,
    month: payload
  }),
  [REMOVE_TRAINING]: (state, {payload}) => ({
    ...state,
    month: state.month.filter(({date}) => date !== payload)
  }),
  DEFAULT: state => state
}


export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  const newState = handle(state, action)
  console.log(newState, 'firebase newState')
  return newState
}
