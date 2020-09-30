import {useReducer} from 'react'

export const useNameValueState = (initialState) => {
  const ADD__MEEL = 'ADD__MEEL'
  const REMOVE__MEEL = 'REMOVE__MEEL'
  const CHANGE__MEEL = 'CHANGE__MEEL'

  const itemExample = {
    name: '',
    calorie: 0,
    id: ''
  }

  const handlers = {
    [ADD__MEEL]: (state, { payload }) => (
      [...state, payload]
    ),
    [REMOVE__MEEL]: (state, { payload }) => (
      state.filter(({ id }) => id !== payload)
    ),
    [CHANGE__MEEL]: (state, { payload }) => (
      [...state].map((item) => {
        if (item.id === payload.id) {
          console.log(item, payload.newItem, 'change')
          return { ...item, ...payload.newItem }
        }
        return item
      })
    ),
    DEFAULT: state => state
  }

  const reducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    const newState = handle(state, action)
    // console.log(newState, 'diet newState')
    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const addItem = (item) => {
    dispatch({
      type: ADD__MEEL,
      payload: {
        name: `Meel# ${Date.now()}`,
        calorie: Date.now(),
        id: Date.now()
      }
    })
  }

  const removeItem = (id) => {
    dispatch({
      type: REMOVE__MEEL,
      payload: id
    })
  }

  const changeItem = (id, newItem) => {
    dispatch({
      type: CHANGE__MEEL,
      payload: {
        id, newItem
      }
    })
  }


  return {
    state,
    dispatch,
    addItem,
    removeItem,
    changeItem
  }

}
