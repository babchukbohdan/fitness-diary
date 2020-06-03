import { SHOW_LOADER, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING } from "../types"

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
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
  console.log(newState, 'newState')
  return newState
}
